import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Header from "../components/header/header";
import Home from "../components/home/home";
import Footer from "../components/footer/footer";
import AddToCartControls from "../components/cart/AddToCartControls";
import apiClient from "../services/apiClient";
import { useFavorites } from "../context/FavoritesContext";
import Seo from "../components/seo/Seo";
import "../components/assets/css/ProductDetail.css";
import "../components/assets/css/FavoriteControls.css";

const formatPrice = (value) => new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(Number(value) || 0);

function ProductDetail() {
    const { isFavorite, toggleFavorite } = useFavorites();
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [related, setRelated] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let active = true;
        setLoading(true);
        setError("");
        apiClient.get(`/products/${id}`)
            .then((response) => {
                const currentProduct = response?.data?.data;
                if (!active) return;
                setProduct(currentProduct);
                apiClient.get("/products", { params: { category: currentProduct.category_slug } })
                    .then((relatedResponse) => {
                        if (active) setRelated((relatedResponse?.data?.data || []).filter((item) => item.id !== currentProduct.id).slice(0, 3));
                    })
                    .catch(() => { if (active) setRelated([]); });
            })
            .catch(() => { if (active) setError("Este producto no está disponible o ya no existe."); })
            .finally(() => { if (active) setLoading(false); });
        return () => { active = false; };
    }, [id]);

    return (
        <div className="product-detail-page">
            {product ? <Seo title={product.name} description={product.description || `Descubre ${product.name} en Virtuosa.`} image={product.image_url} type="product" structuredData={{ "@context": "https://schema.org", "@type": "Product", name: product.name, image: [product.image_url], description: product.description, sku: String(product.id), brand: { "@type": "Brand", name: "Virtuosa" }, offers: { "@type": "Offer", priceCurrency: "COP", price: Number(product.price), availability: Number(product.stock) > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock", url: `${window.location.origin}/VirtuosaCrud/producto/${product.id}` } }} /> : null}
            <Header />
            <Home />
            <main>
                {loading ? <div className="product-detail-state"><i className="fa-solid fa-spinner" /><p>Cargando producto...</p></div> : null}
                {!loading && error ? <div className="product-detail-state"><h1>Producto no encontrado</h1><p>{error}</p><Link to="/VirtuosaCrud/productos">Volver al catálogo</Link></div> : null}
                {!loading && product ? (
                    <>
                        <nav className="product-breadcrumb" aria-label="Migas de pan"><Link to="/VirtuosaCrud/productos">Catálogo</Link><span>/</span><span>{product.category_name}</span><span>/</span><strong>{product.name}</strong></nav>
                        <section className="product-detail-main">
                            <div className="product-detail-gallery"><img src={product.image_url} alt={product.name} /><span>{product.featured ? "Selección Virtuosa" : product.category_name}</span></div>
                            <div className="product-detail-copy">
                                <span>{product.category_name} · {product.subcategory}</span>
                                <h1>{product.name}</h1>
                                <strong className="product-detail-price">{formatPrice(product.price)}</strong>
                                <p>{product.description || "Una pieza seleccionada para acompañar tu estilo y rutina."}</p>
                                <div className={`product-stock ${Number(product.stock) > 0 ? "available" : "sold-out"}`}><i className="fa-solid fa-circle" />{Number(product.stock) > 0 ? `Disponible · ${product.stock} unidades` : "Temporalmente agotado"}</div>
                                <button type="button" className={`product-favorite ${isFavorite(product.id) ? "is-favorite" : ""}`} onClick={() => toggleFavorite(product)}><i className={`${isFavorite(product.id) ? "fa-solid" : "fa-regular"} fa-heart`} />{isFavorite(product.id) ? "Guardado en favoritos" : "Guardar en favoritos"}</button>
                                <AddToCartControls product={product} showSize={product.category_slug === "moda"} />
                                <div className="product-benefits"><p><i className="fa-solid fa-truck-fast" /> Envío gratis desde $200.000</p><p><i className="fa-solid fa-shield-heart" /> Compra protegida</p><p><i className="fa-solid fa-rotate-left" /> Cambios sencillos</p></div>
                            </div>
                        </section>
                        <section className="product-care"><div><span>Detalle &amp; cuidado</span><h2>Diseñado para formar parte de tu historia.</h2></div><p>Conserva el producto en un lugar fresco y seco. En prendas, sigue las instrucciones de la etiqueta; en cosméticos, mantén el envase cerrado y evita compartirlo.</p></section>
                        {related.length > 0 ? <section className="product-related"><span>También te puede gustar</span><h2>Sigue explorando</h2><div>{related.map((item) => <Link to={`/VirtuosaCrud/producto/${item.id}`} key={item.id}><img src={item.image_url} alt="" loading="lazy" /><h3>{item.name}</h3><strong>{formatPrice(item.price)}</strong></Link>)}</div></section> : null}
                    </>
                ) : null}
            </main>
            <Footer />
        </div>
    );
}

export default ProductDetail;
