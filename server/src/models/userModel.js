const pool =
    require("../config/db");

/* =========================================================
   FIND BY EMAIL
========================================================= */

const findByEmail =
    async (email) => {
        const result =
            await pool.query(
                `
        SELECT
          id,
          name,
          email,
          password_hash,
          role,
          active,
          created_at,
          updated_at
        FROM users
        WHERE LOWER(email) = LOWER($1)
        LIMIT 1;
        `,
                [email]
            );

        return result.rows[0];
    };


/* =========================================================
   FIND BY ID
========================================================= */

const findById =
    async (id) => {
        const result =
            await pool.query(
                `
        SELECT
          id,
          name,
          email,
          password_hash,
          role,
          active,
          created_at,
          updated_at
        FROM users
        WHERE id = $1
        LIMIT 1;
        `,
                [id]
            );

        return result.rows[0];
    };


module.exports = {
    findByEmail,
    findById,
};