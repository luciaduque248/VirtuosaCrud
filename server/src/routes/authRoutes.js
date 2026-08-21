const express =
    require("express");

const rateLimit =
    require("express-rate-limit");

const {
    login,
    me,
    requestPasswordReset,
    resetPassword,
} =
    require("../controllers/authController");

const {
    requireAuth,
} =
    require("../middleware/authMiddleware");

const router =
    express.Router();


/* =========================================================
   LOGIN RATE LIMIT
========================================================= */

const loginLimiter =
    rateLimit({
        windowMs:
            15 * 60 * 1000,

        max: 10,

        standardHeaders:
            true,

        legacyHeaders:
            false,

        message: {
            success: false,

            message:
                "Demasiados intentos de inicio de sesión. Intenta nuevamente más tarde.",
        },
    });


router.post(
    "/login",
    loginLimiter,
    login
);


router.get(
    "/me",
    requireAuth,
    me
);

router.post("/forgot-password", loginLimiter, requestPasswordReset);
router.post("/reset-password", loginLimiter, resetPassword);


module.exports =
    router;
