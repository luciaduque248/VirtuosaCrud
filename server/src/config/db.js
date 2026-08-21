const { Pool } = require("pg");

const pool = new Pool(process.env.DATABASE_URL ? {
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : undefined,
} : {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 5432),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});

pool.on("connect", () => {
    console.log("✅ PostgreSQL connected");
});

pool.on("error", (error) => {
    console.error(
        "❌ Unexpected PostgreSQL error:",
        error
    );
});

module.exports = pool;
