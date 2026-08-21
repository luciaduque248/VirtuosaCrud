require("dotenv").config();

const bcrypt =
    require("bcryptjs");

const pool =
    require("../src/config/db");


const createAdmin =
    async () => {
        try {
            const name =
                process.env.ADMIN_NAME;

            const email =
                process.env.ADMIN_EMAIL;

            const password =
                process.env.ADMIN_PASSWORD;

            if (
                !name ||
                !email ||
                !password
            ) {
                throw new Error(
                    "ADMIN_NAME, ADMIN_EMAIL y ADMIN_PASSWORD deben estar configurados en .env."
                );
            }

            if (
                password.length <
                12
            ) {
                throw new Error(
                    "ADMIN_PASSWORD debe tener al menos 12 caracteres."
                );
            }

            const passwordHash =
                await bcrypt.hash(
                    password,
                    12
                );

            const result =
                await pool.query(
                    `
          INSERT INTO users (
            name,
            email,
            password_hash,
            role,
            active
          )

          VALUES (
            $1,
            LOWER($2),
            $3,
            'admin',
            TRUE
          )

          ON CONFLICT (email)

          DO UPDATE SET
            name = EXCLUDED.name,
            password_hash = EXCLUDED.password_hash,
            role = 'admin',
            active = TRUE

          RETURNING
            id,
            name,
            email,
            role,
            active;
          `,
                    [
                        name,
                        email.trim(),
                        passwordHash,
                    ]
                );

            console.log(
                "✅ Administrador creado/actualizado:"
            );

            console.log(
                result.rows[0]
            );
        } catch (error) {
            console.error(
                "❌ Error creando administrador:",
                error.message
            );

            process.exitCode =
                1;
        } finally {
            await pool.end();
        }
    };


createAdmin();