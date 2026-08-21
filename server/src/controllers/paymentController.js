const Stripe = require("stripe");
const pool = require("../config/db");
const Order = require("../models/orderModel");
const getStripe = () => { if (!process.env.STRIPE_SECRET_KEY) throw new Error("STRIPE_SECRET_KEY no está configurada."); return new Stripe(process.env.STRIPE_SECRET_KEY); };
const createCheckoutSession = async (req, res, next) => {
    try {
        const order = await Order.findByReferenceAndEmail(String(req.body?.reference || "").trim(), String(req.body?.email || "").trim());
        if (!order) return res.status(404).json({ success: false, message: "Pedido no encontrado." });
        if (order.payment_status === "paid") return res.status(409).json({ success: false, message: "Este pedido ya fue pagado." });
        const clientUrl = (process.env.CLIENT_URL || "http://localhost:3000/VirtuosaCrud").replace(/\/$/, "");
        const session = await getStripe().checkout.sessions.create({ mode: "payment", customer_email: order.customer_email, line_items: [{ price_data: { currency: "cop", unit_amount: Math.round(Number(order.total) * 100), product_data: { name: `Pedido Virtuosa ${order.reference}`, description: `${order.items.length} producto(s)` } }, quantity: 1 }], success_url: `${clientUrl}/seguimiento?reference=${encodeURIComponent(order.reference)}&email=${encodeURIComponent(order.customer_email)}&payment=success`, cancel_url: `${clientUrl}/seguimiento?reference=${encodeURIComponent(order.reference)}&email=${encodeURIComponent(order.customer_email)}&payment=cancelled`, metadata: { orderId: String(order.id), reference: order.reference } }, { idempotencyKey: `checkout-${order.id}` });
        await pool.query("UPDATE orders SET stripe_session_id = $1 WHERE id = $2", [session.id, order.id]);
        return res.status(201).json({ success: true, data: { url: session.url } });
    } catch (error) { return next(error); }
};
const stripeWebhook = async (req, res) => {
    try {
        const event = getStripe().webhooks.constructEvent(req.body, req.headers["stripe-signature"], process.env.STRIPE_WEBHOOK_SECRET);
        if (event.type === "checkout.session.completed") { const session = event.data.object; await pool.query(`UPDATE orders SET payment_status = 'paid', status = CASE WHEN status = 'pending' THEN 'confirmed' ELSE status END, payment_reference = $1 WHERE id = $2 AND payment_status <> 'paid'`, [session.payment_intent || session.id, Number(session.metadata?.orderId)]); }
        return res.status(200).json({ received: true });
    } catch (error) { return res.status(400).json({ success: false, message: "Firma de webhook inválida." }); }
};
module.exports = { createCheckoutSession, stripeWebhook };
