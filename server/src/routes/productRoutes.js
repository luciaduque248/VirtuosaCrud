const express =
    require("express");

const {
    getProducts,
    getProductById,
    getProductBuyers,
    createProduct,
    updateProduct,
    deleteProduct,
} =
    require("../controllers/productController");

const {
    requireAuth,
    requireAdmin,
} =
    require("../middleware/authMiddleware");

const router =
    express.Router();
const { auditAdminAction } = require("../middleware/auditMiddleware");


/* =========================================================
   PUBLIC
========================================================= */

router.get(
    "/",
    getProducts
);

router.get(
    "/:id",
    getProductById
);


/* =========================================================
   ADMIN ONLY
========================================================= */

router.get(
    "/:id/buyers",
    requireAuth,
    requireAdmin,
    getProductBuyers
);

router.post(
    "/",
    requireAuth,
    requireAdmin,
    auditAdminAction("product.create", "product"),
    createProduct
);

router.put(
    "/:id",
    requireAuth,
    requireAdmin,
    auditAdminAction("product.update", "product"),
    updateProduct
);

router.delete(
    "/:id",
    requireAuth,
    requireAdmin,
    auditAdminAction("product.delete", "product"),
    deleteProduct
);


module.exports =
    router;
