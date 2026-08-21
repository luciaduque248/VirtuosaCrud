import React, { useDeferredValue, useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import Header from "../components/header/header";
import Home from "../components/home/home";
import Footer from "../components/footer/footer";
import apiClient from "../services/apiClient";
import { useFavorites } from "../context/FavoritesContext";
import Seo from "../components/seo/Seo";
import "../components/assets/css/Catalog.css";
import "../components/assets/css/FavoriteControls.css";

const formatPrice = (value) => new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(Number(value) || 0);

function Catalog() {
    const { isFavorite, toggleFavorite } = useFavorites();
    const [searchParams, setSearchParams] = useSearchParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const category = searchParams.get("categoria") || "all";
    const sort = searchParams.get("orden") || "featured";
    const availability = searchParams.get("disponibilidad") || "all";
    const query = searchParams.get("buscar") || "";
    const deferredQuery = useDeferredValue(query);

    useEffect(() => {
        let active = true;
        setLoading(true);
        apiClient.get("/products", { params: deferredQuery ? { search: deferredQuery } : undefined })
            .then((response) => {
                if (active) setProducts(response?.data?.data || []);
            })
            .catch(() => {
                if (active) setError("No pudimos cargar el catálogo. Intenta nuevamente.");
            })
            .finally(() => {
                if (active) setLoading(false);
            });
        return () => { active = false; };
    }, [deferredQuery]);

    const visibleProducts = useMemo(() => {
        const filtered = products.filter((product) => {
            const categoryMatches = category === "all" || product.category_slug === category;
            const availabilityMatches = availability === "all" || (availability === "available" ? Number(product.stock) > 0 : Number(product.stock) <= 0);
            return categoryMatches && availabilityMatches;
        });
        return [...filtered].sort((a, b) => {
            if (sort === "price-asc") return Number(a.price) - Number(b.price);
            if (sort === "price-desc") return Number(b.price) - Number(a.price);
            if (sort === "name") return a.name.localeCompare(b.name, "es");
            if (sort === "newest") return new Date(b.created_at) - new Date(a.created_at);
            return Number(b.featured) - Number(a.featured);
        });
    }, [availability, category, products, sort]);

    const updateFilter = (key, value) => {
        const next = new URLSearchParams(searchParams);
        if (!value || value === "all" || (key === "orden" && value === "featured")) next.delete(key);
        else next.set(key, value);
        setSearchParams(next, { replace: true });
    };

    const clearFilters = () => setSearchParams({}, { replace: true });

    return (
        <div className="catalog-page">
            <Seo title="Tienda de moda y belleza" description="Explora el catálogo de moda, maquillaje y cuidado personal de Virtuosa en Colombia." />
            <Header />
            <Home />
            <main>
                <section className="catalog-hero">
                    <span>Virtuosa Selection</span>
                    <h1>Todo lo que transforma tu forma de verte.</h1>
                    <p>Moda y belleza reunidas en una selección pensada para descubrir a tu ritmo.</p>
                </section>

                <section className="catalog-shell" aria-labelledby="catalog-title">
                    <div className="catalog-heading">
                        <div><span>Catálogo</span><h2 id="catalog-title">Encuentra tu próximo favorito</h2></div>
                        <p>{visibleProducts.length} {visibleProducts.length === 1 ? "producto" : "productos"}</p>
                    </div>

                    <div className="catalog-toolbar">
                        <label>Buscar<input type="search" value={query} onChange={(event) => updateFilter("buscar", event.target.value)} placeholder="Nombre o descripción" /></label>
                        <label>Categoría<select value={category} onChange={(event) => updateFilter("categoria", event.target.value)}><option value="all">Todas</option><option value="moda">Moda</option><option value="maquillaje">Maquillaje</option></select></label>
                        <label>Disponibilidad<select value={availability} onChange={(event) => updateFilter("disponibilidad", event.target.value)}><option value="all">Todos</option><option value="available">Disponibles</option><option value="sold-out">Agotados</option></select></label>
                        <label>Ordenar<select value={sort} onChange={(event) => updateFilter("orden", event.target.value)}><option value="featured">Destacados</option><option value="newest">Más recientes</option><option value="price-asc">Menor precio</option><option value="price-desc">Mayor precio</option><option value="name">Nombre</option></select></label>
                        <button type="button" onClick={clearFilters}>Limpiar</button>
                    </div>

                    {loading ? <div className="catalog-state"><i className="fa-solid fa-spinner" /><p>Cargando selección...</p></div> : null}
                    {!loading && error ? <div className="catalog-state"><h3>No pudimos mostrar los productos</h3><p>{error}</p></div> : null}
                    {!loading && !error && visibleProducts.length === 0 ? <div className="catalog-state"><h3>No encontramos coincidencias</h3><p>Prueba cambiando o limpiando los filtros.</p><button type="button" onClick={clearFilters}>Ver todo</button></div> : null}
                    {!loading && !error && visibleProducts.length > 0 ? (
                        <div className="catalog-grid">
                            {visibleProducts.map((product) => (
                                <article className="catalog-card" key={product.id}>
                                    <Link to={`/VirtuosaCrud/producto/${product.id}`} className="catalog-card-image">
                                        <img src={product.image_url} alt={product.name} loading="lazy" />
                                        {product.featured ? <span>Selección</span> : null}
                                    </Link>
                                    <button type="button" className={`catalog-favorite ${isFavorite(product.id) ? "is-favorite" : ""}`} onClick={() => toggleFavorite(product)} aria-label={`${isFavorite(product.id) ? "Eliminar" : "Agregar"} ${product.name} ${isFavorite(product.id) ? "de" : "a"} favoritos`}><i className={`${isFavorite(product.id) ? "fa-solid" : "fa-regular"} fa-heart`} /></button>
                                    <div className="catalog-card-copy">
                                        <span>{product.category_name} · {product.subcategory}</span>
                                        <h3><Link to={`/VirtuosaCrud/producto/${product.id}`}>{product.name}</Link></h3>
                                        <div><strong>{formatPrice(product.price)}</strong><small>{Number(product.stock) > 0 ? `${product.stock} disponibles` : "Agotado"}</small></div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    ) : null}
                </section>
            </main>
            <Footer />
        </div>
    );
}

export default Catalog;
