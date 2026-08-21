require("dotenv").config();
const fs = require("node:fs");
const path = require("node:path");
const { spawnSync } = require("node:child_process");

if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL es obligatoria para crear el respaldo.");
    process.exit(1);
}

const backupDirectory = path.resolve(__dirname, "../backups");
fs.mkdirSync(backupDirectory, { recursive: true });
const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
const output = path.join(backupDirectory, `virtuosa-${timestamp}.dump`);
const result = spawnSync("pg_dump", ["--format=custom", "--no-owner", "--file", output, process.env.DATABASE_URL], { stdio: "inherit", shell: process.platform === "win32" });

if (result.status !== 0) process.exit(result.status || 1);
console.log(`Respaldo creado: ${output}`);
