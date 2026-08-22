const {
    MercadoPagoConfig,
    Payment,
    Preference,
    WebhookSignatureValidator,
} = require("mercadopago");

const pool = require("../config/db");
const Order = require("../models/orderModel");

const getClient = () => {
    if (!process.env.MERCADO_PAGO_ACCESS_TOKEN) {
        const error = new Error("MERCADO_PAGO_ACCESS_TOKEN no está configurada.");
        error.status = 503;
        throw error;
    }

    return new MercadoPagoConfig({
        accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN,
        options: { timeout: 10000 },
    });
};

const getClientUrl = () =>
    (process.env.CLIENT_URL || "http://localhost:3000/VirtuosaCrud")
        .replace(/\/$/, "");

const getWebhookUrl = () => {
    const apiUrl = process.env.API_PUBLIC_URL || process.env.RENDER_EXTERNAL_URL;
    return apiUrl ? `${apiUrl.replace(/\/$/, "")}/api/payments/webhook` : undefined;
};

const trackingUrl = (order, payment) => {
    const query = new URLSearchParams({
        reference: order.reference,
        email: order.customer_email,
        payment,
    });

    return `${getClientUrl()}/seguimiento?${query.toString()}`;
};

const applyVerifiedPayment = async (payment, expectedOrder = null) => {
    const reference = String(payment.external_reference || "").trim();
    const result = await pool.query(
        "SELECT id, reference, customer_email, total, payment_status FROM orders WHERE reference = $1 LIMIT 1",
        [reference]
    );
    const order = result.rows[0];

    if (!order || (expectedOrder && Number(order.id) !== Number(expectedOrder.id))) {
        const error = new Error("El pago no corresponde al pedido indicado.");
        error.status = 404;
        throw error;
    }

    const amountMatches = Math.abs(Number(payment.transaction_amount) - Number(order.total)) < 0.01;
    const currencyMatches = payment.currency_id === "COP";
    if (!amountMatches || !currencyMatches) {
        const error = new Error("Los datos del pago no coinciden con el pedido.");
        error.status = 409;
        throw error;
    }

    if (payment.status === "approved") {
        await pool.query(
            `UPDATE orders
             SET payment_status = 'paid',
                 status = CASE WHEN status = 'pending' THEN 'confirmed' ELSE status END,
                 payment_reference = $1,
                 updated_at = CURRENT_TIMESTAMP
             WHERE id = $2 AND payment_status <> 'paid'`,
            [String(payment.id), order.id]
        );
    } else if (["rejected", "cancelled"].includes(payment.status)) {
        await pool.query(
            `UPDATE orders
             SET payment_status = 'failed', payment_reference = $1, updated_at = CURRENT_TIMESTAMP
             WHERE id = $2 AND payment_status <> 'paid'`,
            [String(payment.id), order.id]
        );
    }

    return { order, paymentStatus: payment.status };
};

const createCheckoutSession = async (req, res, next) => {
    try {
        const reference = String(req.body?.reference || "").trim();
        const email = String(req.body?.email || "").trim();
        const order = await Order.findByReferenceAndEmail(reference, email);

        if (!order) {
            return res.status(404).json({ success: false, message: "Pedido no encontrado." });
        }

        if (order.payment_status === "paid") {
            return res.status(409).json({ success: false, message: "Este pedido ya fue pagado." });
        }

        if (!Number.isFinite(Number(order.total)) || Number(order.total) <= 0) {
            return res.status(422).json({
                success: false,
                message: "Este pedido no tiene un total válido para pagar con Mercado Pago.",
            });
        }

        const preferenceBody = {
            items: [{
                id: String(order.id),
                title: `Pedido Virtuosa ${order.reference}`,
                description: `${order.items.length} producto(s)`,
                currency_id: "COP",
                quantity: 1,
                unit_price: Number(order.total),
            }],
            payer: { email: order.customer_email },
            external_reference: order.reference,
            metadata: { order_id: order.id, reference: order.reference },
            back_urls: {
                success: trackingUrl(order, "approved"),
                pending: trackingUrl(order, "pending"),
                failure: trackingUrl(order, "failure"),
            },
            auto_return: "approved",
        };

        const notificationUrl = getWebhookUrl();
        if (notificationUrl) preferenceBody.notification_url = notificationUrl;

        const preference = await new Preference(getClient()).create({
            body: preferenceBody,
            requestOptions: { idempotencyKey: `virtuosa-order-${order.id}` },
        });
        const paymentUrl = preference.init_point || preference.sandbox_init_point;

        if (!preference.id || !paymentUrl) {
            throw new Error("Mercado Pago no devolvió una URL de pago.");
        }

        await pool.query(
            "UPDATE orders SET mercado_pago_preference_id = $1 WHERE id = $2",
            [preference.id, order.id]
        );

        return res.status(201).json({
            success: true,
            data: { url: paymentUrl, preferenceId: preference.id },
        });
    } catch (error) {
        return next(error);
    }
};

