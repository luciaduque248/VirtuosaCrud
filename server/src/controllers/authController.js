const bcrypt =
    require("bcryptjs");

const jwt =
    require("jsonwebtoken");
const crypto = require("node:crypto");

const User =
    require("../models/userModel");
const { normalizeEmail, isValidEmail } = require("../utils/validation");
const { sendPasswordReset } = require("../services/emailService");


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


const requestPasswordReset = async (req, res, next) => {
    try {
        const email = normalizeEmail(req.body?.email);
        if (!isValidEmail(email)) return res.status(400).json({ success: false, message: "Ingresa un correo válido." });
        const user = await User.findByEmail(email);
        if (user?.active) {
            const token = crypto.randomBytes(32).toString("hex");
            const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
            await User.saveResetToken(user.id, tokenHash, new Date(Date.now() + 30 * 60 * 1000));
            const clientUrl = process.env.CLIENT_URL || "http://localhost:3000/VirtuosaCrud";
            await sendPasswordReset(user, `${clientUrl.replace(/\/$/, "")}/recuperar-clave?token=${token}`);
        }
        return res.status(200).json({ success: true, message: "Si el correo está registrado, recibirás un enlace en los próximos minutos." });
    } catch (error) { return next(error); }
};

const resetPassword = async (req, res, next) => {
    try {
        const token = String(req.body?.token || "");
        const password = String(req.body?.password || "");
        if (!/^[a-f0-9]{64}$/i.test(token) || password.length < 10 || password.length > 128) return res.status(400).json({ success: false, message: "El enlace o la contraseña no son válidos." });
        const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
        const updated = await User.resetPassword(tokenHash, await bcrypt.hash(password, 12));
        if (!updated) return res.status(400).json({ success: false, message: "El enlace venció o ya fue utilizado." });
        return res.status(200).json({ success: true, message: "Contraseña actualizada correctamente." });
    } catch (error) { return next(error); }
};

module.exports = {
    login,
    me,
    requestPasswordReset,
    resetPassword,
};
