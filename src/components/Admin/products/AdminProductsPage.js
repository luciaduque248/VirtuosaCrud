import React, {
    useCallback,
    useEffect,
    useState,
} from "react";

import {
    Link,
} from "react-router-dom";

import NavbarAdmin from "../navbar/NavbarAdmin";

import AdminProductEditModal from "./AdminProductEditModal";

import apiClient from "../../../services/apiClient";

import {
    confirmDelete,
    errorAlert,
    productDeletedAlert,
} from "../../../utils/alerts";

import "./AdminProducts.css";

function AdminProductsPage({
    title,
    description,
    subcategory,
    categorySlug,
    createPath,
}) {
    const [
        products,
        setProducts,
    ] = useState([]);

    const [
        loading,
        setLoading,
    ] = useState(true);

    const [
        error,
        setError,
    ] = useState("");

    const [
        selectedProduct,
        setSelectedProduct,
    ] = useState(null);

    const [
        viewMode,
        setViewMode,
    ] = useState(() =>
        window.localStorage.getItem("adminProductsView") === "list"
            ? "list"
            : "grid"
    );

    const changeViewMode = (mode) => {
        setViewMode(mode);
        window.localStorage.setItem("adminProductsView", mode);
    };

    /* =========================================================
       CARGAR
    ========================================================= */

    const loadProducts =
        useCallback(
            async () => {
                try {
                    setLoading(true);
                    setError("");

                    const response =
                        await apiClient.get(
                            "/products",
                            {
                                params: {
                                    subcategory,
                                },
                            }
                        );

                    const data =
                        response?.data?.data;

                    if (
                        !Array.isArray(
                            data
                        )
                    ) {
                        throw new Error(
                            "Respuesta inválida."
                        );
                    }

                    setProducts(data);
                } catch (err) {
                    console.error(
                        "Error cargando productos:",
                        err
                    );

                    setError(
                        "No fue posible cargar los productos."
                    );
                } finally {
                    setLoading(false);
                }
            },
            [subcategory]
        );

    useEffect(() => {
        loadProducts();
    }, [loadProducts]);

    /* =========================================================
       PRECIO
    ========================================================= */

    const formatPrice = (
        value
    ) =>
        Number(value).toLocaleString(
            "es-CO",
            {
                style: "currency",
                currency: "COP",
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
            }
        );

    /* =========================================================
       DELETE
    ========================================================= */

    const handleDelete =
        async (
            product
        ) => {
            const confirmed =
                await confirmDelete(
                    product.name
                );

            if (!confirmed) {
                return;
            }

            try {
                await apiClient.delete(
                    `/products/${product.id}`
                );

                await productDeletedAlert(
                    product.name
                );

                await loadProducts();
            } catch (err) {
                console.error(
                    "Error eliminando producto:",
                    err
                );

                errorAlert(
                    "No se pudo eliminar",
                    err?.response?.data
                        ?.message ||
                    "Ocurrió un error al eliminar el producto."
                );
            }
        };

    return (
        <div className="admin-products-page">
            <NavbarAdmin />

            {/* HEADER */}

            <section className="admin-products-header">
                <div>
                    <span>
                        Administración
                    </span>

                    <h1>
                        {title}
                    </h1>

                    <p>
                        {description}
                    </p>
                </div>

                <Link
                    to={createPath}
                    className="admin-products-create"
                >
                    <i className="fa-solid fa-plus" />

                    Nuevo producto
                </Link>
            </section>

            {/* STATS */}

            {!loading &&
                !error && (
                    <section className="admin-products-stats">
                        <article>
                            <span>
                                Productos
                            </span>

                            <strong>
                                {
                                    products.length
                                }
                            </strong>
                        </article>

                        <article>
                            <span>
                                Con stock
                            </span>

                            <strong>
                                {
                                    products.filter(
                                        (
                                            product
                                        ) =>
                                            Number(
                                                product.stock
                                            ) > 0
                                    ).length
                                }
                            </strong>
                        </article>

                        <article>
                            <span>
                                Destacados
                            </span>

                            <strong>
                                {
                                    products.filter(
                                        (
                                            product
                                        ) =>
                                            product.featured
                                    ).length
                                }
                            </strong>
                        </article>
                    </section>
                )}

            {!loading && !error && products.length > 0 && (
                <section className="admin-products-toolbar">
                    <p>
                        Mostrando {products.length}{" "}
                        {products.length === 1 ? "producto" : "productos"}
                    </p>

                    <div
                        className="admin-products-view-switcher"
                        role="group"
                        aria-label="Cambiar vista de productos"
                    >
                        <button
                            type="button"
                            className={viewMode === "grid" ? "active" : ""}
                            aria-pressed={viewMode === "grid"}
                            onClick={() => changeViewMode("grid")}
                        >
                            <i className="fa-solid fa-grip" aria-hidden="true" />
                            Tarjetas
                        </button>

                        <button
                            type="button"
                            className={viewMode === "list" ? "active" : ""}
                            aria-pressed={viewMode === "list"}
                            onClick={() => changeViewMode("list")}
                        >
                            <i className="fa-solid fa-list" aria-hidden="true" />
                            Lista
                        </button>
                    </div>
                </section>
            )}

            {/* LOADING */}

            {loading && (
                <section className="admin-products-status">
                    <div className="admin-products-loader" />

                    <h2>
                        Cargando productos
                    </h2>

                    <p>
                        Consultando PostgreSQL...
                    </p>
                </section>
            )}

            {/* ERROR */}

            {!loading &&
                error && (
                    <section className="admin-products-status">
                        <div className="admin-products-status-icon error">
                            !
                        </div>

                        <h2>
                            No pudimos cargar
                            los productos
                        </h2>

                        <p>
                            {error}
                        </p>

                        <button
                            type="button"
                            onClick={
                                loadProducts
                            }
                        >
                            Intentar nuevamente
                        </button>
                    </section>
                )}

            {/* EMPTY */}

            {!loading &&
                !error &&
                products.length ===
                0 && (
                    <section className="admin-products-status">
                        <div className="admin-products-status-icon">
                            +
                        </div>

                        <h2>
                            No hay productos
                        </h2>

                        <p>
                            Crea el primer producto
                            de esta categoría.
                        </p>

                        <Link
                            to={
                                createPath
                            }
                            className="admin-products-empty"
                        >
                            Crear producto
                        </Link>
                    </section>
                )}

            {/* GRID */}

            {!loading &&
                !error &&
                products.length >
                0 && (
                    <main className={`admin-products-grid admin-products-${viewMode}`}>
                        {products.map(
                            (
                                product
                            ) => (
                                <article
                                    className="admin-product-card"
                                    key={
                                        product.id
                                    }
                                >
                                    <div className="admin-product-image">
                                        <img
                                            src={
                                                product.image_url
                                            }
                                            alt={
                                                product.name
                                            }
                                            onError={(
                                                event
                                            ) => {
                                                event.currentTarget.src =
                                                    "https://placehold.co/700x800/f2edf5/765f8e?text=Virtuosa";
                                            }}
                                        />

                                        {product.featured && (
                                            <span className="admin-product-featured">
                                                Destacado
                                            </span>
                                        )}
                                    </div>

                                    <div className="admin-product-content">
                                        <span className="admin-product-category">
                                            {
                                                product.subcategory
                                            }
                                        </span>

                                        <h2>
                                            {
                                                product.name
                                            }
                                        </h2>

                                        <p>
                                            {product.description ||
                                                "Sin descripción."}
                                        </p>

                                        <div className="admin-product-meta">
                                            <div>
                                                <span>
                                                    Precio
                                                </span>

                                                <strong>
                                                    {formatPrice(
                                                        product.price
                                                    )}
                                                </strong>
                                            </div>

                                            <div>
                                                <span>
                                                    Stock
                                                </span>

                                                <strong>
                                                    {
                                                        product.stock
                                                    }
                                                </strong>
                                            </div>
                                        </div>

                                        <div className="admin-product-actions">
                                            <button
                                                type="button"
                                                className="admin-product-edit"
                                                onClick={() =>
                                                    setSelectedProduct(
                                                        product
                                                    )
                                                }
                                            >
                                                <i className="fa-solid fa-pen" />

                                                Editar
                                            </button>

                                            <button
                                                type="button"
                                                className="admin-product-delete"
                                                onClick={() =>
                                                    handleDelete(
                                                        product
                                                    )
                                                }
                                            >
                                                <i className="fa-solid fa-trash" />

                                                Eliminar
                                            </button>
                                        </div>
                                    </div>
                                </article>
                            )
                        )}
                    </main>
                )}

            {selectedProduct && (
                <AdminProductEditModal
                    product={
                        selectedProduct
                    }
                    categorySlug={
                        categorySlug
                    }
                    subcategory={
                        subcategory
                    }
                    onClose={() =>
                        setSelectedProduct(
                            null
                        )
                    }
                    onUpdated={
                        loadProducts
                    }
                />
            )}
        </div>
    );
}

export default AdminProductsPage;
