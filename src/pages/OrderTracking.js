import React, { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import Header from "../components/header/header";
import Home from "../components/home/home";
import Footer from "../components/footer/footer";
import apiClient from "../services/apiClient";

import "../components/assets/css/OrderTracking.css";

const stages = [
    ["pending", "Recibido"],
    ["confirmed", "Confirmado"],
    ["preparing", "Preparando"],
    ["shipped", "En camino"],
    ["delivered", "Entregado"],
];

const formatPrice = (value) => new Intl.NumberFormat("es-CO", {
    style: "currency", currency: "COP", maximumFractionDigits: 0,
}).format(Number(value) || 0);

const formatDate = (value) => new Intl.DateTimeFormat("es-CO", {
    dateStyle: "long", timeStyle: "short",
}).format(new Date(value));

function OrderTracking() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [form, setForm] = useState({
        reference: searchParams.get("reference") || "",
        email: searchParams.get("email") || "",
    });
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [paymentNotice, setPaymentNotice] = useState("");

    const currentStage = useMemo(
        () => stages.findIndex(([status]) => status === order?.status),
        [order]
    );

    const findOrder = async (reference, email) => {
        setLoading(true);
        setMessage("");
        setOrder(null);
        try {
            const response = await apiClient.get("/orders/track", { params: { reference, email } });
            let trackedOrder = response?.data?.data || null;

            if (
                trackedOrder
                && ["mercado_pago", "stripe"].includes(trackedOrder.payment_method)
                && trackedOrder.payment_status !== "paid"
            ) {
                try {
                    const reconciliation = await apiClient.post("/payments/confirm", { reference, email });
                    trackedOrder = reconciliation?.data?.data || trackedOrder;
                    if (trackedOrder.payment_status === "paid") {
                        setPaymentNotice("¡Pago confirmado! Tu pedido ya está confirmado y comenzará su preparación.");
                    }
                } catch (reconciliationError) {
                    // Es normal que todavía no exista un pago si el cliente apenas consulta el pedido.
                }
            }

            setOrder(trackedOrder);
            setSearchParams({ reference, email }, { replace: true });
        } catch (error) {
            setMessage(error?.response?.data?.message || "No pudimos consultar el pedido. Inténtalo nuevamente.");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const reference = form.reference.trim();
        const email = form.email.trim();
        if (!reference || !email) return;
        findOrder(reference, email);
    };

    const startPayment = async () => {
        try {
            setLoading(true);
            const response = await apiClient.post("/payments/checkout", { reference: order.reference, email: form.email.trim() });
            window.location.assign(response?.data?.data?.url);
        } catch (error) {
            setMessage(error?.response?.data?.message || "No pudimos iniciar el pago.");
            setLoading(false);
        }
    };

    useEffect(() => {
        const reference = searchParams.get("reference")?.trim();
        const email = searchParams.get("email")?.trim();
        const paymentId = (searchParams.get("payment_id") || searchParams.get("collection_id"))?.trim();

        const loadReturnedOrder = async () => {
            if (!reference || !email) return;

            if (!paymentId) {
                await findOrder(reference, email);
                return;
            }

            setLoading(true);
            setMessage("");
            try {
                const response = await apiClient.post("/payments/confirm", {
                    paymentId,
                    reference,
                    email,
                });
                const confirmedOrder = response?.data?.data || null;
                setOrder(confirmedOrder);
                setPaymentNotice(
                    confirmedOrder?.payment_status === "paid"
                        ? "¡Pago confirmado! Tu pedido ya está confirmado y comenzará su preparación."
                        : response?.data?.message || "El pago todavía está siendo procesado."
                );
                setSearchParams({ reference, email }, { replace: true });
            } catch (error) {
                setMessage(error?.response?.data?.message || "No pudimos confirmar el pago todavía. Actualiza la página en unos minutos.");
                await findOrder(reference, email);
            } finally {
                setLoading(false);
            }
        };

        loadReturnedOrder();
        // The URL is read once on arrival; later changes are handled by submit.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="tracking-page">
            <Header />
            <Home />
            <main className="tracking-main" id="main-content">
                <header className="tracking-heading">
                    <span>Tu compra, paso a paso</span>
                    <h1>Seguimiento de pedido</h1>
                    <p>Consulta el avance con la referencia de compra y el correo usado en el checkout.</p>
                </header>

                <form className="tracking-form" onSubmit={handleSubmit}>
                    <label>Referencia del pedido
                        <input value={form.reference} onChange={(event) => setForm((current) => ({ ...current, reference: event.target.value }))} placeholder="Ej. VIR-2026-0001" autoComplete="off" required />
                    </label>
                    <label>Correo de la compra
                        <input type="email" value={form.email} onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))} placeholder="tu@correo.com" autoComplete="email" required />
                    </label>
                    <button type="submit" disabled={loading}>{loading ? "Consultando…" : "Consultar pedido"}</button>
                </form>

                {message ? <div className="tracking-message" role="alert"><i className="fa-regular fa-circle-xmark" /> <p>{message}</p></div> : null}
                {paymentNotice ? <div className="tracking-payment-confirmed" role="status"><i className="fa-solid fa-circle-check" /><p>{paymentNotice}</p></div> : null}

                {order ? (
                    <section className="tracking-result" aria-live="polite">
                        <div className="tracking-summary">
                            <div><span>Pedido</span><strong>{order.reference}</strong><small>{formatDate(order.created_at)}</small></div>
                            <div><span>Total</span><strong>{formatPrice(order.total)}</strong><small>{order.items?.length || 0} producto(s)</small></div>
                            <div><span>Destino</span><strong>{order.shipping_city}</strong><small>{order.shipping_department}</small></div>
                        </div>

                        <div className={`tracking-payment-state ${order.payment_status}`}>
                            <i className={`fa-solid ${order.payment_status === "paid" ? "fa-shield-circle-check" : "fa-clock"}`} />
                            <div>
                                <span>Estado del pago</span>
                                <strong>{order.payment_status === "paid" ? "Pago confirmado" : order.payment_status === "failed" ? "Pago no completado" : "Pago pendiente"}</strong>
                            </div>
                        </div>

                        {order.status === "cancelled" ? (
                            <div className="tracking-cancelled"><i className="fa-solid fa-circle-exclamation" /><div><strong>Pedido cancelado</strong><p>Si necesitas ayuda, comunícate con nuestro equipo.</p></div></div>
                        ) : (
                            <ol className="tracking-timeline">
                                {stages.map(([status, label], index) => (
                                    <li key={status} className={index <= currentStage ? "is-complete" : ""} aria-current={index === currentStage ? "step" : undefined}>
                                        <span>{index < currentStage ? <i className="fa-solid fa-check" /> : index + 1}</span>
                                        <strong>{label}</strong>
                                    </li>
                                ))}
                            </ol>
                        )}

                        <div className="tracking-items">
                            <h2>Resumen de tu compra</h2>
                            {order.items?.map((item) => (
                                <article key={item.id}>
                                    {item.product_image_url ? <img src={item.product_image_url} alt="" /> : <div className="tracking-item-placeholder"><i className="fa-solid fa-bag-shopping" /></div>}
                                    <div><strong>{item.product_name}</strong><small>{item.size ? `Talla ${item.size} · ` : ""}Cantidad: {item.quantity}</small></div>
                                    <b>{formatPrice(item.subtotal)}</b>
                                </article>
                            ))}
                        </div>
                        {["mercado_pago", "stripe"].includes(order.payment_method) && order.payment_status !== "paid" ? <button className="tracking-pay-button" type="button" onClick={startPayment} disabled={loading}><i className="fa-solid fa-lock" /> Pagar con Mercado Pago</button> : null}
                        <Link className="tracking-help" to="/VirtuosaCrud/contacto">¿Necesitas ayuda con tu pedido? <span>Contáctanos →</span></Link>
                    </section>
                ) : null}
            </main>
            <Footer />
        </div>
    );
}

export default OrderTracking;
