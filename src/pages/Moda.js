import { Link } from "react-router-dom";

import Header from "../components/header/header";
import Home from "../components/home/home";
import Footer from "../components/footer/footer";
import dressesImage from "../components/assets/img/ropa/BANNERPagGENERAL.gif";
import trendsImage from "../components/assets/img/ropa/banner/apartados/tendencias.gif";
import saleImage from "../components/assets/img/ropa/banner/apartados/descuentos.gif";

import "../components/assets/css/Moda.css";

const fashionStories = [
    { number: "01", eyebrow: "Colección esencial", title: "Vestidos", text: "Siluetas femeninas, fluidas y versátiles para acompañarte de día y de noche.", image: dressesImage, to: "/VirtuosaCrud/moda-vestidos", action: "Explorar vestidos" },
    { number: "02", eyebrow: "The trend report", title: "Novedades", text: "Ideas, combinaciones y piezas que están definiendo la nueva temporada.", image: trendsImage, to: "/VirtuosaCrud/moda-tendencias", action: "Ver tendencias" },
    { number: "03", eyebrow: "Selección especial", title: "Promociones", text: "Encuentra tus favoritos con precios especiales, sin renunciar al estilo.", image: saleImage, to: "/VirtuosaCrud/moda-descuentos", action: "Ver promociones" },
];

function Moda() {
    return (
        <div className="fashion-page">
            <Header />
            <Home />

            <main>
                <section className="fashion-hero" aria-labelledby="fashion-title">
                    <div className="fashion-hero-image" role="img" aria-label="Editorial de moda Virtuosa" />
                    <div className="fashion-hero-copy">
                        <span>Virtuosa Fashion · Edit 2026</span>
                        <h1 id="fashion-title">Viste como piensas: sin pedir permiso.</h1>
                        <p>Una colección creada para mezclar, reinterpretar y convertir cada día en algo propio.</p>
                        <a href="#fashion-stories">Explorar la edición <i className="fa-solid fa-arrow-down" aria-hidden="true" /></a>
                    </div>
                    <span className="fashion-hero-mark" aria-hidden="true">V</span>
                </section>

                <section className="fashion-intro" id="fashion-stories" aria-labelledby="fashion-intro-title">
                    <span>La edición Virtuosa</span>
                    <h2 id="fashion-intro-title">Tres maneras de encontrar tu próxima pieza favorita.</h2>
                    <p>Compra por colección, descubre qué viene o aprovecha nuestra selección especial.</p>
                </section>

                <section className="fashion-stories" aria-label="Colecciones de moda">
                    {fashionStories.map((story, index) => (
                        <article className={`fashion-story ${index % 2 ? "fashion-story-reverse" : ""}`} key={story.title}>
                            <Link className="fashion-story-image" to={story.to} aria-label={story.action}>
                                <img src={story.image} alt="" />
                                <span>{story.number}</span>
                            </Link>
                            <div className="fashion-story-copy">
                                <span>{story.eyebrow}</span>
                                <h2>{story.title}</h2>
                                <p>{story.text}</p>
                                <Link to={story.to}>{story.action} <i className="fa-solid fa-arrow-right" aria-hidden="true" /></Link>
                            </div>
                        </article>
                    ))}
                </section>

                <section className="fashion-note" aria-labelledby="fashion-note-title">
                    <span className="fashion-note-index">Style note / 26</span>
                    <h2 id="fashion-note-title">Tu armario debe parecerse a ti, no a un algoritmo.</h2>
                    <Link to="/VirtuosaCrud/tips/ropa">Inspírate con nuestros tips</Link>
                </section>
            </main>

            <Footer />
        </div>
    );
}

export default Moda;
