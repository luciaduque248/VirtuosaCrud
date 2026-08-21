const express =
    require("express");

const {
    getProducts,
    getProductById,
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

router.post(
    "/",
    requireAuth,
    requireAdmin,
    createProduct
);

router.put(
    "/:id",
    requireAuth,
    requireAdmin,
    updateProduct
);

router.delete(
    "/:id",
    requireAuth,
    requireAdmin,
    deleteProduct
);


module.exports =
    router;