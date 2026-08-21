const express =
    require("express");

const {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
} = require(
    "../controllers/productController"
);

const router =
    express.Router();

/* =========================================================
   GET
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
   POST
========================================================= */

router.post(
    "/",
    createProduct
);

/* =========================================================
   PUT
========================================================= */

router.put(
    "/:id",
    updateProduct
);

/* =========================================================
   DELETE
========================================================= */

router.delete(
    "/:id",
    deleteProduct
);

module.exports = router;