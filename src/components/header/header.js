import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import logoVirtuosa from "../assets/img/logo 1.svg";
import { useCart } from "../../context/CartContext";

import "./header.css";
import "./HeaderCart.css";

const searchDestinations = [
    { label: "Maquillaje", detail: "Explora maquillaje y belleza", path: "/VirtuosaCrud/maquillaje", keywords: "maquillaje belleza cosméticos" },
    { label: "Moda", detail: "Colecciones y tendencias", path: "/VirtuosaCrud/moda", keywords: "moda ropa colección" },
    { label: "Vestidos", detail: "Vestidos para cada ocasión", path: "/VirtuosaCrud/moda-vestidos", keywords: "vestidos ropa" },
    { label: "Ojos", detail: "Productos para ojos", path: "/VirtuosaCrud/ojos", keywords: "ojos sombras mascara" },
    { label: "Labios", detail: "Color y cuidado para labios", path: "/VirtuosaCrud/labios", keywords: "labios labial lipstick" },
    { label: "Cuidado de la piel", detail: "Rutinas y productos para la piel", path: "/VirtuosaCrud/piel", keywords: "piel skincare cuidado" },
    { label: "Tips de moda", detail: "Guía para cuidar tu ropa", path: "/VirtuosaCrud/tips/ropa", keywords: "tips consejos ropa moda" },
    { label: "Tips de maquillaje", detail: "Guía para cuidar tu maquillaje", path: "/VirtuosaCrud/tips/maquillaje", keywords: "tips consejos maquillaje" },
];

function Header() {
    const { itemCount } = useCart();
    const navigate = useNavigate();
    const searchInputRef = useRef(null);
    const [searchOpen, setSearchOpen] = useState(false);
    const [query, setQuery] = useState("");

    useEffect(() => {
        const mainContent = document.querySelector("main");
        if (mainContent && !mainContent.id) mainContent.id = "main-content";
    }, []);

    const results = useMemo(() => {
        const normalizedQuery = query.trim().toLocaleLowerCase("es");
        return normalizedQuery
            ? searchDestinations.filter(({ label, keywords }) => `${label} ${keywords}`.toLocaleLowerCase("es").includes(normalizedQuery)).slice(0, 5)
            : searchDestinations.slice(0, 5);
    }, [query]);

    useEffect(() => {
        if (!searchOpen) return undefined;
        searchInputRef.current?.focus();
        const closeOnEscape = (event) => {
            if (event.key === "Escape") setSearchOpen(false);
        };
        document.addEventListener("keydown", closeOnEscape);
        return () => document.removeEventListener("keydown", closeOnEscape);
    }, [searchOpen]);

    const visitDestination = (path) => {
        setSearchOpen(false);
        setQuery("");
        navigate(path);
    };

    return (
        <header className="site-header">
            <a className="skip-link" href="#main-content">Saltar al contenido</a>
            <div className="header-announcement">
                <p><i className="fa-solid fa-truck-fast" aria-hidden="true" /> Envío gratis desde $200.000</p>
                <span>Compra segura · Entregas nacionales</span>
            </div>

            <div className="header-main">
                <p className="header-signature">Moda &amp; belleza para expresarte</p>
                <Link to="/VirtuosaCrud/" className="header-brand" aria-label="Virtuosa, ir al inicio">
                    <img src={logoVirtuosa} alt="Virtuosa" />
                </Link>
                <div className="header-actions" aria-label="Acciones rápidas">
                    <button type="button" className="header-action" onClick={() => setSearchOpen(true)} aria-haspopup="dialog">
                        <i className="fa-solid fa-magnifying-glass" aria-hidden="true" />
                        <span>Buscar</span>
                    </button>
                    <Link to="/VirtuosaCrud/login" className="header-action">
                        <i className="fa-regular fa-user" aria-hidden="true" />
                        <span>Cuenta</span>
                    </Link>
                    <Link to="/VirtuosaCrud/carrito" className="header-action header-cart-link" aria-label={`Carrito, ${itemCount} productos`}>
                        <i className="fa-solid fa-bag-shopping" aria-hidden="true" />
                        <span>Carrito</span>
                        {itemCount > 0 ? <b className="header-cart-count">{itemCount > 99 ? "99+" : itemCount}</b> : null}
                    </Link>
                </div>
            </div>

            {searchOpen ? (
                <div className="header-search-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setSearchOpen(false)}>
                    <section className="header-search-panel" role="dialog" aria-modal="true" aria-labelledby="search-title">
                        <div className="header-search-top">
                            <div>
                                <span>Explorar Virtuosa</span>
                                <h2 id="search-title">¿Qué estás buscando?</h2>
                            </div>
                            <button type="button" className="header-search-close" onClick={() => setSearchOpen(false)} aria-label="Cerrar búsqueda">
                                <i className="fa-solid fa-xmark" aria-hidden="true" />
                            </button>
                        </div>
                        <label className="header-search-field">
                            <span className="sr-only">Buscar una sección</span>
                            <i className="fa-solid fa-magnifying-glass" aria-hidden="true" />
                            <input ref={searchInputRef} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Prueba: vestidos, labios, tips..." />
                        </label>
                        <div className="header-search-results" aria-live="polite">
                            {results.length > 0 ? results.map(({ label, detail, path }) => (
                                <button type="button" key={path} onClick={() => visitDestination(path)}>
                                    <span><strong>{label}</strong><small>{detail}</small></span>
                                    <i className="fa-solid fa-arrow-right" aria-hidden="true" />
                                </button>
                            )) : <p>No encontramos esa sección. Prueba con otra palabra.</p>}
                        </div>
                    </section>
                </div>
            ) : null}
        </header>
    );
}

export default Header;
