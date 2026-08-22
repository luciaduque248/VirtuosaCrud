import React, {
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react";

import {
    Link,
} from "react-router-dom";
import {
    Download,
    Eye,
    Grid2X2,
    List,
    Pencil,
    Plus,
    Search,
    Trash2,
} from "lucide-react";

import NavbarAdmin from "../navbar/NavbarAdmin";

import AdminProductEditModal from "./AdminProductEditModal";
import AdminProductBuyersModal from "./AdminProductBuyersModal";

import apiClient from "../../../services/apiClient";

import {
    confirmDelete,
    errorAlert,
    productDeletedAlert,
} from "../../../utils/alerts";
import { exportCsv } from "../../../utils/exportCsv";

import "./AdminProducts.css";

function AdminProductsPage({
    title,
    description,
    subcategory,
    categorySlug,
    createPath,
    onSale,
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

    const [search, setSearch] = useState("");
    const [stockFilter, setStockFilter] = useState("all");
    const [buyerDetails, setBuyerDetails] = useState(null);
    const [buyersLoading, setBuyersLoading] = useState(false);
    const [buyersError, setBuyersError] = useState("");

    const visibleProducts = useMemo(() => products.filter((product) => {
        const normalizedSearch = search.trim().toLocaleLowerCase("es");
        const matchesSearch = !normalizedSearch || `${product.name} ${product.description || ""}`.toLocaleLowerCase("es").includes(normalizedSearch);
        const stock = Number(product.stock);
        const matchesStock = stockFilter === "all" || (stockFilter === "low" ? stock <= 5 : stockFilter === "empty" ? stock === 0 : stock > 0);
        return matchesSearch && matchesStock;
    }), [products, search, stockFilter]);

    const handleExport = () => exportCsv(
        `virtuosa-productos-${new Date().toISOString().slice(0, 10)}.csv`,
        ["ID", "Producto", "Categoría", "Subcategoría", "Precio", "Stock", "Destacado"],
        visibleProducts.map((product) => [product.id, product.name, product.category_name, product.subcategory, product.price, product.stock, product.featured ? "Sí" : "No"])
    );

    const changeViewMode = (mode) => {
        setViewMode(mode);
        window.localStorage.setItem("adminProductsView", mode);
    };

    const openBuyerDetails = async (product) => {
        setBuyerDetails({ product, buyers: [], summary: {} });
        setBuyersLoading(true);
        setBuyersError("");

        try {
            const response = await apiClient.get(`/products/${product.id}/buyers`);
            setBuyerDetails(response?.data?.data);
        } catch (err) {
            console.error("Error cargando compradores:", err);
            setBuyersError(
                err?.response?.data?.message ||
                "No fue posible consultar los compradores de este producto."
            );
        } finally {
            setBuyersLoading(false);
        }
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
                                    onSale: onSale ? true : undefined,
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
            [onSale, subcategory]
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
                    <Plus size={17} aria-hidden="true" />

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
                    <div className="admin-products-filters">
                        <label><Search size={16} aria-hidden="true" /><input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar producto" /></label>
                        <select value={stockFilter} onChange={(event) => setStockFilter(event.target.value)} aria-label="Filtrar inventario"><option value="all">Todo el inventario</option><option value="available">Con stock</option><option value="low">Stock bajo</option><option value="empty">Agotados</option></select>
                        <button type="button" className="admin-products-export" onClick={handleExport} disabled={visibleProducts.length === 0}><Download size={16} aria-hidden="true" /> Exportar CSV</button>
                    </div>

                    <p>Mostrando {visibleProducts.length} de {products.length}</p>

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
                            <Grid2X2 size={16} aria-hidden="true" />
                            Tarjetas
                        </button>

                        <button
                            type="button"
                            className={viewMode === "list" ? "active" : ""}
                            aria-pressed={viewMode === "list"}
                            onClick={() => changeViewMode("list")}
                        >
                            <List size={16} aria-hidden="true" />
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

            {!loading && !error && products.length > 0 && visibleProducts.length === 0 && (
                <section className="admin-products-status"><i className="fa-solid fa-filter-circle-xmark" /><h2>Sin coincidencias</h2><p>Cambia la búsqueda o el filtro de inventario.</p><button type="button" onClick={() => { setSearch(""); setStockFilter("all"); }}>Limpiar filtros</button></section>
            )}

            {!loading &&
                !error &&
                visibleProducts.length >
                0 && (
                    <main className={`admin-products-grid admin-products-${viewMode}`}>
                        {visibleProducts.map(
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
                                        {product.on_sale && (
                                            <span className="admin-product-featured" style={{ top: product.featured ? "42px" : "12px", background: "#9b4454" }}>
                                                Promoción
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
                                                className="admin-product-view"
                                                onClick={() => openBuyerDetails(product)}
                                                aria-label={`Ver detalle y compradores de ${product.name}`}
                                            >
                                                <Eye size={17} aria-hidden="true" />
                                                Ver detalle
                                            </button>

                                            <div className="admin-product-crud-actions">
                                            <button
                                                type="button"
                                                className="admin-product-edit"
                                                onClick={() =>
                                                    setSelectedProduct(
                                                        product
                                                    )
                                                }
                                            >
                                                <Pencil size={16} aria-hidden="true" />

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
                                                <Trash2 size={16} aria-hidden="true" />

                                                Eliminar
                                            </button>
                                            </div>
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

            {buyerDetails && (
                <AdminProductBuyersModal
                    details={buyerDetails}
                    loading={buyersLoading}
                    error={buyersError}
                    onClose={() => setBuyerDetails(null)}
                />
            )}
        </div>
    );
}

export default AdminProductsPage;
