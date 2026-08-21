import Header from "../components/header/header";
import Home from "../components/home/home";
import Footer from "../components/footer/footer";
import Nosinfo from "../components/nosotros/Nosinfo";

import "../components/nosotros/Nosinfo.css";

function Nosotros() {
    return (
        <div className="about-page">
            <Header />
            <Home />

            <main>
                <section className="about-hero" aria-labelledby="about-title">
                    <div className="about-hero-image" role="img" aria-label="El universo creativo de Virtuosa" />
                    <div className="about-hero-copy">
                        <span>Desde Bogotá · 2017</span>
                        <h1 id="about-title">Creamos un espacio para elegirte a ti.</h1>
                        <p>Virtuosa nació para hacer de la belleza y la moda una experiencia cercana, libre y personal.</p>
                        <a href="#about-story">Conoce nuestra historia <i className="fa-solid fa-arrow-down" aria-hidden="true" /></a>
                    </div>
                </section>

                <Nosinfo />
            </main>

            <Footer />
        </div>
    );
}

export default Nosotros;
