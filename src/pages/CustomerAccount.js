import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Header from "../components/header/header";
import Home from "../components/home/home";
import Footer from "../components/footer/footer";
import Seo from "../components/seo/Seo";
import apiClient from "../services/apiClient";
import { useAuth } from "../context/AuthContext";
import { errorAlert } from "../utils/alerts";

import "../components/assets/css/CustomerAccount.css";

const STATUS_LABELS = {
    pending: "Recibido",
    confirmed: "Confirmado",
    preparing: "En preparación",
    shipped: "En camino",
    delivered: "Entregado",
    cancelled: "Cancelado",
};

const PAYMENT_LABELS = {
    pending: "Pago pendiente",
    paid: "Pagado",
    failed: "Pago no completado",
    refunded: "Reembolsado",
};

const formatPrice = (value) => new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
}).format(Number(value) || 0);

const formatDate = (value) => new Intl.DateTimeFormat("es-CO", {
    dateStyle: "long",
    timeStyle: "short",
}).format(new Date(value));

function CustomerAccount() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [expandedOrder, setExpandedOrder] = useState(null);
    const [payingReference, setPayingReference] = useState("");

    const loadOrders = async () => {
        try {
            setLoading(true);
            setError("");
            const response = await apiClient.get("/orders/mine");
            setOrders(Array.isArray(response?.data?.data) ? response.data.data : []);
        } catch (requestError) {
            setError(requestError?.response?.data?.message || "No pudimos consultar tus pedidos.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadOrders();
    }, []);

    const summary = useMemo(() => ({
        total: orders.length,
        active: orders.filter((order) => !["delivered", "cancelled"].includes(order.status)).length,
        delivered: orders.filter((order) => order.status === "delivered").length,
    }), [orders]);

    const startPayment = async (order) => {
        try {
            setPayingReference(order.reference);
            const response = await apiClient.post("/payments/checkout", {
                reference: order.reference,
                email: user.email,
            });
            const url = response?.data?.data?.url;
            if (!url) throw new Error("Mercado Pago no devolvió el enlace de pago.");
            window.location.assign(url);
        } catch (paymentError) {
            await errorAlert(
                "No pudimos iniciar el pago",
                paymentError?.response?.data?.message || "Inténtalo nuevamente en unos minutos."
            );
            setPayingReference("");
        }
    };

    const handleLogout = () => {
        logout();
        navigate("/VirtuosaCrud/", { replace: true });
    };

    return (
        <div className="customer-account-page">
            <Seo title="Mi cuenta" description="Consulta tus pedidos y pagos en Virtuosa." />
            <Header />
            <Home />
            <main className="customer-account-main">
                <section className="customer-account-hero">
                    <div>
                        <span>Área privada</span>
                        <h1>Hola, {user?.name?.split(" ")[0] || "Virtuosa"}.</h1>
                        <p>Consulta el recorrido de tus compras, sus pagos y todos los productos que elegiste.</p>
                    </div>
                    <div className="customer-account-actions">
                        <Link to="/VirtuosaCrud/productos">Seguir comprando</Link>
                        <button type="button" onClick={handleLogout}>Cerrar sesión</button>
                    </div>
                </section>

                <section className="customer-account-profile" aria-label="Información de la cuenta">
                    <div><i className="fa-regular fa-user" /><span>Cuenta</span><strong>{user?.name}</strong></div>
                    <div><i className="fa-regular fa-envelope" /><span>Correo</span><strong>{user?.email}</strong></div>
                    <div><i className="fa-solid fa-bag-shopping" /><span>Pedidos</span><strong>{summary.total}</strong></div>
                    <div><i className="fa-solid fa-truck-fast" /><span>En curso</span><strong>{summary.active}</strong></div>
                </section>

                <section className="customer-orders" aria-labelledby="customer-orders-title">
                    <header>
                        <div><span>Historial</span><h2 id="customer-orders-title">Mis pedidos</h2></div>
                        {!loading && !error ? <p>{summary.delivered} entregado{summary.delivered === 1 ? "" : "s"}</p> : null}
                    </header>

                    {loading ? <div className="customer-orders-state"><i className="fa-solid fa-spinner fa-spin" /><h3>Consultando tus pedidos</h3></div> : null}
                    {!loading && error ? <div className="customer-orders-state error"><i className="fa-solid fa-circle-exclamation" /><h3>No pudimos cargar tu historial</h3><p>{error}</p><button type="button" onClick={loadOrders}>Intentar nuevamente</button></div> : null}
                    {!loading && !error && orders.length === 0 ? <div className="customer-orders-state"><i className="fa-solid fa-bag-shopping" /><h3>Aún no tienes pedidos</h3><p>Cuando compres usando {user?.email}, tus pedidos aparecerán aquí.</p><Link to="/VirtuosaCrud/productos">Descubrir productos</Link></div> : null}

                    {!loading && !error && orders.length > 0 ? (
                        <div className="customer-order-list">
                            {orders.map((order) => {
                                const expanded = expandedOrder === order.id;
                                const canPay = ["mercado_pago", "stripe"].includes(order.payment_method)
                                    && order.payment_status !== "paid"
                                    && order.status !== "cancelled"
                                    && Number(order.total) > 0;
                                return (
                                    <article className="customer-order-card" key={order.id}>
                                        <div className="customer-order-summary">
                                            <div className="customer-order-reference"><span>Pedido</span><strong>{order.reference}</strong><small>{formatDate(order.created_at)}</small></div>
                                            <div className="customer-order-badges"><span className={`order-status ${order.status}`}>{STATUS_LABELS[order.status] || order.status}</span><span className={`payment-status ${order.payment_status}`}>{PAYMENT_LABELS[order.payment_status] || order.payment_status}</span></div>
                                            <div className="customer-order-total"><span>{order.item_count} producto{Number(order.item_count) === 1 ? "" : "s"}</span><strong>{formatPrice(order.total)}</strong></div>
                                            <div className="customer-order-buttons">
                                                {canPay ? <button className="customer-pay-button" type="button" onClick={() => startPayment(order)} disabled={Boolean(payingReference)}><i className="fa-solid fa-lock" />{payingReference === order.reference ? "Abriendo..." : "Pagar"}</button> : null}
                                                <button className="customer-detail-button" type="button" onClick={() => setExpandedOrder(expanded ? null : order.id)} aria-expanded={expanded}>Ver detalle <i className={`fa-solid fa-chevron-${expanded ? "up" : "down"}`} /></button>
                                            </div>
                                        </div>
                                        {expanded ? (
                                            <div className="customer-order-detail">
                                                <div className="customer-order-delivery"><span>Entrega</span><strong>{order.shipping_city}{order.shipping_department ? `, ${order.shipping_department}` : ""}</strong><small>Última actualización: {formatDate(order.updated_at)}</small></div>
                                                <div className="customer-order-items">
                                                    {order.items.map((item) => <div key={item.id}><img src={item.product_image_url || "https://placehold.co/120x140/f3eef5/705b7c?text=V"} alt="" /><span><strong>{item.product_name}</strong><small>{item.size ? `Talla ${item.size} · ` : ""}{item.quantity} unidad{item.quantity === 1 ? "" : "es"}</small></span><b>{formatPrice(item.subtotal)}</b></div>)}
                                                </div>
                                            </div>
                                        ) : null}
                                    </article>
                                );
                            })}
                        </div>
                    ) : null}
                </section>
            </main>
            <Footer />
        </div>
    );
}

export default CustomerAccount;
