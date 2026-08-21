const Product =
    require("../models/productModel");

/* =========================================================
   GET PRODUCTS
========================================================= */

const getProducts = async (
    req,
    res,
    next
) => {
    try {
        const {
            category,
            subcategory,
            featured,
            search,
        } = req.query;

        const products =
            await Product.findAll({
                category,
                subcategory,
                featured,
                search,
            });

        res.status(200).json({
            success: true,
            count: products.length,
            data: products,
        });
    } catch (error) {
        next(error);
    }
};

/* =========================================================
   GET PRODUCT
========================================================= */

const getProductById = async (
    req,
    res,
    next
) => {
    try {
        const product =
            await Product.findById(
                req.params.id
            );

        if (!product) {
            return res
                .status(404)
                .json({
                    success: false,
                    message:
                        "Producto no encontrado.",
                });
        }

        res.status(200).json({
            success: true,
            data: product,
        });
    } catch (error) {
        next(error);
    }
};

/* =========================================================
   CREATE PRODUCT
========================================================= */

const createProduct = async (
    req,
    res,
    next
) => {
    try {
        const {
            name,
            description,
            price,
            categoryId,
            subcategory,
            imageUrl,
            stock,
            featured,
        } = req.body;

        if (
            !name ||
            price === undefined ||
            !categoryId ||
            !imageUrl
        ) {
            return res
                .status(400)
                .json({
                    success: false,
                    message:
                        "Nombre, precio, categoría e imagen son obligatorios.",
                });
        }

        const product =
            await Product.create({
                name,
                description,
                price,
                categoryId,
                subcategory,
                imageUrl,
                stock:
                    Number(stock) || 0,
                featured:
                    Boolean(featured),
            });

        res.status(201).json({
            success: true,
            message:
                "Producto creado correctamente.",
            data: product,
        });
    } catch (error) {
        next(error);
    }
};

/* =========================================================
   UPDATE PRODUCT
========================================================= */

const updateProduct = async (
    req,
    res,
    next
) => {
    try {
        const {
            name,
            description,
            price,
            categoryId,
            subcategory,
            imageUrl,
            stock,
            featured,
            active,
        } = req.body;

        const product =
            await Product.update(
                req.params.id,
                {
                    name,
                    description,
                    price,
                    categoryId,
                    subcategory,
                    imageUrl,
                    stock,
                    featured,
                    active:
                        active ?? true,
                }
            );

        if (!product) {
            return res
                .status(404)
                .json({
                    success: false,
                    message:
                        "Producto no encontrado.",
                });
        }

        res.status(200).json({
            success: true,
            message:
                "Producto actualizado correctamente.",
            data: product,
        });
    } catch (error) {
        next(error);
    }
};

/* =========================================================
   DELETE PRODUCT
========================================================= */

const deleteProduct = async (
    req,
    res,
    next
) => {
    try {
        const product =
            await Product.remove(
                req.params.id
            );

        if (!product) {
            return res
                .status(404)
                .json({
                    success: false,
                    message:
                        "Producto no encontrado.",
                });
        }

        res.status(200).json({
            success: true,
            message:
                "Producto eliminado correctamente.",
            data: product,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
};