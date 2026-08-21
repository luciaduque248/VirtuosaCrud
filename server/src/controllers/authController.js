const bcrypt =
    require("bcryptjs");

const jwt =
    require("jsonwebtoken");

const User =
    require("../models/userModel");
const { normalizeEmail, isValidEmail } = require("../utils/validation");


/* =========================================================
   LOGIN
========================================================= */

const login =
    async (
        req,
        res,
        next
    ) => {
        try {
            const {
                email,
                password,
            } = req.body;

            if (
                !email ||
                !password
            ) {
                return res
                    .status(400)
                    .json({
                        success: false,
                        message:
                            "Correo y contraseña son obligatorios.",
                    });
            }

            const normalizedEmail = normalizeEmail(email);

            if (!isValidEmail(normalizedEmail) || String(password).length > 128) {
                return res.status(400).json({ success: false, message: "Los datos de acceso no son válidos." });
            }

            const user =
                await User.findByEmail(
                    normalizedEmail
                );

            /*
              Respuesta deliberadamente
              genérica para no revelar si
              un correo existe.
            */

            if (
                !user ||
                !user.active
            ) {
                return res
                    .status(401)
                    .json({
                        success: false,
                        message:
                            "Correo o contraseña incorrectos.",
                    });
            }

            const validPassword =
                await bcrypt.compare(
                    password,
                    user.password_hash
                );

            if (
                !validPassword
            ) {
                return res
                    .status(401)
                    .json({
                        success: false,
                        message:
                            "Correo o contraseña incorrectos.",
                    });
            }

            if (
                !process.env.JWT_SECRET
            ) {
                throw new Error(
                    "JWT_SECRET no está configurado."
                );
            }

            const token =
                jwt.sign(
                    {
                        role:
                            user.role,
                    },
                    process.env.JWT_SECRET,
                    {
                        subject:
                            String(
                                user.id
                            ),

                        expiresIn:
                            process.env
                                .JWT_EXPIRES_IN ||
                            "8h",
                    }
                );

            res.status(200).json({
                success: true,

                message:
                    "Inicio de sesión correcto.",

                token,

                user: {
                    id:
                        user.id,

                    name:
                        user.name,

                    email:
                        user.email,

                    role:
                        user.role,
                },
            });
        } catch (error) {
            next(error);
        }
    };


/* =========================================================
   CURRENT USER
========================================================= */

const me = async (
    req,
    res
) => {
    res.status(200).json({
        success: true,

        user: {
            id:
                req.user.id,

            name:
                req.user.name,

            email:
                req.user.email,

            role:
                req.user.role,
        },
    });
};


module.exports = {
    login,
    me,
};
