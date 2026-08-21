const pool = require("../config/db");

/* =========================================================
   FIND ALL
========================================================= */

const findAll = async ({
  category,
  subcategory,
  featured,
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
      featured
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
      active = $9

    WHERE id = $10

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
   DELETE
========================================================= */

const remove = async (id) => {
  const query = `
    DELETE FROM products
    WHERE id = $1
    RETURNING *;
  `;

  const result =
    await pool.query(
      query,
      [id]
    );

  return result.rows[0];
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
};