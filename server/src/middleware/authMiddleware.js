const jwt =
    require("jsonwebtoken");

const User =
    require("../models/userModel");


/* =========================================================
   REQUIRE AUTH
========================================================= */

const requireAuth =
    async (
        req,
        res,
        next
    ) => {
        try {
            const authorization =
                req.headers
                    .authorization;

            if (
                !authorization ||
                !authorization.startsWith(
                    "Bearer "
                )
            ) {
                return res
                    .status(401)
                    .json({
                        success: false,
                        message:
                            "Autenticación requerida.",
                    });
            }

            const token =
                authorization.substring(
                    7
                );

            if (
                !process.env.JWT_SECRET
            ) {
                throw new Error(
                    "JWT_SECRET no está configurado."
                );
            }

            let payload;

            try {
                payload =
                    jwt.verify(
                        token,
                        process.env
                            .JWT_SECRET
                    );
            } catch (error) {
                return res
                    .status(401)
                    .json({
                        success: false,
                        message:
                            "La sesión no es válida o ha expirado.",
                    });
            }

            const user =
                await User.findById(
                    payload.sub
                );

            if (
                !user ||
                !user.active
            ) {
                return res
                    .status(401)
                    .json({
                        success: false,
                        message:
                            "La sesión no es válida.",
                    });
            }

            req.user = {
                id:
                    user.id,

                name:
                    user.name,

                email:
                    user.email,

                role:
                    user.role,
            };

            next();
        } catch (error) {
            next(error);
        }
    };


/* =========================================================
   REQUIRE ADMIN
========================================================= */

const requireAdmin = (
    req,
    res,
    next
) => {
    if (
        !req.user ||
        req.user.role !==
        "admin"
    ) {
        return res
            .status(403)
            .json({
                success: false,
                message:
                    "No tienes permisos para realizar esta operación.",
            });
    }

    next();
};


module.exports = {
    requireAuth,
    requireAdmin,
};