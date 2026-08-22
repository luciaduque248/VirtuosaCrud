import React, { useEffect } from "react";
import {
    CalendarDays,
    Mail,
    MapPin,
    PackageCheck,
    Phone,
    ShoppingBag,
    Users,
    X,
} from "lucide-react";

const formatPrice = (value) => Number(value || 0).toLocaleString("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
});

const formatDate = (value) => new Intl.DateTimeFormat("es-CO", {
    dateStyle: "medium",
    timeStyle: "short",
}).format(new Date(value));

const orderStatusLabels = {
    pending: "Recibido",
    confirmed: "Confirmado",
    preparing: "Preparando",
    shipped: "En camino",
    delivered: "Entregado",
    cancelled: "Cancelado",
};

const getOrderStatusLabel = (status) =>
    orderStatusLabels[status] || "Estado pendiente";

function AdminProductBuyersModal({ details, loading, error, onClose }) {
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Escape") onClose();
        };

        document.addEventListener("keydown", handleKeyDown);
        document.body.classList.add("admin-modal-open");

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.classList.remove("admin-modal-open");
        };
    }, [onClose]);

    const product = details?.product;
    const buyers = details?.buyers || [];
    const summary = details?.summary || {};

    return (
        <div
            className="admin-buyers-overlay"
            role="presentation"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) onClose();
            }}
        >
            <section
                className="admin-buyers-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="admin-buyers-title"
            >
                <button
                    type="button"
                    className="admin-buyers-close"
                    onClick={onClose}
                    aria-label="Cerrar detalle del producto"
                >
                    <X size={20} aria-hidden="true" />
                </button>

                {loading && (
                    <div className="admin-buyers-state">
                        <div className="admin-products-loader" />
                        <strong>Consultando compradores…</strong>
                    </div>
                )}

                {!loading && error && (
                    <div className="admin-buyers-state admin-buyers-error">
                        <strong>No pudimos cargar el detalle</strong>
                        <p>{error}</p>
                    </div>
                )}

                {!loading && !error && product && (
                    <>
                        <header className="admin-buyers-header">
                            <img src={product.image_url} alt="" />
                            <div>
                                <span>Detalle de producto</span>
                                <h2 id="admin-buyers-title">{product.name}</h2>
                                <p>{product.description || "Sin descripción."}</p>
                                <div className="admin-buyers-product-meta">
                                    <span>{formatPrice(product.price)}</span>
                                    <span>{product.stock} unidades disponibles</span>
                                    <span>{product.category_name}</span>
                                </div>
                            </div>
                        </header>

                        <div className="admin-buyers-summary" aria-label="Resumen de ventas pagadas">
                            <article>
                                <Users size={20} aria-hidden="true" />
                                <span>Compradores</span>
                                <strong>{summary.uniqueBuyers || 0}</strong>
                            </article>
                            <article>
                                <ShoppingBag size={20} aria-hidden="true" />
                                <span>Unidades vendidas</span>
                                <strong>{summary.unitsSold || 0}</strong>
                            </article>
                            <article>
                                <PackageCheck size={20} aria-hidden="true" />
                                <span>Ventas pagadas</span>
                                <strong>{formatPrice(summary.revenue)}</strong>
                            </article>
                        </div>

                        <div className="admin-buyers-section-heading">
                            <div>
                                <span>Historial verificado</span>
                                <h3>Quiénes compraron este producto</h3>
                            </div>
                            <span className="admin-buyers-count">
                                {buyers.length} {buyers.length === 1 ? "compra" : "compras"}
                            </span>
                        </div>

                        {buyers.length === 0 ? (
                            <div className="admin-buyers-empty">
                                <ShoppingBag size={30} aria-hidden="true" />
                                <strong>Aún no tiene compras pagadas</strong>
                                <p>Los pedidos pendientes o cancelados no se cuentan como compradores.</p>
                            </div>
                        ) : (
                            <div className="admin-buyers-list">
                                {buyers.map((buyer) => (
                                    <article
                                        className="admin-buyer-card"
                                        key={`${buyer.reference}-${buyer.customer_email}`}
                                    >
                                        <div className="admin-buyer-heading">
                                            <div className="admin-buyer-avatar" aria-hidden="true">
                                                {String(buyer.customer_name || "C").charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <strong>{buyer.customer_name}</strong>
                                                <span>Pedido {buyer.reference}</span>
                                            </div>
                                            <div className="admin-buyer-statuses">
                                                <span className="admin-buyer-paid">Pago confirmado</span>
                                                <span className={`admin-buyer-order-status status-${buyer.status}`}>
                                                    Pedido: {getOrderStatusLabel(buyer.status)}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="admin-buyer-contact">
                                            <a href={`mailto:${buyer.customer_email}`}>
                                                <Mail size={16} aria-hidden="true" />
                                                {buyer.customer_email}
                                            </a>
                                            <a href={`tel:${buyer.customer_phone}`}>
                                                <Phone size={16} aria-hidden="true" />
                                                {buyer.customer_phone}
                                            </a>
                                            <span>
                                                <MapPin size={16} aria-hidden="true" />
                                                {buyer.shipping_address}, {buyer.shipping_city}
                                                {buyer.shipping_department ? `, ${buyer.shipping_department}` : ""}
                                            </span>
                                        </div>

                                        <footer className="admin-buyer-purchase">
                                            <span>
                                                <CalendarDays size={15} aria-hidden="true" />
                                                {formatDate(buyer.created_at)}
                                            </span>
                                            <span>{buyer.quantity} ud.{buyer.size ? ` · Talla ${buyer.size}` : ""}</span>
                                            <strong>{formatPrice(buyer.subtotal)}</strong>
                                        </footer>
                                    </article>
                                ))}
                            </div>
                        )}
                    </>
                )}
            </section>
        </div>
    );
}

export default AdminProductBuyersModal;
