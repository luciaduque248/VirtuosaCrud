import React from "react";
import { Link } from "react-router-dom";

import Header from "../components/header/header";
import Home from "../components/home/home";
import Footer from "../components/footer/footer";
import { useFavorites } from "../context/FavoritesContext";
import "../components/assets/css/Favorites.css";

const formatPrice = (value) => new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(Number(value) || 0);

function Favorites() {
    const { favorites, toggleFavorite } = useFavorites();
    return (
        <div className="favorites-page">
            <Header /><Home />
            <main>
                <section className="favorites-hero"><span>Tu selección</span><h1>Favoritos para volver a mirar.</h1><p>Guarda lo que te inspira mientras decides. Tus favoritos permanecen en este dispositivo.</p></section>
                {favorites.length === 0 ? <section className="favorites-empty"><i className="fa-regular fa-heart" /><h2>Aún no guardaste favoritos</h2><p>Explora la tienda y usa el corazón para crear tu propia selección.</p><Link to="/VirtuosaCrud/productos">Explorar productos</Link></section> : (
                    <section className="favorites-content"><div className="favorites-heading"><h2>Tu edit</h2><span>{favorites.length} guardados</span></div><div className="favorites-grid">{favorites.map((product) => <article key={product.id}><Link to={`/VirtuosaCrud/producto/${product.id}`}><img src={product.image_url} alt={product.name} /></Link><button type="button" onClick={() => toggleFavorite(product)} aria-label={`Eliminar ${product.name} de favoritos`}><i className="fa-solid fa-heart" /></button><span>{product.category_name}</span><h3><Link to={`/VirtuosaCrud/producto/${product.id}`}>{product.name}</Link></h3><strong>{formatPrice(product.price)}</strong></article>)}</div></section>
                )}
            </main>
            <Footer />
        </div>
    );
}

export default Favorites;
