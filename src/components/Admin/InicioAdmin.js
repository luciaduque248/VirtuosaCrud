import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import NavbarAdmin from "./navbar/NavbarAdmin";
import apiClient from "../../services/apiClient";
import { useAuth } from "../../context/AuthContext";

import "./AdminDashboard.css";

const STATUS_LABELS = { pending: "Pendiente", confirmed: "Confirmado", preparing: "Preparando", shipped: "Enviado", delivered: "Entregado", cancelled: "Cancelado" };
const formatPrice = (value) => new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(Number(value) || 0);
const formatDate = (value) => new Intl.DateTimeFormat("es-CO", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(value));

function InicioAdmin() {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const loadDashboard = useCallback(async () => {
        try {
            setLoading(true);
            setError("");
            const [ordersResponse, productsResponse] = await Promise.all([apiClient.get("/orders"), apiClient.get("/products")]);
            const nextOrders = ordersResponse?.data?.data;
            const nextProducts = productsResponse?.data?.data;
            if (!Array.isArray(nextOrders) || !Array.isArray(nextProducts)) throw new Error("Respuesta inválida");
            setOrders(nextOrders);
            setProducts(nextProducts);
        } catch (requestError) {
            console.error("Error cargando dashboard:", requestError);
            setError("No fue posible cargar los indicadores. Comprueba la conexión con la API.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { loadDashboard(); }, [loadDashboard]);

    const metrics = useMemo(() => {
        const activeOrders = orders.filter((order) => !["delivered", "cancelled"].includes(order.status));
        const completedSales = orders.filter((order) => order.status === "delivered");
        const lowStock = products.filter((product) => Number(product.stock) <= 5);
        return { orders: orders.length, active: activeOrders.length, sales: completedSales.reduce((sum, order) => sum + Number(order.total || 0), 0), lowStock };
    }, [orders, products]);

    const firstName = user?.name?.trim()?.split(/\s+/)[0] || "Administradora";

    return (
        <div className="admin-dashboard-page">
            <NavbarAdmin />
            <main className="admin-dashboard-main">
                <section className="admin-dashboard-hero">
                    <div><span className="admin-dashboard-eyebrow">Panel de control</span><h1>Hola, {firstName}.</h1><p>Este es el estado actual de Virtuosa. Revisa ventas, pedidos e inventario desde un solo lugar.</p></div>
                    <div className="admin-dashboard-hero-actions"><Link to="/VirtuosaCrud/admin/pedidos"><i className="fa-solid fa-box" /> Gestionar pedidos</Link><Link to="/VirtuosaCrud/form-vestidos" className="secondary"><i className="fa-solid fa-plus" /> Nuevo producto</Link></div>
                </section>

                {error ? <section className="admin-dashboard-error" role="alert"><div><i className="fa-solid fa-triangle-exclamation" /><p>{error}</p></div><button type="button" onClick={loadDashboard}>Reintentar</button></section> : null}

                <section className="admin-dashboard-metrics" aria-label="Indicadores principales">
                    <article><div className="metric-icon orders"><i className="fa-solid fa-receipt" /></div><span>Pedidos totales</span><strong>{loading ? "—" : metrics.orders}</strong><small>Histórico registrado</small></article>
                    <article><div className="metric-icon active"><i className="fa-solid fa-clock" /></div><span>En proceso</span><strong>{loading ? "—" : metrics.active}</strong><small>Requieren seguimiento</small></article>
                    <article><div className="metric-icon sales"><i className="fa-solid fa-arrow-trend-up" /></div><span>Ventas entregadas</span><strong>{loading ? "—" : formatPrice(metrics.sales)}</strong><small>Pedidos completados</small></article>
                    <article><div className="metric-icon stock"><i className="fa-solid fa-boxes-stacked" /></div><span>Stock bajo</span><strong>{loading ? "—" : metrics.lowStock.length}</strong><small>5 unidades o menos</small></article>
                </section>

                <div className="admin-dashboard-grid">
                    <section className="admin-dashboard-panel recent-orders">
                        <header><div><span>Actividad reciente</span><h2>Últimos pedidos</h2></div><Link to="/VirtuosaCrud/admin/pedidos">Ver todos →</Link></header>
                        {loading ? <div className="admin-dashboard-state"><i className="fa-solid fa-spinner" /> Cargando pedidos…</div> : null}
                        {!loading && orders.length === 0 ? <div className="admin-dashboard-state">Aún no hay pedidos registrados.</div> : null}
                        {!loading && orders.slice(0, 5).map((order) => <Link className="admin-recent-order" to="/VirtuosaCrud/admin/pedidos" key={order.id}><div><strong>{order.reference}</strong><small>{order.customer_name} · {formatDate(order.created_at)}</small></div><span className={`admin-order-status ${order.status}`}>{STATUS_LABELS[order.status] || order.status}</span><b>{formatPrice(order.total)}</b></Link>)}
                    </section>

                    <aside className="admin-dashboard-panel inventory-alerts">
                        <header><div><span>Inventario</span><h2>Atención de stock</h2></div></header>
                        {loading ? <div className="admin-dashboard-state">Revisando inventario…</div> : null}
                        {!loading && metrics.lowStock.length === 0 ? <div className="admin-stock-ok"><i className="fa-solid fa-circle-check" /><p><strong>Inventario saludable</strong><small>No hay productos con stock bajo.</small></p></div> : null}
                        {!loading && metrics.lowStock.slice(0, 5).map((product) => <div className="admin-stock-item" key={product.id}>{product.image_url ? <img src={product.image_url} alt="" /> : <span className="admin-stock-placeholder"><i className="fa-solid fa-shirt" /></span>}<div><strong>{product.name}</strong><small>{product.category_name}</small></div><b className={Number(product.stock) === 0 ? "empty" : ""}>{product.stock}</b></div>)}
                        <Link className="admin-inventory-link" to="/VirtuosaCrud/edit-vestidos">Administrar productos →</Link>
                    </aside>
                </div>

                <section className="admin-quick-actions">
                    <header><span>Accesos rápidos</span><h2>¿Qué deseas gestionar?</h2></header>
                    <div><Link to="/VirtuosaCrud/admin/pedidos"><i className="fa-solid fa-box" /><strong>Pedidos</strong><small>Estados y entregas</small></Link><Link to="/VirtuosaCrud/edit-vestidos"><i className="fa-solid fa-shirt" /><strong>Vestidos</strong><small>Catálogo de moda</small></Link><Link to="/VirtuosaCrud/edit-descuentos"><i className="fa-solid fa-tags" /><strong>Descuentos</strong><small>Ofertas activas</small></Link><Link to="/VirtuosaCrud/edit-maquillaje"><i className="fa-solid fa-wand-magic-sparkles" /><strong>Maquillaje</strong><small>Belleza y cuidado</small></Link></div>
                </section>
            </main>
        </div>
    );
}

export default InicioAdmin;
