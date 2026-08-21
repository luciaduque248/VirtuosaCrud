const Product =
    require("../models/productModel");

const Category =
    require("../models/categoryModel");


/* =========================================================
   HELPERS
========================================================= */

const parseBoolean = (
    value
) =>
    value === true ||
    value === "true";


const resolveCategory =
    async ({
        categorySlug,
        categoryId,
    }) => {
        if (
            categorySlug
        ) {
            return Category.findBySlug(
                categorySlug
            );
        }

        if (
            categoryId
        ) {
            return Category.findById(
                Number(
                    categoryId
                )
            );
        }

        return null;
    };


/* =========================================================
   GET PRODUCTS
========================================================= */

const getProducts =
    async (
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
                count:
                    products.length,
                data:
                    products,
            });
        } catch (error) {
            next(error);
        }
    };


/* =========================================================
   GET PRODUCT
========================================================= */

const getProductById =
    async (
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
                data:
                    product,
            });
        } catch (error) {
            next(error);
        }
    };


/* =========================================================
   CREATE
========================================================= */

const createProduct =
    async (
        req,
        res,
        next
    ) => {
        try {
            const {
                name,
                description,
                price,
                categorySlug,
                categoryId,
                subcategory,
                imageUrl,
                stock = 0,
                featured = false,
            } = req.body;

            if (
                !name ||
                price === undefined ||
                !imageUrl
            ) {
                return res
                    .status(400)
                    .json({
                        success: false,
                        message:
                            "Nombre, precio e imagen son obligatorios.",
                    });
            }

            const category =
                await resolveCategory({
                    categorySlug,
                    categoryId,
                });

            if (!category) {
                return res
                    .status(400)
                    .json({
                        success: false,
                        message:
                            "La categoría indicada no existe.",
                    });
            }

            const numericPrice =
                Number(price);

            const numericStock =
                Number(stock);

            if (
                Number.isNaN(
                    numericPrice
                ) ||
                numericPrice < 0
            ) {
                return res
                    .status(400)
                    .json({
                        success: false,
                        message:
                            "El precio no es válido.",
                    });
            }

            if (
                !Number.isInteger(
                    numericStock
                ) ||
                numericStock < 0
            ) {
                return res
                    .status(400)
                    .json({
                        success: false,
                        message:
                            "El stock no es válido.",
                    });
            }

            const product =
                await Product.create({
                    name:
                        String(name)
                            .trim(),

                    description:
                        description
                            ? String(
                                description
                            ).trim()
                            : "",

                    price:
                        numericPrice,

                    categoryId:
                        category.id,

                    subcategory:
                        subcategory
                            ? String(
                                subcategory
                            ).trim()
                            : null,

                    imageUrl:
                        String(
                            imageUrl
                        ).trim(),

                    stock:
                        numericStock,

                    featured:
                        parseBoolean(
                            featured
                        ),
                });

            res.status(201).json({
                success: true,

                message:
                    "Producto creado correctamente.",

                data:
                    product,
            });
        } catch (error) {
            next(error);
        }
    };


/* =========================================================
   UPDATE
========================================================= */

const updateProduct =
    async (
        req,
        res,
        next
    ) => {
        try {
            const existing =
                await Product.findById(
                    req.params.id
                );

            if (!existing) {
                return res
                    .status(404)
                    .json({
                        success: false,
                        message:
                            "Producto no encontrado.",
                    });
            }

            const {
                name,
                description,
                price,
                categorySlug,
                categoryId,
                subcategory,
                imageUrl,
                stock,
                featured,
                active,
            } = req.body;

            const category =
                await resolveCategory({
                    categorySlug,
                    categoryId:
                        categoryId ||
                        existing.category_id,
                });

            if (!category) {
                return res
                    .status(400)
                    .json({
                        success: false,
                        message:
                            "La categoría indicada no existe.",
                    });
            }

            const numericPrice =
                Number(price);

            const numericStock =
                Number(stock);

            if (
                !name ||
                !imageUrl ||
                Number.isNaN(
                    numericPrice
                ) ||
                numericPrice < 0
            ) {
                return res
                    .status(400)
                    .json({
                        success: false,
                        message:
                            "Los datos del producto no son válidos.",
                    });
            }

            if (
                !Number.isInteger(
                    numericStock
                ) ||
                numericStock < 0
            ) {
                return res
                    .status(400)
                    .json({
                        success: false,
                        message:
                            "El stock no es válido.",
                    });
            }

            const product =
                await Product.update(
                    req.params.id,
                    {
                        name:
                            String(name)
                                .trim(),

                        description:
                            description
                                ? String(
                                    description
                                ).trim()
                                : "",

                        price:
                            numericPrice,

                        categoryId:
                            category.id,

                        subcategory:
                            subcategory ||
                            existing.subcategory,

                        imageUrl:
                            String(
                                imageUrl
                            ).trim(),

                        stock:
                            numericStock,

                        featured:
                            parseBoolean(
                                featured
                            ),

                        active:
                            active === undefined
                                ? existing.active
                                : parseBoolean(
                                    active
                                ),
                    }
                );

            res.status(200).json({
                success: true,

                message:
                    "Producto actualizado correctamente.",

                data:
                    product,
            });
        } catch (error) {
            next(error);
        }
    };


/* =========================================================
   DELETE
========================================================= */

const deleteProduct =
    async (
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

                data:
                    product,
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