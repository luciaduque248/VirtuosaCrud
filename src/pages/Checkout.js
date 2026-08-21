import React, {
    useState,
} from "react";

import {
    Link,
} from "react-router-dom";

import Header from "../components/header/header";
import Home from "../components/home/home";
import Footer from "../components/footer/footer";

import {
    useCart,
} from "../context/CartContext";

import apiClient from "../services/apiClient";

import {
    errorAlert,
    successToast,
} from "../utils/alerts";

import "../components/assets/css/Checkout.css";

function Checkout() {
    const {
        cartItems,
        itemCount,
        subtotal,
        clearCart,
    } = useCart();

    const [
        loading,
        setLoading,
    ] = useState(false);

    const [
        completedOrder,
        setCompletedOrder,
    ] = useState(null);

    const [
        form,
        setForm,
    ] = useState({
        customerName: "",
        customerEmail: "",
        customerPhone: "",
        shippingAddress: "",
        shippingCity: "",
        shippingDepartment: "",
        paymentMethod:
            "cash_on_delivery",
        notes: "",
    });

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

    const handleChange = (
        event
    ) => {
        const {
            name,
            value,
        } = event.target;

        setForm(
            (
                current
            ) => ({
                ...current,
                [name]:
                    value,
            })
        );
    };

    const handleSubmit =
        async (
            event
        ) => {
            event.preventDefault();

            if (
                cartItems.length ===
                0
            ) {
                return;
            }

            const payload = {
                customerName:
                    form.customerName.trim(),
                customerEmail:
                    form.customerEmail.trim(),
                customerPhone:
                    form.customerPhone.trim(),
                shippingAddress:
                    form.shippingAddress.trim(),
                shippingCity:
                    form.shippingCity.trim(),
                shippingDepartment:
                    form.shippingDepartment.trim(),
                paymentMethod:
                    form.paymentMethod,
                notes:
                    form.notes.trim(),
                items:
                    cartItems.map(
                        (
                            item
                        ) => ({
                            productId:
                                item.id,
                            quantity:
                                item.quantity,
                            size:
                                item.size ||
                                null,
                        })
                    ),
            };

            try {
                setLoading(true);

                const response =
                    await apiClient.post(
                        "/orders",
                        payload
                    );

                const order =
                    response?.data
                        ?.data;

                if (
                    !order?.reference
                ) {
                    throw new Error(
                        "La API no devolvió una referencia de pedido."
                    );
                }

                if (form.paymentMethod === "stripe") {
                    clearCart();
                    try {
                        const paymentResponse = await apiClient.post("/payments/checkout", { reference: order.reference, email: form.customerEmail.trim() });
                        const paymentUrl = paymentResponse?.data?.data?.url;
                        if (!paymentUrl) throw new Error("No fue posible iniciar el pago seguro.");
                        window.location.assign(paymentUrl);
                    } catch (paymentError) {
                        setCompletedOrder(order);
                        await errorAlert("Pedido creado, pago pendiente", "Conserva la referencia e intenta el pago nuevamente desde seguimiento.");
                    }
                    return;
                }

                clearCart();

                setCompletedOrder(
                    order
                );

                successToast(
                    "Pedido registrado",
                    order.reference
                );

                window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                });
            } catch (error) {
                console.error(
                    "Checkout error:",
                    error
                );

                await errorAlert(
                    "No pudimos crear el pedido",
                    error?.response
                        ?.data
                        ?.message ||
                    "Verifica los datos e inténtalo nuevamente."
                );
            } finally {
                setLoading(false);
            }
        };

    if (completedOrder) {
        return (
            <div className="checkout-page">
                <Header />
                <Home />

                <main className="checkout-main checkout-confirmation-wrap">
                    <section className="checkout-confirmation">
                        <div className="checkout-confirmation-icon">
                            <i className="fa-solid fa-check" />
                        </div>

                        <span>
                            Pedido recibido
                        </span>

                        <h1>
                            ¡Gracias por tu compra!
                        </h1>

                        <p>
                            Tu pedido quedó registrado correctamente en Virtuosa.
                            Conserva esta referencia para identificarlo.
                        </p>

                        <div className="checkout-reference">
                            <span>
                                Referencia
                            </span>

                            <strong>
                                {
                                    completedOrder.reference
                                }
                            </strong>
                        </div>

                        <div className="checkout-confirmation-grid">
                            <div>
                                <span>
                                    Estado
                                </span>

                                <strong>
                                    Pendiente
                                </strong>
                            </div>

                            <div>
                                <span>
                                    Total confirmado
                                </span>

                                <strong>
                                    {formatPrice(
                                        completedOrder.total
                                    )}
                                </strong>
                            </div>
                        </div>

                        <p className="checkout-confirmation-note">
                            El pago no se procesa en línea en esta versión.
                            El pedido queda pendiente de confirmación según el método seleccionado.
                        </p>

                        <Link
                            to={`/VirtuosaCrud/seguimiento?reference=${encodeURIComponent(completedOrder.reference)}&email=${encodeURIComponent(completedOrder.customer_email || form.customerEmail)}`}
                            className="checkout-primary-link"
                        >
                            Seguir mi pedido
                        </Link>

                        <Link
                            to="/VirtuosaCrud/"
                            className="checkout-secondary-link"
                        >
                            Volver a la tienda
                        </Link>
                    </section>
                </main>

                <Footer />
            </div>
        );
    }

    if (
        cartItems.length ===
        0
    ) {
        return (
            <div className="checkout-page">
                <Header />
                <Home />

                <main className="checkout-main checkout-empty-wrap">
                    <section className="checkout-empty">
                        <div className="checkout-empty-icon">
                            <i className="fa-solid fa-bag-shopping" />
                        </div>

                        <h1>
                            No hay productos para finalizar
                        </h1>

                        <p>
                            Agrega productos al carrito antes de continuar con el checkout.
                        </p>

                        <Link
                            to="/VirtuosaCrud/"
                            className="checkout-primary-link"
                        >
                            Ir a comprar
                        </Link>
                    </section>
                </main>

                <Footer />
            </div>
        );
    }

    return (
        <div className="checkout-page">
            <Header />
            <Home />

            <main className="checkout-main">
                <section className="checkout-heading">
                    <span>
                        VIRTUOSA
                    </span>

                    <h1>
                        Finalizar compra
                    </h1>

                    <p>
                        Confirma tus datos de contacto y entrega. El precio final de los productos se valida nuevamente en el servidor antes de crear el pedido.
                    </p>
                </section>

                <div className="checkout-layout">
                    <form
                        id="checkout-form"
                        className="checkout-form"
                        onSubmit={
                            handleSubmit
                        }
                    >
                        <section className="checkout-card">
                            <div className="checkout-section-title">
                                <span>
                                    01
                                </span>

                                <div>
                                    <h2>
                                        Datos de contacto
                                    </h2>

                                    <p>
                                        Información para identificar y confirmar tu pedido.
                                    </p>
                                </div>
                            </div>

                            <div className="checkout-field">
                                <label htmlFor="customerName">
                                    Nombre completo
                                </label>

                                <input
                                    id="customerName"
                                    name="customerName"
                                    type="text"
                                    value={
                                        form.customerName
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    maxLength="150"
                                    autoComplete="name"
                                    required
                                />
                            </div>

                            <div className="checkout-form-row">
                                <div className="checkout-field">
                                    <label htmlFor="customerEmail">
                                        Correo electrónico
                                    </label>

                                    <input
                                        id="customerEmail"
                                        name="customerEmail"
                                        type="email"
                                        value={
                                            form.customerEmail
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        maxLength="180"
                                        autoComplete="email"
                                        required
                                    />
                                </div>

                                <div className="checkout-field">
                                    <label htmlFor="customerPhone">
                                        Teléfono
                                    </label>

                                    <input
                                        id="customerPhone"
                                        name="customerPhone"
                                        type="tel"
                                        value={
                                            form.customerPhone
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        maxLength="40"
                                        autoComplete="tel"
                                        required
                                    />
                                </div>
                            </div>
                        </section>

                        <section className="checkout-card">
                            <div className="checkout-section-title">
                                <span>
                                    02
                                </span>

                                <div>
                                    <h2>
                                        Entrega
                                    </h2>

                                    <p>
                                        Dirección donde se coordinará el envío.
                                    </p>
                                </div>
                            </div>

                            <div className="checkout-field">
                                <label htmlFor="shippingAddress">
                                    Dirección
                                </label>

                                <input
                                    id="shippingAddress"
                                    name="shippingAddress"
                                    type="text"
                                    value={
                                        form.shippingAddress
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    maxLength="500"
                                    autoComplete="street-address"
                                    placeholder="Calle, carrera, número, apartamento..."
                                    required
                                />
                            </div>

                            <div className="checkout-form-row">
                                <div className="checkout-field">
                                    <label htmlFor="shippingCity">
                                        Ciudad
                                    </label>

                                    <input
                                        id="shippingCity"
                                        name="shippingCity"
                                        type="text"
                                        value={
                                            form.shippingCity
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        maxLength="120"
                                        autoComplete="address-level2"
                                        required
                                    />
                                </div>

                                <div className="checkout-field">
                                    <label htmlFor="shippingDepartment">
                                        Departamento
                                    </label>

                                    <input
                                        id="shippingDepartment"
                                        name="shippingDepartment"
                                        type="text"
                                        value={
                                            form.shippingDepartment
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        maxLength="120"
                                        autoComplete="address-level1"
                                    />
                                </div>
                            </div>

                            <div className="checkout-field">
                                <label htmlFor="notes">
                                    Indicaciones adicionales
                                </label>

                                <textarea
                                    id="notes"
                                    name="notes"
                                    rows="4"
                                    value={
                                        form.notes
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    maxLength="1000"
                                    placeholder="Barrio, torre, referencia de entrega..."
                                />
                            </div>
                        </section>

                        <section className="checkout-card">
                            <div className="checkout-section-title">
                                <span>
                                    03
                                </span>

                                <div>
                                    <h2>
                                        Método de pago
                                    </h2>

                                    <p>
                                        El pedido se registra con pago pendiente; no almacenamos datos bancarios.
                                    </p>
                                </div>
                            </div>

                            <div className="checkout-field">
                                <label htmlFor="paymentMethod">
                                    Selecciona una opción
                                </label>

                                <select
                                    id="paymentMethod"
                                    name="paymentMethod"
                                    value={
                                        form.paymentMethod
                                    }
                                    onChange={
                                        handleChange
                                    }
                                >
                                    <option value="cash_on_delivery">
                                        Pago contra entrega
                                    </option>

                                    <option value="bank_transfer">
                                        Transferencia bancaria — por confirmar
                                    </option>
                                    <option value="stripe">Pago en línea seguro</option>
                                </select>
                            </div>

                            <div className="checkout-payment-note">
                                <i className="fa-solid fa-shield-halved" />

                                <p>
                                    {form.paymentMethod === "stripe" ? "Serás dirigido a Stripe para completar el pago de forma segura. Virtuosa no almacena los datos de tu tarjeta." : "El estado inicial del pago será pendiente hasta su confirmación."}
                                </p>
                            </div>
                        </section>

                        <div className="checkout-actions-mobile">
                            <button
                                type="submit"
                                className="checkout-submit"
                                disabled={
                                    loading
                                }
                            >
                                {loading
                                    ? "Creando pedido..."
                                    : "Confirmar pedido"}
                            </button>
                        </div>
                    </form>

                    <aside className="checkout-summary">
                        <span className="checkout-summary-eyebrow">
                            Resumen
                        </span>

                        <h2>
                            Tu pedido
                        </h2>

                        <div className="checkout-summary-items">
                            {cartItems.map(
                                (
                                    item
                                ) => (
                                    <article
                                        key={
                                            item.key
                                        }
                                        className="checkout-summary-item"
                                    >
                                        <img
                                            src={
                                                item.imageUrl
                                            }
                                            alt={
                                                item.name
                                            }
                                        />

                                        <div>
                                            <strong>
                                                {
                                                    item.name
                                                }
                                            </strong>

                                            <span>
                                                {item.quantity} × {formatPrice(
                                                    item.price
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
                                                item.price *
                                                item.quantity
                                            )}
                                        </strong>
                                    </article>
                                )
                            )}
                        </div>

                        <div className="checkout-summary-divider" />

                        <div className="checkout-summary-row">
                            <span>
                                Unidades
                            </span>

                            <strong>
                                {itemCount}
                            </strong>
                        </div>

                        <div className="checkout-summary-row">
                            <span>
                                Envío
                            </span>

                            <strong>
                                Por coordinar
                            </strong>
                        </div>

                        <div className="checkout-summary-total">
                            <span>
                                Productos
                            </span>

                            <strong>
                                {formatPrice(
                                    subtotal
                                )}
                            </strong>
                        </div>

                        <p className="checkout-server-note">
                            El servidor vuelve a validar precios y stock antes de confirmar el pedido.
                        </p>

                        <button
                            type="submit"
                            form="checkout-form"
                            className="checkout-submit checkout-submit-desktop"
                            disabled={
                                loading
                            }
                        >
                            {loading
                                ? "Creando pedido..."
                                : "Confirmar pedido"}
                        </button>

                        <Link
                            to="/VirtuosaCrud/carrito"
                            className="checkout-back-link"
                        >
                            Volver al carrito
                        </Link>
                    </aside>
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default Checkout;
