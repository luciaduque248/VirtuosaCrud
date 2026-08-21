import React from "react";
import { Link } from "react-router-dom";

import mapaVirtuosa from "./mapa.png";
import "../header/header.css";

function Footer() {
    return (
        <footer className="site-footer">
            <div className="footer-grid">
                <section className="footer-column footer-location">
                    <span className="footer-eyebrow">Encuéntranos</span>
                    <h2>Visítanos</h2>
                    <p>Cra. 14a #82-27<br />Bogotá, Colombia</p>
                    <a href="https://goo.gl/maps/Ex7GE3LofT1q8U6m8" target="_blank" rel="noreferrer" aria-label="Ver ubicación de Virtuosa en Google Maps">
                        <img src={mapaVirtuosa} alt="Mapa de ubicación de Virtuosa" className="mapa" />
                    </a>
                </section>
                <section className="footer-column">
                    <h2>Virtuosa</h2>
                    <Link to="/VirtuosaCrud/nosotros">Acerca de nosotros</Link>
                    <Link to="/VirtuosaCrud/contacto">Contáctanos</Link>
                    <Link to="/VirtuosaCrud/tips">Consejos y tendencias</Link>
                </section>
                <section className="footer-column">
                    <h2>Explora</h2>
                    <Link to="/VirtuosaCrud/moda">Moda</Link>
                    <Link to="/VirtuosaCrud/maquillaje">Maquillaje</Link>
                    <Link to="/VirtuosaCrud/carrito">Tu carrito</Link>
                    <Link to="/VirtuosaCrud/seguimiento">Seguir mi pedido</Link>
                    <Link to="/VirtuosaCrud/politicas">Envíos, cambios y privacidad</Link>
                    <Link to="/VirtuosaCrud/login">Administración</Link>
                </section>
                <section className="footer-column footer-newsletter">
                    <span className="footer-eyebrow">Novedades</span>
                    <h2>Inspírate con Virtuosa</h2>
                    <p>Descubre colecciones, tendencias y consejos seleccionados para ti.</p>
                    <Link className="footer-cta" to="/VirtuosaCrud/tips">Ver novedades</Link>
                    <div className="footer-socials" aria-label="Redes sociales">
                        {["facebook-f", "instagram", "pinterest", "youtube"].map((icon) => (
                            <span key={icon} aria-hidden="true"><i className={`fa-brands fa-${icon}`} /></span>
                        ))}
                    </div>
                </section>
            </div>
            <div className="footer-bottom">
                <small>© {new Date().getFullYear()} <strong>Virtuosa S. A.</strong> — Todos los derechos reservados.</small>
            </div>
        </footer>
    );
}

export default Footer;
