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

const saveResetToken = async (userId, tokenHash, expiresAt) => {
    await pool.query("DELETE FROM password_reset_tokens WHERE user_id = $1", [userId]);
    await pool.query("INSERT INTO password_reset_tokens (user_id, token_hash, expires_at) VALUES ($1, $2, $3)", [userId, tokenHash, expiresAt]);
};

const resetPassword = async (tokenHash, passwordHash) => {
    const result = await pool.query(`WITH valid_token AS (DELETE FROM password_reset_tokens WHERE token_hash = $1 AND expires_at > NOW() RETURNING user_id) UPDATE users SET password_hash = $2 WHERE id = (SELECT user_id FROM valid_token) RETURNING id`, [tokenHash, passwordHash]);
    return result.rows[0] || null;
};


module.exports = {
    findByEmail,
    findById,
    saveResetToken,
    resetPassword,
};
