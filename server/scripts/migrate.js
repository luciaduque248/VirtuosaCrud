require("dotenv").config();
const fs = require("node:fs");
const path = require("node:path");
const pool = require("../src/config/db");

async function migrate() {
    try {
        const schema = fs.readFileSync(path.resolve(__dirname, "../database/schema.sql"), "utf8");
        const seed = fs.readFileSync(path.resolve(__dirname, "../database/seed.sql"), "utf8");
        await pool.query(schema);
        await pool.query(seed);
        console.log("Esquema y catálogo inicial de PostgreSQL actualizados.");
    } finally {
        await pool.end();
    }
}

migrate().catch((error) => { console.error("Falló la migración:", error); process.exit(1); });
