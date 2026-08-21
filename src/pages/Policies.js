import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/header/header";
import Home from "../components/home/home";
import Footer from "../components/footer/footer";
import Seo from "../components/seo/Seo";
import "../components/assets/css/Policies.css";

const sections = [
    { id: "envios", icon: "fa-truck-fast", title: "Envíos y entregas", copy: "Realizamos entregas nacionales a la dirección indicada en el checkout. Los tiempos y costos dependen del destino y se confirman antes del despacho. Verifica que tus datos estén completos para evitar retrasos." },
    { id: "cambios", icon: "fa-rotate-left", title: "Cambios", copy: "Puedes solicitar un cambio si el producto está sin usar, conserva sus etiquetas, empaque y condiciones originales. Por higiene, los cosméticos abiertos o probados no admiten cambio, salvo que presenten una novedad de calidad." },
    { id: "pagos", icon: "fa-shield-heart", title: "Compra y pagos", copy: "El pedido queda registrado con estado pendiente hasta que nuestro equipo confirme el método seleccionado. Virtuosa nunca solicitará contraseñas ni códigos personales por mensajes o llamadas." },
    { id: "privacidad", icon: "fa-lock", title: "Privacidad", copy: "Usamos tus datos exclusivamente para gestionar compras, entregas y solicitudes de servicio. No vendemos tu información. Puedes pedir su consulta, corrección o eliminación a través de la página de contacto." },
];

function Policies() {
    return (
        <div className="policies-page">
            <Seo title="Políticas de compra" description="Consulta las políticas de envíos, cambios, pagos y privacidad de Virtuosa." />
            <Header />
            <Home />
            <main id="main-content" className="policies-main">
                <header className="policies-hero"><span>Compra con tranquilidad</span><h1>Claridad antes, durante y después de elegir.</h1><p>Reunimos lo esencial para que tu experiencia con Virtuosa sea transparente y sencilla.</p></header>
                <nav className="policies-nav" aria-label="Contenido de políticas">{sections.map((section) => <a href={`#${section.id}`} key={section.id}>{section.title}</a>)}</nav>
                <div className="policies-grid">{sections.map((section, index) => <article id={section.id} key={section.id}><span>0{index + 1}</span><i className={`fa-solid ${section.icon}`} /><h2>{section.title}</h2><p>{section.copy}</p></article>)}</div>
                <section className="policies-contact"><div><span>Estamos para ayudarte</span><h2>¿Tienes una situación específica?</h2></div><Link to="/VirtuosaCrud/contacto">Hablar con Virtuosa →</Link></section>
                <p className="policies-update">Última actualización: agosto de 2026.</p>
            </main>
            <Footer />
        </div>
    );
}

export default Policies;
