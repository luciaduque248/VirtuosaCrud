const pool =
    require("../config/db");

const findBySlug =
    async (slug) => {
        const result =
            await pool.query(
                `
        SELECT
          id,
          name,
          slug
        FROM categories
        WHERE slug = $1
        LIMIT 1;
        `,
                [slug]
            );

        return result.rows[0];
    };


const findById =
    async (id) => {
        const result =
            await pool.query(
                `
        SELECT
          id,
          name,
          slug
        FROM categories
        WHERE id = $1
        LIMIT 1;
        `,
                [id]
            );

        return result.rows[0];
    };


module.exports = {
    findBySlug,
    findById,
};