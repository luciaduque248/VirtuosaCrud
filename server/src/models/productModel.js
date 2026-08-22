const pool = require("../config/db");

/* =========================================================
   FIND ALL
========================================================= */

const findAll = async ({
  category,
  subcategory,
  featured,
  onSale,
  search,
} = {}) => {
  const values = [];

  const conditions = [
    "p.active = TRUE",
  ];

  if (category) {
    values.push(category);

    conditions.push(
      `c.slug = $${values.length}`
    );
  }

  if (subcategory) {
    values.push(subcategory);

    conditions.push(
      `p.subcategory = $${values.length}`
    );
  }

  if (
    featured === "true" ||
    featured === true
  ) {
    conditions.push(
      "p.featured = TRUE"
    );
  }

  if (onSale === "true" || onSale === true) {
    conditions.push("p.on_sale = TRUE");
  }

  if (search) {
    values.push(`%${search}%`);

    conditions.push(`
      (
        p.name ILIKE $${values.length}
        OR
        p.description ILIKE $${values.length}
      )
    `);
  }

  const query = `
    SELECT
      p.id,
      p.name,
      p.description,
      p.price,
      p.subcategory,
      p.image_url,
      p.stock,
      p.featured,
      p.on_sale,
      p.active,
      p.created_at,
      p.updated_at,

      c.id AS category_id,
      c.name AS category_name,
      c.slug AS category_slug

    FROM products p

    INNER JOIN categories c
      ON c.id = p.category_id

    WHERE ${conditions.join(" AND ")}

    ORDER BY
      p.featured DESC,
      p.created_at DESC;
  `;

  const result =
    await pool.query(
      query,
      values
    );

  return result.rows;
};

/* =========================================================
   FIND BY ID
========================================================= */

const findById = async (id) => {
  const query = `
    SELECT
      p.id,
      p.name,
      p.description,
      p.price,
      p.subcategory,
      p.image_url,
      p.stock,
      p.featured,
      p.on_sale,
      p.active,
      p.created_at,
      p.updated_at,

      c.id AS category_id,
      c.name AS category_name,
      c.slug AS category_slug

    FROM products p

    INNER JOIN categories c
      ON c.id = p.category_id

    WHERE
      p.id = $1
      AND p.active = TRUE;
  `;

  const result =
    await pool.query(
      query,
      [id]
    );

  return result.rows[0];
};

/* =========================================================
   CREATE
========================================================= */

const create = async ({
  name,
  description,
  price,
  categoryId,
  subcategory,
  imageUrl,
  stock,
  featured = false,
  onSale = false,
}) => {
  const query = `
    INSERT INTO products (
      name,
      description,
      price,
      category_id,
      subcategory,
      image_url,
      stock,
      featured,
      on_sale
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
      $9
    )

    RETURNING *;
  `;

  const values = [
    name,
    description,
    price,
    categoryId,
    subcategory,
    imageUrl,
    stock,
    featured,
    onSale,
  ];

  const result =
    await pool.query(
      query,
      values
    );

  return result.rows[0];
};

/* =========================================================
   UPDATE
========================================================= */

const update = async (
  id,
  {
    name,
    description,
    price,
    categoryId,
    subcategory,
    imageUrl,
    stock,
    featured,
    onSale,
    active,
  }
) => {
  const query = `
    UPDATE products

    SET
      name = $1,
      description = $2,
      price = $3,
      category_id = $4,
      subcategory = $5,
      image_url = $6,
      stock = $7,
      featured = $8,
      on_sale = $9,
      active = $10

    WHERE id = $11

    RETURNING *;
  `;

  const values = [
    name,
    description,
    price,
    categoryId,
    subcategory,
    imageUrl,
    stock,
    featured,
    onSale,
    active,
    id,
  ];

  const result =
    await pool.query(
      query,
      values
    );

  return result.rows[0];
};

/* =========================================================
   SOFT DELETE
========================================================= */

const remove = async (id) => {
  const query = `
    UPDATE products

    SET active = FALSE

    WHERE
      id = $1
      AND active = TRUE

    RETURNING *;
  `;

  const result =
    await pool.query(
      query,
      [id]
    );

  return result.rows[0];
};

/* =========================================================
   PAID BUYERS (ADMIN)
========================================================= */

const findBuyersByProductId = async (id) => {
  const result = await pool.query(
    `SELECT
       o.reference,
       o.customer_name,
       o.customer_email,
       o.customer_phone,
       o.shipping_address,
       o.shipping_city,
       o.shipping_department,
       o.status,
       o.payment_status,
       o.created_at,
       oi.quantity,
       oi.size,
       oi.unit_price,
       oi.subtotal
     FROM public.order_items oi
     INNER JOIN public.orders o ON o.id = oi.order_id
     WHERE oi.product_id = $1
       AND o.payment_status = 'paid'
     ORDER BY o.created_at DESC, oi.id DESC`,
    [id]
  );

  return result.rows;
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
  findBuyersByProductId,
};
