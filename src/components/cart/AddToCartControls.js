import React, {
    useEffect,
    useMemo,
    useState,
} from "react";

import {
    useCart,
} from "../../context/CartContext";

import {
    cartAlert,
    warningAlert,
} from "../../utils/alerts";

import "./CartControls.css";

function AddToCartControls({
    product,
    showSize = false,
}) {
    const {
        addToCart,
    } = useCart();

    const [
        quantity,
        setQuantity,
    ] = useState(1);

    const [
        size,
        setSize,
    ] = useState("M");

    const stock =
        Number(
            product?.stock
        ) || 0;

    useEffect(() => {
        setQuantity(1);
        setSize("M");
    }, [product?.id]);

    const quantities =
        useMemo(
            () =>
                Array.from(
                    {
                        length:
                            Math.min(
                                Math.max(
                                    stock,
                                    0
                                ),
                                10
                            ),
                    },
                    (
                        _,
                        index
                    ) =>
                        index + 1
                ),
            [stock]
        );

    const handleAdd =
        () => {
            const result =
                addToCart(
                    product,
                    {
                        quantity,
                        size:
                            showSize
                                ? size
                                : null,
                    }
                );

            if (!result.ok) {
                void warningAlert(
                    "Producto no disponible",
                    "Este producto no tiene unidades disponibles."
                );

                return;
            }

            /*
              El modal de producto puede permanecer abierto.
              La notificación se muestra de inmediato y, por CSS,
              siempre queda visualmente por encima del modal.
            */
            cartAlert(
                product.name
            );
        };

    return (
        <div className="cart-controls">
            {showSize && (
                <div className="cart-controls-field">
                    <label htmlFor={`size-${product.id}`}>
                        Talla
                    </label>

                    <select
                        id={`size-${product.id}`}
                        value={size}
                        onChange={(
                            event
                        ) =>
                            setSize(
                                event.target
                                    .value
                            )
                        }
                        disabled={
                            stock <= 0
                        }
                    >
                        <option value="XS">
                            XS
                        </option>

                        <option value="S">
                            S
                        </option>

                        <option value="M">
                            M
                        </option>

                        <option value="L">
                            L
                        </option>

                        <option value="XL">
                            XL
                        </option>
                    </select>
                </div>
            )}

            <div className="cart-controls-field">
                <label htmlFor={`quantity-${product.id}`}>
                    Cantidad
                </label>

                <select
                    id={`quantity-${product.id}`}
                    value={quantity}
                    onChange={(
                        event
                    ) =>
                        setQuantity(
                            Number(
                                event.target
                                    .value
                            )
                        )
                    }
                    disabled={
                        stock <= 0
                    }
                >
                    {quantities.map(
                        (
                            value
                        ) => (
                            <option
                                key={value}
                                value={value}
                            >
                                {value}
                            </option>
                        )
                    )}

                    {stock <= 0 && (
                        <option value="1">
                            0
                        </option>
                    )}
                </select>
            </div>

            <button
                type="button"
                className="cart-controls-add"
                onClick={
                    handleAdd
                }
                disabled={
                    stock <= 0
                }
            >
                <i className="fa-solid fa-cart-shopping" />

                {stock > 0
                    ? "Agregar al carrito"
                    : "Producto agotado"}
            </button>
        </div>
    );
}

export default AddToCartControls;