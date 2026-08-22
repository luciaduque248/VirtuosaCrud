const express = require("express");
const rateLimit = require("express-rate-limit");
const { createCheckoutSession, mercadoPagoWebhook, confirmPaymentReturn } = require("../controllers/paymentController");
const router = express.Router();
router.post("/checkout", rateLimit({ windowMs: 15 * 60 * 1000, max: 10, standardHeaders: true, legacyHeaders: false }), createCheckoutSession);
router.post("/confirm", rateLimit({ windowMs: 15 * 60 * 1000, max: 30, standardHeaders: true, legacyHeaders: false }), confirmPaymentReturn);
router.post("/webhook", mercadoPagoWebhook);
module.exports = router;
