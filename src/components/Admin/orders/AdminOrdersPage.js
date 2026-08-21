import React, {
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react";

import NavbarAdmin from "../navbar/NavbarAdmin";

import apiClient from "../../../services/apiClient";

import {
    errorAlert,
    successToast,
} from "../../../utils/alerts";

import "./AdminOrders.css";

const STATUS_LABELS = {
    pending: "Pendiente",
    confirmed: "Confirmado",
    preparing: "Preparando",
    shipped: "Enviado",
    delivered: "Entregado",
    cancelled: "Cancelado",
};

const PAYMENT_LABELS = {
    pending: "Pendiente",
    paid: "Pagado",
    failed: "Fallido",
    refunded: "Reembolsado",
};

const PAYMENT_METHOD_LABELS = {
    cash_on_delivery:
        "Contra entrega",
    bank_transfer:
        "Transferencia",
};

const NEXT_STATUSES = {
    pending: [
        "confirmed",
        "cancelled",
    ],
    confirmed: [
        "preparing",
        "cancelled",
    ],
    preparing: [
        "shipped",
        "cancelled",
    ],
    shipped: [
        "delivered",
    ],
    delivered: [],
    cancelled: [],
};

function AdminOrdersPage() {
    const [
        orders,
        setOrders,
    ] = useState([]);

    const [
        loading,
        setLoading,
    ] = useState(true);

    const [
        error,
        setError,
    ] = useState("");

    const [
        status,
        setStatus,
    ] = useState("");

    const [
        search,
        setSearch,
    ] = useState("");

    const [
        selectedOrder,
        setSelectedOrder,
    ] = useState(null);

    const [
        detailLoading,
        setDetailLoading,
    ] = useState(false);

    const [
        nextStatus,
        setNextStatus,
    ] = useState("");

    const [
        updatingStatus,
        setUpdatingStatus,
    ] = useState(false);

    const formatPrice = (
        value
    ) =>
        Number(value).toLocaleString(
            "es-CO",
            {
                style: "currency",
                currency: "COP",
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
            }
        );

    const formatDate = (
        value
    ) =>
        new Intl.DateTimeFormat(
            "es-CO",
            {
                dateStyle: "medium",
                timeStyle: "short",
            }
        ).format(
            new Date(value)
        );

    const loadOrders =
        useCallback(
            async () => {
                try {
                    setLoading(true);
                    setError("");

                    const response =
                        await apiClient.get(
                            "/orders",
                            {
                                params: {
                                    status:
                                        status ||
                                        undefined,
                                    search:
                                        search.trim() ||
                                        undefined,
                                },
                            }
                        );

                    const data =
                        response?.data
                            ?.data;

                    if (
                        !Array.isArray(
                            data
                        )
                    ) {
                        throw new Error(
                            "Respuesta inválida."
                        );
                    }

                    setOrders(data);
                } catch (err) {
                    console.error(
                        "Error cargando pedidos:",
                        err
                    );

                    setError(
                        "No fue posible cargar los pedidos."
                    );
                } finally {
                    setLoading(false);
                }
            },
            [
                status,
                search,
            ]
        );

    useEffect(() => {
        const timeout =
            window.setTimeout(
                loadOrders,
                search
                    ? 300
                    : 0
            );

        return () =>
            window.clearTimeout(
                timeout
            );
    }, [loadOrders, search]);

    const openOrder =
        async (
            orderId
        ) => {
            try {
                setDetailLoading(true);

                const response =
                    await apiClient.get(
                        `/orders/${orderId}`
                    );

                const order =
                    response?.data
                        ?.data;

                setSelectedOrder(
                    order
                );

                setNextStatus("");
            } catch (err) {
                console.error(
                    err
                );

                await errorAlert(
                    "No se pudo abrir el pedido",
                    err?.response?.data
                        ?.message ||
                    "Inténtalo nuevamente."
                );
            } finally {
                setDetailLoading(false);
            }
        };

    const handleStatusUpdate =
        async () => {
            if (
                !selectedOrder ||
                !nextStatus
            ) {
                return;
            }

            try {
                setUpdatingStatus(true);

                await apiClient.patch(
                    `/orders/${selectedOrder.id}/status`,
                    {
                        status:
                            nextStatus,
                    }
                );

                successToast(
                    "Estado actualizado",
                    `${selectedOrder.reference} → ${STATUS_LABELS[nextStatus]}`
                );

                await loadOrders();
                await openOrder(
                    selectedOrder.id
                );
            } catch (err) {
                console.error(
                    err
                );

                await errorAlert(
                    "No se pudo actualizar",
                    err?.response?.data
                        ?.message ||
                    "Inténtalo nuevamente."
                );
            } finally {
                setUpdatingStatus(false);
            }
        };

    const stats =
        useMemo(
            () => ({
                total:
                    orders.length,
                pending:
                    orders.filter(
                        (
                            order
                        ) =>
                            order.status ===
                            "pending"
                    ).length,
                active:
                    orders.filter(
                        (
                            order
                        ) =>
                            ![
                                "delivered",
                                "cancelled",
                            ].includes(
                                order.status
                            )
                    ).length,
            }),
            [orders]
        );

    return (
        <div className="admin-orders-page">
            <NavbarAdmin />

            <main className="admin-orders-main">
                <section className="admin-orders-header">
                    <div>
                        <span>
                            Administración
                        </span>

                        <h1>
                            Pedidos
                        </h1>

                        <p>
                            Consulta pedidos registrados, datos de entrega y estado operativo.
                        </p>
                    </div>
                </section>

                <section className="admin-orders-stats">
                    <article>
                        <span>
                            Resultados
                        </span>

                        <strong>
                            {stats.total}
                        </strong>
                    </article>

                    <article>
                        <span>
                            Pendientes
                        </span>

                        <strong>
                            {stats.pending}
                        </strong>
                    </article>

                    <article>
                        <span>
                            En proceso
                        </span>

                        <strong>
                            {stats.active}
                        </strong>
                    </article>
                </section>

                <section className="admin-orders-toolbar">
                    <div className="admin-orders-search">
                        <i className="fa-solid fa-magnifying-glass" />

                        <input
                            type="search"
                            value={
                                search
                            }
                            onChange={(
                                event
                            ) =>
                                setSearch(
                                    event.target
                                        .value
                                )
                            }
                            placeholder="Referencia, cliente, correo o teléfono"
                        />
                    </div>

                    <select
                        value={
                            status
                        }
                        onChange={(
                            event
                        ) =>
                            setStatus(
                                event.target
                                    .value
                            )
                        }
                    >
                        <option value="">
                            Todos los estados
                        </option>

                        {Object.entries(
                            STATUS_LABELS
                        ).map(
                            ([
                                value,
                                label,
                            ]) => (
                                <option
                                    key={
                                        value
                                    }
                                    value={
                                        value
                                    }
                                >
                                    {label}
                                </option>
                            )
                        )}
                    </select>
                </section>

                {loading && (
                    <section className="admin-orders-status">
                        <div className="admin-orders-loader" />
                        <h2>
                            Cargando pedidos
                        </h2>
                    </section>
                )}

                {!loading &&
                    error && (
                        <section className="admin-orders-status">
                            <h2>
                                No pudimos cargar los pedidos
                            </h2>
                            <p>
                                {error}
                            </p>
                            <button
                                type="button"
                                onClick={
                                    loadOrders
                                }
                            >
                                Reintentar
                            </button>
                        </section>
                    )}

                {!loading &&
                    !error &&
                    orders.length ===
                    0 && (
                        <section className="admin-orders-status">
                            <i className="fa-solid fa-box-open" />
                            <h2>
                                No hay pedidos
                            </h2>
                            <p>
                                Los pedidos creados desde el checkout aparecerán aquí.
                            </p>
                        </section>
                    )}

                {!loading &&
                    !error &&
                    orders.length >
                    0 && (
                        <section className="admin-orders-list">
                            {orders.map(
                                (
                                    order
                                ) => (
                                    <article
                                        className="admin-order-card"
                                        key={
                                            order.id
                                        }
                                    >
                                        <div className="admin-order-reference">
                                            <span>
                                                Pedido
                                            </span>
                                            <strong>
                                                {
                                                    order.reference
                                                }
                                            </strong>
                                            <small>
                                                {formatDate(
                                                    order.created_at
                                                )}
                                            </small>
                                        </div>

                                        <div className="admin-order-customer">
                                            <span>
                                                Cliente
                                            </span>
                                            <strong>
                                                {
                                                    order.customer_name
                                                }
                                            </strong>
                                            <small>
                                                {
                                                    order.customer_email
                                                }
                                            </small>
                                        </div>

                                        <div className="admin-order-items-count">
                                            <span>
                                                Unidades
                                            </span>
                                            <strong>
                                                {
                                                    order.item_count
                                                }
                                            </strong>
                                        </div>

                                        <div className="admin-order-total">
                                            <span>
                                                Total
                                            </span>
                                            <strong>
                                                {formatPrice(
                                                    order.total
                                                )}
                                            </strong>
                                        </div>

                                        <span
                                            className={`admin-order-status-pill ${order.status}`}
                                        >
                                            {
                                                STATUS_LABELS[
                                                    order.status
                                                ] ||
                                                order.status
                                            }
                                        </span>

                                        <button
                                            type="button"
                                            className="admin-order-open"
                                            onClick={() =>
                                                openOrder(
                                                    order.id
                                                )
                                            }
                                            disabled={
                                                detailLoading
                                            }
                                        >
                                            Ver pedido
                                        </button>
                                    </article>
                                )
                            )}
                        </section>
                    )}
            </main>

            {selectedOrder && (
                <div
                    className="admin-order-modal-overlay"
                    onClick={() =>
                        setSelectedOrder(
                            null
                        )
                    }
                    role="presentation"
                >
                    <section
                        className="admin-order-modal"
                        role="dialog"
                        aria-modal="true"
                        onClick={(
                            event
                        ) =>
                            event.stopPropagation()
                        }
                    >
                        <button
                            type="button"
                            className="admin-order-modal-close"
                            onClick={() =>
                                setSelectedOrder(
                                    null
                                )
                            }
                            aria-label="Cerrar pedido"
                        >
                            ×
                        </button>

                        <div className="admin-order-modal-heading">
                            <span>
                                Pedido
                            </span>

                            <h2>
                                {
                                    selectedOrder.reference
                                }
                            </h2>

                            <p>
                                {formatDate(
                                    selectedOrder.created_at
                                )}
                            </p>
                        </div>

                        <div className="admin-order-detail-grid">
                            <article>
                                <span>
                                    Cliente
                                </span>
                                <strong>
                                    {
                                        selectedOrder.customer_name
                                    }
                                </strong>
                                <p>
                                    {
                                        selectedOrder.customer_email
                                    }
                                    <br />
                                    {
                                        selectedOrder.customer_phone
                                    }
                                </p>
                            </article>

                            <article>
                                <span>
                                    Entrega
                                </span>
                                <strong>
                                    {
                                        selectedOrder.shipping_city
                                    }
                                </strong>
                                <p>
                                    {
                                        selectedOrder.shipping_address
                                    }
                                    {selectedOrder.shipping_department
                                        ? `, ${selectedOrder.shipping_department}`
                                        : ""}
                                </p>
                            </article>

                            <article>
                                <span>
                                    Pago
                                </span>
                                <strong>
                                    {
                                        PAYMENT_METHOD_LABELS[
                                            selectedOrder.payment_method
                                        ] ||
                                        selectedOrder.payment_method
                                    }
                                </strong>
                                <p>
                                    {
                                        PAYMENT_LABELS[
                                            selectedOrder.payment_status
                                        ] ||
                                        selectedOrder.payment_status
                                    }
                                </p>
                            </article>
                        </div>

                        {selectedOrder.notes && (
                            <div className="admin-order-notes">
                                <span>
                                    Notas
                                </span>
                                <p>
                                    {
                                        selectedOrder.notes
                                    }
                                </p>
                            </div>
                        )}

                        <div className="admin-order-lines">
                            {selectedOrder.items?.map(
                                (
                                    item
                                ) => (
                                    <article
                                        key={
                                            item.id
                                        }
                                    >
                                        <img
                                            src={
                                                item.product_image_url
                                            }
                                            alt={
                                                item.product_name
                                            }
                                        />

                                        <div>
                                            <strong>
                                                {
                                                    item.product_name
                                                }
                                            </strong>
                                            <span>
                                                {item.quantity} × {formatPrice(
                                                    item.unit_price
                                                )}
                                            </span>
                                            {item.size && (
                                                <span>
                                                    Talla {item.size}
                                                </span>
                                            )}
                                        </div>

                                        <strong>
                                            {formatPrice(
                                                item.subtotal
                                            )}
                                        </strong>
                                    </article>
                                )
                            )}
                        </div>

                        <div className="admin-order-modal-total">
                            <span>
                                Total
                            </span>
                            <strong>
                                {formatPrice(
                                    selectedOrder.total
                                )}
                            </strong>
                        </div>

                        {(NEXT_STATUSES[
                            selectedOrder.status
                        ] || []).length >
                            0 && (
                            <div className="admin-order-status-editor">
                                <label htmlFor="next-order-status">
                                    Cambiar estado
                                </label>

                                <div>
                                    <select
                                        id="next-order-status"
                                        value={
                                            nextStatus
                                        }
                                        onChange={(
                                            event
                                        ) =>
                                            setNextStatus(
                                                event.target
                                                    .value
                                            )
                                        }
                                    >
                                        <option value="">
                                            Selecciona un estado
                                        </option>

                                        {NEXT_STATUSES[
                                            selectedOrder.status
                                        ].map(
                                            (
                                                value
                                            ) => (
                                                <option
                                                    key={
                                                        value
                                                    }
                                                    value={
                                                        value
                                                    }
                                                >
                                                    {
                                                        STATUS_LABELS[
                                                            value
                                                        ]
                                                    }
                                                </option>
                                            )
                                        )}
                                    </select>

                                    <button
                                        type="button"
                                        onClick={
                                            handleStatusUpdate
                                        }
                                        disabled={
                                            !nextStatus ||
                                            updatingStatus
                                        }
                                    >
                                        {updatingStatus
                                            ? "Actualizando..."
                                            : "Actualizar"}
                                    </button>
                                </div>

                                {nextStatus ===
                                    "cancelled" && (
                                    <p>
                                        Al cancelar, las unidades del pedido regresarán al stock.
                                    </p>
                                )}
                            </div>
                        )}
                    </section>
                </div>
            )}
        </div>
    );
}

export default AdminOrdersPage;
