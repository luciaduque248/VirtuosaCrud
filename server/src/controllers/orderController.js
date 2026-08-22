const crypto = require("crypto");

const pool = require("../config/db");
const Order = require("../models/orderModel");
const { sendOrderConfirmation, sendOrderStatus } = require("../services/emailService");

const VALID_STATUSES = new Set([
    "pending",
    "confirmed",
    "preparing",
    "shipped",
    "delivered",
    "cancelled",
]);

const VALID_PAYMENT_METHODS = new Set([
    "cash_on_delivery",
    "bank_transfer",
    "mercado_pago",
]);

const VALID_SIZES = new Set([
    "XS",
    "S",
    "M",
    "L",
    "XL",
]);

const STATUS_TRANSITIONS = {
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

const httpError = (
    statusCode,
    message
) => {
    const error =
        new Error(
            message
        );

    error.statusCode =
        statusCode;

    return error;
};

const roundMoney = (
    value
) =>
    Math.round(
        Number(value) * 100
    ) / 100;

const cleanText = (
    value,
    {
        required = false,
        maxLength = 255,
        label = "Campo",
    } = {}
) => {
    const normalized =
        value === undefined ||
        value === null
            ? ""
            : String(value).trim();

    if (
        required &&
        !normalized
    ) {
        throw httpError(
            400,
            `${label} es obligatorio.`
        );
    }

    if (
        normalized.length >
        maxLength
    ) {
        throw httpError(
            400,
            `${label} supera la longitud permitida.`
        );
    }

    return normalized;
};

const normalizeItems = (
    items
) => {
    if (
        !Array.isArray(items) ||
        items.length === 0
    ) {
        throw httpError(
            400,
            "El pedido debe contener al menos un producto."
        );
    }

    if (
        items.length > 30
    ) {
        throw httpError(
            400,
            "El pedido contiene demasiadas líneas de productos."
        );
    }

    const aggregated =
        new Map();

    for (
        const rawItem of items
    ) {
        const productId =
            Number(
                rawItem?.productId
            );

        const quantity =
            Number(
                rawItem?.quantity
            );

        if (
            !Number.isInteger(
                productId
            ) ||
            productId <= 0
        ) {
            throw httpError(
                400,
                "Uno de los productos del pedido no es válido."
            );
        }

        if (
            !Number.isInteger(
                quantity
            ) ||
            quantity <= 0 ||
            quantity > 20
        ) {
            throw httpError(
                400,
                "La cantidad solicitada no es válida."
            );
        }

        const size =
            rawItem?.size
                ? String(
                    rawItem.size
                )
                    .trim()
                    .toUpperCase()
                : null;

        if (
            size &&
            !VALID_SIZES.has(
                size
            )
        ) {
            throw httpError(
                400,
                "La talla seleccionada no es válida."
            );
        }

        const key =
            `${productId}:${size || "default"}`;

        const current =
            aggregated.get(
                key
            );

        if (current) {
            const nextQuantity =
                current.quantity +
                quantity;

            if (
                nextQuantity > 20
            ) {
                throw httpError(
                    400,
                    "La cantidad acumulada de un producto supera el máximo permitido."
                );
            }

            current.quantity =
                nextQuantity;
        } else {
            aggregated.set(
                key,
                {
                    productId,
                    quantity,
                    size,
                }
            );
        }
    }

    return Array.from(
        aggregated.values()
    ).sort(
        (
            a,
            b
        ) =>
            a.productId -
            b.productId
    );
};

const buildReference = () => {
    const date =
        new Date()
            .toISOString()
            .slice(0, 10)
            .replaceAll(
                "-",
                ""
            );

    const random =
        crypto
            .randomBytes(3)
            .toString("hex")
            .toUpperCase();

    return `VIR-${date}-${random}`;
};

const respondKnownError = (
    error,
    res
) => {
    if (
        !error?.statusCode
    ) {
        return false;
    }

    res.status(
        error.statusCode
    ).json({
        success: false,
        message:
            error.message,
    });

    return true;
};

const rollbackSafely =
    async (
        client,
        context
    ) => {
        if (!client) {
            return;
        }

        try {
            await client.query(
                "ROLLBACK"
            );
        } catch (
            rollbackError
        ) {
            console.error(
                `Error haciendo rollback ${context}:`,
                rollbackError
            );
        }
    };

/* =========================================================
   CREATE ORDER - PUBLIC CHECKOUT
========================================================= */

const createOrder =
    async (
        req,
        res,
        next
    ) => {
        let client = null;

        try {
            const customerName =
                cleanText(
                    req.body?.customerName,
                    {
                        required: true,
                        maxLength: 150,
                        label: "El nombre",
                    }
                );

            const customerEmail =
                cleanText(
                    req.body?.customerEmail,
                    {
                        required: true,
                        maxLength: 180,
                        label: "El correo",
                    }
                ).toLowerCase();

            const customerPhone =
                cleanText(
                    req.body?.customerPhone,
                    {
                        required: true,
                        maxLength: 40,
                        label: "El teléfono",
                    }
                );

            const shippingAddress =
                cleanText(
                    req.body?.shippingAddress,
                    {
                        required: true,
                        maxLength: 500,
                        label: "La dirección",
                    }
                );

            const shippingCity =
                cleanText(
                    req.body?.shippingCity,
                    {
                        required: true,
                        maxLength: 120,
                        label: "La ciudad",
                    }
                );

            const shippingDepartment =
                cleanText(
                    req.body?.shippingDepartment,
                    {
                        maxLength: 120,
                        label: "El departamento",
                    }
                ) || null;

            const notes =
                cleanText(
                    req.body?.notes,
                    {
                        maxLength: 1000,
                        label: "Las notas",
                    }
                ) || null;

            if (
                !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                    customerEmail
                )
            ) {
                throw httpError(
                    400,
                    "El correo electrónico no es válido."
                );
            }

            const paymentMethod =
                req.body?.paymentMethod
                    ? String(
                        req.body.paymentMethod
                    ).trim()
                    : "cash_on_delivery";

            if (
                !VALID_PAYMENT_METHODS.has(
                    paymentMethod
                )
            ) {
                throw httpError(
                    400,
                    "El método de pago seleccionado no es válido."
                );
            }

            const normalizedItems =
                normalizeItems(
                    req.body?.items
                );

            client =
                await pool.connect();

            await client.query(
                "BEGIN"
            );

            const productIds =
                [
                    ...new Set(
                        normalizedItems.map(
                            (
                                item
                            ) =>
                                item.productId
                        )
                    ),
                ];

            const products =
                await Order.lockProducts(
                    client,
                    productIds
                );

            if (
                products.length !==
                productIds.length
            ) {
                throw httpError(
                    409,
                    "Uno de los productos ya no está disponible. Actualiza el carrito e inténtalo nuevamente."
                );
            }

            const productsById =
                new Map(
                    products.map(
                        (
                            product
                        ) => [
                            Number(
                                product.id
                            ),
                            product,
                        ]
                    )
                );

            const orderItems =
                normalizedItems.map(
                    (
                        item
                    ) => {
                        const product =
                            productsById.get(
                                item.productId
                            );

                        if (
                            !product ||
                            !product.active
                        ) {
                            throw httpError(
                                409,
                                "Uno de los productos ya no está disponible."
                            );
                        }

                        if (
                            Number(
                                product.stock
                            ) <
                            item.quantity
                        ) {
                            throw httpError(
                                409,
                                `No hay suficiente stock de ${product.name}. Disponible: ${product.stock}.`
                            );
                        }

                        const unitPrice =
                            roundMoney(
                                product.price
                            );

                        const lineSubtotal =
                            roundMoney(
                                unitPrice *
                                item.quantity
                            );

                        return {
                            ...item,
                            product,
                            unitPrice,
                            subtotal:
                                lineSubtotal,
                        };
                    }
                );

            const subtotal =
                roundMoney(
                    orderItems.reduce(
                        (
                            total,
                            item
                        ) =>
                            total +
                            item.subtotal,
                        0
                    )
                );

            const shippingCost =
                0;

            const total =
                roundMoney(
                    subtotal +
                    shippingCost
                );

            const order =
                await Order.create(
                    client,
                    {
                        reference:
                            buildReference(),
                        customerName,
                        customerEmail,
                        customerPhone,
                        shippingAddress,
                        shippingCity,
                        shippingDepartment,
                        notes,
                        subtotal,
                        shippingCost,
                        total,
                        paymentMethod,
                    }
                );

            const createdItems =
                [];

            for (
                const item of orderItems
            ) {
                const stockResult =
                    await Order.decrementStock(
                        client,
                        item.productId,
                        item.quantity
                    );

                if (!stockResult) {
                    throw httpError(
                        409,
                        `El stock de ${item.product.name} cambió durante la compra. Inténtalo nuevamente.`
                    );
                }

                const createdItem =
                    await Order.createItem(
                        client,
                        {
                            orderId:
                                order.id,
                            productId:
                                item.product.id,
                            productName:
                                item.product.name,
                            productImageUrl:
                                item.product.image_url,
                            size:
                                item.size,
                            unitPrice:
                                item.unitPrice,
                            quantity:
                                item.quantity,
                            subtotal:
                                item.subtotal,
                        }
                    );

                createdItems.push(
                    createdItem
                );
            }

            await client.query(
                "COMMIT"
            );

            res.status(201).json({
                success: true,
                message:
                    "Pedido creado correctamente.",
                data: {
                    ...order,
                    items:
                        createdItems,
                },
            });
            sendOrderConfirmation(order).catch((emailError) => console.error("Correo de pedido no enviado:", emailError.message));
        } catch (error) {
            await rollbackSafely(
                client,
                "del pedido"
            );

            if (
                respondKnownError(
                    error,
                    res
                )
            ) {
                return;
            }

            next(error);
        } finally {
            if (client) {
                client.release();
            }
        }
    };

