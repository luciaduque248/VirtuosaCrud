import { Link } from "react-router-dom";

import Header from "../components/header/header";
import Footer from "../components/footer/footer";
import Home from "../components/home/home";

import "../components/assets/css/inicio.css";

const benefits = [
    { icon: "fa-box-open", title: "Envío gratis", text: "En compras desde $200.000" },
    { icon: "fa-shield-heart", title: "Compra segura", text: "Tus datos siempre protegidos" },
    { icon: "fa-credit-card", title: "Paga a tu manera", text: "Múltiples medios de pago" },
    { icon: "fa-rotate-left", title: "Compra tranquila", text: "Devoluciones sin costo" },
];

function Inicio() {
    return (
        <div className="home-page">
            <Header />
            <Home />

            <main>
                <section className="home-hero" aria-labelledby="home-hero-title">
                    <div className="home-hero-copy">
                        <span className="home-eyebrow">Belleza · Moda · Actitud</span>
                        <h1 id="home-hero-title">Tu estilo no sigue reglas. Las crea.</h1>
                        <p>Descubre una selección pensada para expresarte: belleza que potencia lo que eres y moda que habla antes que tú.</p>
                        <div className="home-hero-actions">
                            <Link className="home-button home-button-primary" to="/VirtuosaCrud/maquillaje">Explorar maquillaje</Link>
                            <Link className="home-button home-button-secondary" to="/VirtuosaCrud/moda">Descubrir moda</Link>
                        </div>
                    </div>

                    <div className="home-hero-visual" aria-hidden="true">
                        <span className="home-hero-stamp">Nueva<br />mirada</span>
                    </div>

                    <p className="home-hero-note">Curaduría Virtuosa · 2026</p>
                </section>

                <section className="home-intro" aria-labelledby="home-intro-title">
                    <span className="home-section-number" aria-hidden="true">01</span>
                    <div>
                        <span className="home-eyebrow">Elige tu universo</span>
                        <h2 id="home-intro-title">Todo lo que necesitas para crear tu propia versión.</h2>
                    </div>
                    <p>Productos, inspiración y tendencias reunidos en una experiencia simple, visual y hecha para ti.</p>
                </section>

                <section className="home-worlds" aria-label="Categorías destacadas">
                    <article className="home-world home-world-beauty">
                        <div className="home-world-content">
                            <span>Beauty edit</span>
                            <h2>El poder de un buen detalle</h2>
                            <p>Texturas, tonos y esenciales que resaltan tu belleza real.</p>
                            <Link to="/VirtuosaCrud/maquillaje">Ver maquillaje <i className="fa-solid fa-arrow-right" aria-hidden="true" /></Link>
                        </div>
                    </article>

                    <article className="home-world home-world-fashion">
                        <div className="home-world-content">
                            <span>Fashion edit</span>
                            <h2>Piezas que cuentan tu historia</h2>
                            <p>Siluetas femeninas y versátiles para llevar a tu manera.</p>
                            <Link to="/VirtuosaCrud/moda">Ver colección <i className="fa-solid fa-arrow-right" aria-hidden="true" /></Link>
                        </div>
                    </article>
                </section>

                <section className="home-manifesto" aria-labelledby="manifesto-title">
                    <span className="home-manifesto-mark" aria-hidden="true">V</span>
                    <div>
                        <span className="home-eyebrow">Manifiesto Virtuosa</span>
                        <h2 id="manifesto-title">No vendemos una versión perfecta. Celebramos la tuya.</h2>
                    </div>
                    <Link to="/VirtuosaCrud/nosotros">Conoce nuestra esencia</Link>
                </section>

                <section className="home-benefits" aria-label="Beneficios de compra">
                    {benefits.map((benefit) => (
                        <article className="home-benefit" key={benefit.title}>
                            <i className={`fa-solid ${benefit.icon}`} aria-hidden="true" />
                            <div>
                                <h3>{benefit.title}</h3>
                                <p>{benefit.text}</p>
                            </div>
                        </article>
                    ))}
                </section>
            </main>

            <Footer />
        </div>
    );
}

export default Inicio;
