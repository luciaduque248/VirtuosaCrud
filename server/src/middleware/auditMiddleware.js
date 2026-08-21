const pool = require("../config/db");

const auditAdminAction = (action, entityType) => (req, res, next) => {
    res.on("finish", async () => {
        if (!req.user || res.statusCode >= 400) return;
        try {
            await pool.query(
                `INSERT INTO audit_logs (user_id, action, entity_type, entity_id, metadata, ip_address)
                 VALUES ($1, $2, $3, $4, $5::jsonb, $6)`,
                [req.user.id, action, entityType, req.params.id || null, JSON.stringify({ method: req.method, path: req.originalUrl }), req.ip]
            );
        } catch (error) {
            console.error("No se pudo registrar la auditoría:", error.message);
        }
    });
    next();
};

module.exports = { auditAdminAction };
