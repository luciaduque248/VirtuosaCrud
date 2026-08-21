import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";

const CartContext =
    createContext(null);

const STORAGE_KEY =
    "virtuosa_cart_v1";

/* =========================================================
   LEER LOCAL STORAGE
========================================================= */

const loadInitialCart =
    () => {
        try {
            const stored =
                localStorage.getItem(
                    STORAGE_KEY
                );

            if (!stored) {
                return [];
            }

            const parsed =
                JSON.parse(stored);

            return Array.isArray(
                parsed
            )
                ? parsed
                : [];
        } catch (error) {
            console.error(
                "Error leyendo carrito:",
                error
            );

            return [];
        }
    };

/* =========================================================
   PROVIDER
========================================================= */

export function CartProvider({
    children,
}) {
    const [
        cartItems,
        setCartItems,
    ] = useState(
        loadInitialCart
    );

    /* =======================================================
       PERSISTENCIA
    ======================================================= */

    useEffect(() => {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(
                cartItems
            )
        );
    }, [cartItems]);

    /* =======================================================
       ADD
    ======================================================= */

    const addToCart =
        useCallback(
            (
                product,
                {
                    quantity = 1,
                    size = null,
                } = {}
            ) => {
                if (!product) {
                    return {
                        ok: false,
                        reason:
                            "invalid_product",
                    };
                }

                const stock =
                    Number(
                        product.stock
                    );

                if (
                    Number.isNaN(
                        stock
                    ) ||
                    stock <= 0
                ) {
                    return {
                        ok: false,
                        reason:
                            "out_of_stock",
                    };
                }

                const requestedQuantity =
                    Math.max(
                        1,
                        Number(
                            quantity
                        ) || 1
                    );

                const normalizedSize =
                    size || null;

                const key =
                    `${product.id}:${normalizedSize ||
                    "default"
                    }`;

                setCartItems(
                    (
                        previousItems
                    ) => {
                        const existing =
                            previousItems.find(
                                (
                                    item
                                ) =>
                                    item.key ===
                                    key
                            );

                        if (existing) {
                            const newQuantity =
                                Math.min(
                                    existing.quantity +
                                    requestedQuantity,
                                    stock
                                );

                            return previousItems.map(
                                (
                                    item
                                ) =>
                                    item.key ===
                                        key
                                        ? {
                                            ...item,
                                            quantity:
                                                newQuantity,
                                            stock,
                                        }
                                        : item
                            );
                        }

                        return [
                            ...previousItems,
                            {
                                key,

                                id:
                                    product.id,

                                name:
                                    product.name,

                                price:
                                    Number(
                                        product.price
                                    ),

                                imageUrl:
                                    product.image_url,

                                category:
                                    product.category_name ||
                                    "",

                                subcategory:
                                    product.subcategory ||
                                    "",

                                stock,

                                quantity:
                                    Math.min(
                                        requestedQuantity,
                                        stock
                                    ),

                                size:
                                    normalizedSize,
                            },
                        ];
                    }
                );

                return {
                    ok: true,
                };
            },
            []
        );

    /* =======================================================
       REMOVE
    ======================================================= */

    const removeFromCart =
        useCallback(
            (key) => {
                setCartItems(
                    (
                        previous
                    ) =>
                        previous.filter(
                            (
                                item
                            ) =>
                                item.key !==
                                key
                        )
                );
            },
            []
        );

    /* =======================================================
       UPDATE QUANTITY
    ======================================================= */

    const updateQuantity =
        useCallback(
            (
                key,
                quantity
            ) => {
                setCartItems(
                    (
                        previous
                    ) =>
                        previous.map(
                            (
                                item
                            ) => {
                                if (
                                    item.key !==
                                    key
                                ) {
                                    return item;
                                }

                                const newQuantity =
                                    Math.max(
                                        1,
                                        Math.min(
                                            Number(
                                                quantity
                                            ) || 1,
                                            item.stock
                                        )
                                    );

                                return {
                                    ...item,
                                    quantity:
                                        newQuantity,
                                };
                            }
                        )
                );
            },
            []
        );

    /* =======================================================
       CLEAR
    ======================================================= */

    const clearCart =
        useCallback(() => {
            setCartItems([]);
        }, []);

    /* =======================================================
       TOTAL DE UNIDADES
    ======================================================= */

    const itemCount =
        useMemo(
            () =>
                cartItems.reduce(
                    (
                        total,
                        item
                    ) =>
                        total +
                        item.quantity,
                    0
                ),
            [cartItems]
        );

    /* =======================================================
       SUBTOTAL
    ======================================================= */

    const subtotal =
        useMemo(
            () =>
                cartItems.reduce(
                    (
                        total,
                        item
                    ) =>
                        total +
                        Number(
                            item.price
                        ) *
                        item.quantity,
                    0
                ),
            [cartItems]
        );

    const value =
        useMemo(
            () => ({
                cartItems,
                itemCount,
                subtotal,

                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
            }),
            [
                cartItems,
                itemCount,
                subtotal,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
            ]
        );

    return (
        <CartContext.Provider
            value={value}
        >
            {children}
        </CartContext.Provider>
    );
}

/* =========================================================
   HOOK
========================================================= */

export function useCart() {
    const context =
        useContext(
            CartContext
        );

    if (!context) {
        throw new Error(
            "useCart debe utilizarse dentro de CartProvider."
        );
    }

    return context;
}