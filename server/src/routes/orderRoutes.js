const express = require("express");
const rateLimit = require("express-rate-limit");

const {
    createOrder,
    trackOrder,
    getOrders,
    getOrderById,
    updateOrderStatus,
} = require("../controllers/orderController");

const {
    requireAuth,
    requireAdmin,
} = require("../middleware/authMiddleware");

const router = express.Router();

/* =========================================================
   PUBLIC CHECKOUT RATE LIMIT
========================================================= */

const checkoutLimiter =
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
                "Se han realizado demasiados intentos de compra. Intenta nuevamente más tarde.",
        },
    });

const trackingLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 30,
    standardHeaders: true,
    legacyHeaders: false,
    message: { success: false, message: "Demasiados intentos. Espera unos minutos." },
});

/* =========================================================
   PUBLIC
========================================================= */

router.post(
    "/",
    checkoutLimiter,
    createOrder
);

router.get(
    "/track",
    trackingLimiter,
    trackOrder
);

/* =========================================================
   ADMIN ONLY
========================================================= */

router.get(
    "/",
    requireAuth,
    requireAdmin,
    getOrders
);

router.get(
    "/:id",
    requireAuth,
    requireAdmin,
    getOrderById
);

router.patch(
    "/:id/status",
    requireAuth,
    requireAdmin,
    updateOrderStatus
);

module.exports = router;
