import Header from "../components/header/header";
import Home from "../components/home/home";
import Footer from "../components/footer/footer";
import Contacto from "../components/contacto/Contacto";

import "../components/contacto/Contacto.css";

function Contact() {
    return (
        <div className="contact-page">
            <Header />
            <Home />

            <main>
                <section className="contact-hero" aria-labelledby="contact-title">
                    <div className="contact-hero-copy">
                        <span>Hablemos</span>
                        <h1 id="contact-title">Estamos aquí para escucharte.</h1>
                        <p>Una pregunta, una idea o algo que podamos mejorar. Cuéntanos y nuestro equipo te acompañará.</p>
                        <a href="#contact-form">Escribir un mensaje <i className="fa-solid fa-arrow-down" aria-hidden="true" /></a>
                    </div>
                    <div className="contact-hero-image" role="img" aria-label="Escritorio creativo de Virtuosa" />
                </section>

                <Contacto />
            </main>

            <Footer />
        </div>
    );
}

export default Contact;
