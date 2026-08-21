import React from "react";

import {
    Link,
} from "react-router-dom";

import Header from "../components/header/header";
import Home from "../components/home/home";
import Footer from "../components/footer/footer";

import {
    useCart,
} from "../context/CartContext";

import {
    confirmCartRemove,
    confirmClearCart,
    checkoutInfo,
} from "../utils/alerts";

import "../components/assets/css/Cart.css";

function Cart() {
    const {
        cartItems,
        itemCount,
        subtotal,

        removeFromCart,
        updateQuantity,
        clearCart,
    } = useCart();

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

    const handleRemove =
        async (
            item
        ) => {
            const confirmed =
                await confirmCartRemove(
                    item.name
                );

            if (confirmed) {
                removeFromCart(
                    item.key
                );
            }
        };

    const handleClear =
        async () => {
            const confirmed =
                await confirmClearCart();

            if (confirmed) {
                clearCart();
            }
        };

    return (
        <div className="cart-page">
            <Header />

            <Home />

            <main className="cart-main">
                <div className="cart-heading">
                    <span>
                        VIRTUOSA
                    </span>

                    <h1>
                        Tu carrito
                    </h1>

                    <p>
                        {itemCount === 0
                            ? "Tu carrito está vacío."
                            : `${itemCount} ${itemCount ===
                                1
                                ? "producto"
                                : "productos"
                            } en tu carrito.`}
                    </p>
                </div>

                {cartItems.length ===
                    0 ? (
                    <section className="cart-empty">
                        <div className="cart-empty-icon">
                            <i className="fa-solid fa-bag-shopping" />
                        </div>

                        <h2>
                            Aún no agregaste
                            productos
                        </h2>

                        <p>
                            Explora las
                            colecciones de
                            Virtuosa y agrega
                            tus favoritos.
                        </p>

                        <Link
                            to="/VirtuosaCrud/"
                            className="cart-shop-button"
                        >
                            Ir a comprar
                        </Link>
                    </section>
                ) : (
                    <div className="cart-layout">
                        {/* PRODUCTOS */}

                        <section className="cart-items">
                            <div className="cart-items-header">
                                <h2>
                                    Productos
                                </h2>

                                <button
                                    type="button"
                                    onClick={
                                        handleClear
                                    }
                                >
                                    Vaciar carrito
                                </button>
                            </div>

                            {cartItems.map(
                                (
                                    item
                                ) => (
                                    <article
                                        className="cart-item"
                                        key={
                                            item.key
                                        }
                                    >
                                        <div className="cart-item-image">
                                            <img
                                                src={
                                                    item.imageUrl
                                                }
                                                alt={
                                                    item.name
                                                }
                                            />
                                        </div>

                                        <div className="cart-item-info">
                                            <span>
                                                {
                                                    item.subcategory
                                                }
                                            </span>

                                            <h3>
                                                {
                                                    item.name
                                                }
                                            </h3>

                                            {item.size && (
                                                <p>
                                                    Talla:{" "}
                                                    <strong>
                                                        {
                                                            item.size
                                                        }
                                                    </strong>
                                                </p>
                                            )}

                                            <strong className="cart-item-unit-price">
                                                {formatPrice(
                                                    item.price
                                                )}
                                            </strong>
                                        </div>

                                        <div className="cart-item-quantity">
                                            <label>
                                                Cantidad
                                            </label>

                                            <select
                                                value={
                                                    item.quantity
                                                }
                                                onChange={(
                                                    event
                                                ) =>
                                                    updateQuantity(
                                                        item.key,
                                                        Number(
                                                            event
                                                                .target
                                                                .value
                                                        )
                                                    )
                                                }
                                            >
                                                {Array.from(
                                                    {
                                                        length:
                                                            Math.min(
                                                                item.stock,
                                                                10
                                                            ),
                                                    },
                                                    (
                                                        _,
                                                        index
                                                    ) =>
                                                        index +
                                                        1
                                                ).map(
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
                                                                value
                                                            }
                                                        </option>
                                                    )
                                                )}
                                            </select>
                                        </div>

                                        <div className="cart-item-total">
                                            <span>
                                                Subtotal
                                            </span>

                                            <strong>
                                                {formatPrice(
                                                    item.price *
                                                    item.quantity
                                                )}
                                            </strong>
                                        </div>

                                        <button
                                            type="button"
                                            className="cart-item-remove"
                                            onClick={() =>
                                                handleRemove(
                                                    item
                                                )
                                            }
                                            aria-label={`Eliminar ${item.name}`}
                                        >
                                            <i className="fa-solid fa-trash" />
                                        </button>
                                    </article>
                                )
                            )}
                        </section>

                        {/* SUMMARY */}

                        <aside className="cart-summary">
                            <span className="cart-summary-eyebrow">
                                Resumen
                            </span>

                            <h2>
                                Tu pedido
                            </h2>

                            <div className="cart-summary-row">
                                <span>
                                    Productos
                                </span>

                                <strong>
                                    {itemCount}
                                </strong>
                            </div>

                            <div className="cart-summary-row">
                                <span>
                                    Envío
                                </span>

                                <strong>
                                    Por calcular
                                </strong>
                            </div>

                            <div className="cart-summary-divider" />

                            <div className="cart-summary-total">
                                <span>
                                    Subtotal
                                </span>

                                <strong>
                                    {formatPrice(
                                        subtotal
                                    )}
                                </strong>
                            </div>

                            <button
                                type="button"
                                className="cart-checkout"
                                onClick={
                                    checkoutInfo
                                }
                            >
                                Continuar compra
                            </button>

                            <Link
                                to="/VirtuosaCrud/"
                                className="cart-continue"
                            >
                                Seguir comprando
                            </Link>

                            <p>
                                El pago y la
                                creación de pedidos
                                se conectarán al
                                backend en la fase
                                de checkout.
                            </p>
                        </aside>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}

export default Cart;