/* =========================================================
   ADMIN - LIST ORDERS
========================================================= */

const getOrders =
    async (
        req,
        res,
        next
    ) => {
        try {
            const status =
                req.query?.status
                    ? String(
                        req.query.status
                    ).trim()
                    : "";

            const search =
                req.query?.search
                    ? String(
                        req.query.search
                    ).trim()
                    : "";

            if (
                status &&
                !VALID_STATUSES.has(
                    status
                )
            ) {
                return res
                    .status(400)
                    .json({
                        success: false,
                        message:
                            "El estado solicitado no es válido.",
                    });
            }

            const orders =
                await Order.findAll({
                    status:
                        status ||
                        undefined,
                    search:
                        search ||
                        undefined,
                });

            res.status(200).json({
                success: true,
                count:
                    orders.length,
                data:
                    orders,
            });
        } catch (error) {
            next(error);
        }
    };

/* =========================================================
   ADMIN - ORDER DETAIL
========================================================= */

const getOrderById =
    async (
        req,
        res,
        next
    ) => {
        try {
            const id =
                Number(
                    req.params.id
                );

            if (
                !Number.isInteger(id) ||
                id <= 0
            ) {
                return res
                    .status(400)
                    .json({
                        success: false,
                        message:
                            "Identificador de pedido inválido.",
                    });
            }

            const order =
                await Order.findById(
                    id
                );

            if (!order) {
                return res
                    .status(404)
                    .json({
                        success: false,
                        message:
                            "Pedido no encontrado.",
                    });
            }

            res.status(200).json({
                success: true,
                data:
                    order,
            });
        } catch (error) {
            next(error);
        }
    };