const mercadoPagoWebhook = async (req, res) => {
    const dataId = String(req.query["data.id"] || req.body?.data?.id || "").trim();
    const notificationType = String(req.query.type || req.body?.type || "").trim();

    if (notificationType !== "payment" || !dataId) {
        return res.status(200).json({ received: true, ignored: true });
    }

    if (!process.env.MERCADO_PAGO_WEBHOOK_SECRET) {
        return res.status(503).json({ success: false, message: "Webhook no configurado." });
    }

    try {
        WebhookSignatureValidator.validate({
            xSignature: req.headers["x-signature"],
            xRequestId: req.headers["x-request-id"],
            dataId,
            secret: process.env.MERCADO_PAGO_WEBHOOK_SECRET,
        });

    } catch (error) {
        console.error("Mercado Pago webhook signature error:", error.message);
        return res.status(401).json({ success: false, message: "Firma de webhook inválida." });
    }

    try {
        const payment = await new Payment(getClient()).get({ id: dataId });
        await applyVerifiedPayment(payment);
        return res.status(200).json({ received: true });
    } catch (error) {
        console.error("Mercado Pago webhook processing error:", error.message);
        if (error.status === 404) {
            return res.status(200).json({ received: true, ignored: true });
        }
        return res.status(error.status === 409 ? 400 : 500).json({
            success: false,
            message: "No fue posible procesar la notificación del pago.",
        });
    }
};

const confirmPaymentReturn = async (req, res, next) => {
    try {
        const paymentId = String(req.body?.paymentId || "").trim();
        const reference = String(req.body?.reference || "").trim();
        const email = String(req.body?.email || "").trim();

        if ((paymentId && !/^\d+$/.test(paymentId)) || !reference || !email) {
            return res.status(400).json({
                success: false,
                message: "No recibimos los datos completos del pago.",
            });
        }

        const order = await Order.findByReferenceAndEmail(reference, email);
        if (!order) {
            return res.status(404).json({ success: false, message: "Pedido no encontrado." });
        }

        const paymentClient = new Payment(getClient());
        let payment;

        if (paymentId) {
            payment = await paymentClient.get({ id: paymentId });
        } else {
            const search = await paymentClient.search({
                options: {
                    external_reference: reference,
                    sort: "date_last_updated",
                    criteria: "desc",
                    limit: 10,
                },
            });
            payment = search.results?.find((candidate) => candidate.status === "approved")
                || search.results?.[0];
        }

        if (!payment?.id) {
            return res.status(404).json({
                success: false,
                message: "Todavía no encontramos un pago asociado a este pedido.",
            });
        }
        await applyVerifiedPayment(payment, order);
        const updatedOrder = await Order.findByReferenceAndEmail(reference, email);

        return res.status(200).json({
            success: true,
            message: updatedOrder.payment_status === "paid"
                ? "Pago confirmado correctamente."
                : "El pago todavía está siendo procesado.",
            data: updatedOrder,
        });
    } catch (error) {
        return next(error);
    }
};

module.exports = { createCheckoutSession, mercadoPagoWebhook, confirmPaymentReturn };
