const pool = require("../config/db");

/* =========================================================
   PRODUCTS FOR CHECKOUT
========================================================= */

const lockProducts = async (
    client,
    productIds
) => {
    const result =
        await client.query(
            `
            SELECT
                id,
                name,
                price,
                image_url,
                stock,
                active,
                subcategory
            FROM products
            WHERE id = ANY($1::int[])
            ORDER BY id
            FOR UPDATE;
            `,
            [productIds]
        );

    return result.rows;
};

/* =========================================================
   CREATE ORDER
========================================================= */

const create = async (
    client,
    {
        reference,
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
) => {
    const result =
        await client.query(
            `
            INSERT INTO orders (
                reference,
                customer_name,
                customer_email,
                customer_phone,
                shipping_address,
                shipping_city,
                shipping_department,
                notes,
                subtotal,
                shipping_cost,
                total,
                payment_method
            )
            VALUES (
                $1,
                $2,
                $3,
                $4,
                $5,
                $6,
                $7,
                $8,
                $9,
                $10,
                $11,
                $12
            )
            RETURNING *;
            `,
            [
                reference,
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
            ]
        );

    return result.rows[0];
};

/* =========================================================
   CREATE ORDER ITEM
========================================================= */

const createItem = async (
    client,
    {
        orderId,
        productId,
        productName,
        productImageUrl,
        size,
        unitPrice,
        quantity,
        subtotal,
    }
) => {
    const result =
        await client.query(
            `
            INSERT INTO order_items (
                order_id,
                product_id,
                product_name,
                product_image_url,
                size,
                unit_price,
                quantity,
                subtotal
            )
            VALUES (
                $1,
                $2,
                $3,
                $4,
                $5,
                $6,
                $7,
                $8
            )
            RETURNING *;
            `,
            [
                orderId,
                productId,
                productName,
                productImageUrl,
                size,
                unitPrice,
                quantity,
                subtotal,
            ]
        );

    return result.rows[0];
};

/* =========================================================
   STOCK
========================================================= */

const decrementStock = async (
    client,
    productId,
    quantity
) => {
    const result =
        await client.query(
            `
            UPDATE products
            SET stock = stock - $1
            WHERE
                id = $2
                AND active = TRUE
                AND stock >= $1
            RETURNING id, stock;
            `,
            [
                quantity,
                productId,
            ]
        );

    return result.rows[0];
};

const restoreStock = async (
    client,
    productId,
    quantity
) => {
    if (!productId) {
        return null;
    }

    const result =
        await client.query(
            `
            UPDATE products
            SET stock = stock + $1
            WHERE id = $2
            RETURNING id, stock;
            `,
            [
                quantity,
                productId,
            ]
        );

    return result.rows[0];
};

/* =========================================================
   ADMIN LIST
========================================================= */

const findAll = async ({
    status,
    search,
} = {}) => {
    const values = [];
    const conditions = [];

    if (status) {
        values.push(status);
        conditions.push(
            `o.status = $${values.length}`
        );
    }

    if (search) {
        values.push(
            `%${search}%`
        );

        conditions.push(`
            (
                o.reference ILIKE $${values.length}
                OR o.customer_name ILIKE $${values.length}
                OR o.customer_email ILIKE $${values.length}
                OR o.customer_phone ILIKE $${values.length}
            )
        `);
    }

    const where =
        conditions.length > 0
            ? `WHERE ${conditions.join(" AND ")}`
            : "";

    const result =
        await pool.query(
            `
            SELECT
                o.*,
                COALESCE(
                    SUM(oi.quantity),
                    0
                )::int AS item_count
            FROM orders o
            LEFT JOIN order_items oi
                ON oi.order_id = o.id
            ${where}
            GROUP BY o.id
            ORDER BY o.created_at DESC;
            `,
            values
        );

    return result.rows;
};

/* =========================================================
   ADMIN DETAIL
========================================================= */

const findById = async (
    id
) => {
    const orderResult =
        await pool.query(
            `
            SELECT *
            FROM orders
            WHERE id = $1;
            `,
            [id]
        );

    const order =
        orderResult.rows[0];

    if (!order) {
        return null;
    }

    const itemsResult =
        await pool.query(
            `
            SELECT *
            FROM order_items
            WHERE order_id = $1
            ORDER BY id;
            `,
            [id]
        );

    return {
        ...order,
        items:
            itemsResult.rows,
    };
};

const findByReferenceAndEmail = async (
    reference,
    email
) => {
    const orderResult = await pool.query(
        `
        SELECT
            id, reference, customer_name, customer_email,
            shipping_city, shipping_department,
            subtotal, shipping_cost, total,
            status, payment_status, payment_method,
            created_at, updated_at
        FROM orders
        WHERE UPPER(reference) = UPPER($1)
          AND LOWER(customer_email) = LOWER($2);
        `,
        [reference, email]
    );
    const order = orderResult.rows[0];
    if (!order) return null;
    const itemsResult = await pool.query(
        `SELECT id, product_id, product_name, product_image_url, size, unit_price, quantity, subtotal FROM order_items WHERE order_id = $1 ORDER BY id;`,
        [order.id]
    );
    return { ...order, items: itemsResult.rows };
};

const findByIdForUpdate = async (
    client,
    id
) => {
    const result =
        await client.query(
            `
            SELECT *
            FROM orders
            WHERE id = $1
            FOR UPDATE;
            `,
            [id]
        );

    return result.rows[0];
};

const findItemsByOrderId = async (
    client,
    orderId
) => {
    const result =
        await client.query(
            `
            SELECT *
            FROM order_items
            WHERE order_id = $1
            ORDER BY id;
            `,
            [orderId]
        );

    return result.rows;
};

const updateStatus = async (
    client,
    id,
    status
) => {
    const result =
        await client.query(
            `
            UPDATE orders
            SET status = $1
            WHERE id = $2
            RETURNING *;
            `,
            [
                status,
                id,
            ]
        );

    return result.rows[0];
};

module.exports = {
    lockProducts,
    create,
    createItem,
    decrementStock,
    restoreStock,
    findAll,
    findById,
    findByReferenceAndEmail,
    findByIdForUpdate,
    findItemsByOrderId,
    updateStatus,
};