const trackOrder = async (req, res, next) => {
    try {
        const reference = String(req.query.reference || "").trim();
        const email = String(req.query.email || "").trim();
        if (!reference || !email || !email.includes("@")) {
            return res.status(400).json({ success: false, message: "Referencia y correo son obligatorios." });
        }
        const order = await Order.findByReferenceAndEmail(reference, email);
        if (!order) {
            return res.status(404).json({ success: false, message: "No encontramos un pedido con esos datos." });
        }
        return res.status(200).json({ success: true, data: order });
    } catch (error) {
        return next(error);
    }
};

const getMyOrders = async (req, res, next) => {
    try {
        const orders = await Order.findByCustomerEmail(req.user.email);
        return res.status(200).json({
            success: true,
            count: orders.length,
            data: orders,
        });
    } catch (error) {
        return next(error);
    }
};

/* =========================================================
   ADMIN - UPDATE STATUS
========================================================= */

const updateOrderStatus =
    async (
        req,
        res,
        next
    ) => {
        let client = null;

        try {
            const id =
                Number(
                    req.params.id
                );

            const nextStatus =
                req.body?.status
                    ? String(
                        req.body.status
                    ).trim()
                    : "";

            if (
                !Number.isInteger(id) ||
                id <= 0
            ) {
                throw httpError(
                    400,
                    "Identificador de pedido inválido."
                );
            }

            if (
                !VALID_STATUSES.has(
                    nextStatus
                )
            ) {
                throw httpError(
                    400,
                    "El estado indicado no es válido."
                );
            }

            client =
                await pool.connect();

            await client.query(
                "BEGIN"
            );

            const currentOrder =
                await Order.findByIdForUpdate(
                    client,
                    id
                );

            if (!currentOrder) {
                throw httpError(
                    404,
                    "Pedido no encontrado."
                );
            }

            if (
                currentOrder.status ===
                nextStatus
            ) {
                await client.query(
                    "COMMIT"
                );

                return res
                    .status(200)
                    .json({
                        success: true,
                        data:
                            currentOrder,
                    });
            }

            const allowed =
                STATUS_TRANSITIONS[
                    currentOrder.status
                ] || [];

            if (
                !allowed.includes(
                    nextStatus
                )
            ) {
                throw httpError(
                    409,
                    `No se puede cambiar un pedido de ${currentOrder.status} a ${nextStatus}.`
                );
            }

            if (
                nextStatus ===
                "cancelled"
            ) {
                const items =
                    await Order.findItemsByOrderId(
                        client,
                        id
                    );

                for (
                    const item of items
                ) {
                    await Order.restoreStock(
                        client,
                        item.product_id,
                        item.quantity
                    );
                }
            }

            const updated =
                await Order.updateStatus(
                    client,
                    id,
                    nextStatus
                );

            await client.query(
                "COMMIT"
            );

            res.status(200).json({
                success: true,
                message:
                    "Estado del pedido actualizado.",
                data:
                    updated,
            });
            sendOrderStatus(updated).catch((emailError) => console.error("Correo de estado no enviado:", emailError.message));
        } catch (error) {
            await rollbackSafely(
                client,
                "del estado del pedido"
            );

            if (
                respondKnownError(
                    error,
                    res
                )
            ) {
                return;
            }

            next(error);
        } finally {
            if (client) {
                client.release();
            }
        }
    };

module.exports = {
    createOrder,
    trackOrder,
    getMyOrders,
    getOrders,
    getOrderById,
    updateOrderStatus,
};
