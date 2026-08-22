require("dotenv").config();
const fs = require("node:fs");
const path = require("node:path");
const pool = require("../src/config/db");

async function migrateCustomerEmail(previousEmail, nextEmail) {
    await pool.query(
        `WITH migrated_user AS (
            UPDATE users
               SET email = $1,
                   updated_at = CURRENT_TIMESTAMP
             WHERE LOWER(email) = LOWER($2)
               AND NOT EXISTS (
                   SELECT 1 FROM users WHERE LOWER(email) = LOWER($1)
               )
         RETURNING id
        )
        UPDATE orders
           SET customer_email = $1,
               updated_at = CURRENT_TIMESTAMP
         WHERE LOWER(customer_email) = LOWER($2)
           AND (
               EXISTS (SELECT 1 FROM migrated_user)
               OR (
                   EXISTS (SELECT 1 FROM users WHERE LOWER(email) = LOWER($1))
                   AND NOT EXISTS (SELECT 1 FROM users WHERE LOWER(email) = LOWER($2))
               )
           )`,
        [nextEmail, previousEmail]
    );
}

async function migrate() {
    try {
        const schema = fs.readFileSync(path.resolve(__dirname, "../database/schema.sql"), "utf8");
        const seed = fs.readFileSync(path.resolve(__dirname, "../database/seed.sql"), "utf8");
        await pool.query(schema);
        await pool.query(seed);
        await pool.query(
            `UPDATE products
                SET on_sale = TRUE,
                    subcategory = 'vestidos',
                    updated_at = CURRENT_TIMESTAMP
              WHERE subcategory = 'descuentos'`
        );
        await migrateCustomerEmail("luciaduque248@gmail.com", "sarisdu248@gmail.com");
        console.log("Esquema y catálogo inicial de PostgreSQL actualizados.");
    } finally {
        await pool.end();
    }
}

migrate().catch((error) => { console.error("Falló la migración:", error); process.exit(1); });
