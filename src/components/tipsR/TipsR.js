import React from "react";
import ImgRopa from "../assets/img/tips/imgTipsRopa.png";
import "./TipsR.css";

const clothingTips = [
    ["01", "Lava menos, cuida más", "Airea cada prenda después de usarla y lávala solo cuando realmente lo necesite. Ahorras agua y proteges sus fibras."],
    ["02", "Dobla el punto", "Los tejidos de punto conservan mejor su forma doblados. Las perchas pueden estirar hombros y cuellos."],
    ["03", "Tiende con intención", "Coloca las pinzas sobre costuras o pliegues naturales para evitar marcas y deja secar a la sombra los colores intensos."],
    ["04", "Vapor para refrescar", "El vapor ayuda a recuperar prendas delicadas entre usos. Revisa siempre la etiqueta antes de aplicar calor."],
    ["05", "Cuero, siempre protegido", "Guárdalo sin doblar, lejos de la humedad y usa productos específicos. Para una limpieza profunda, elige un especialista."],
    ["06", "Del claro al oscuro", "Si lavas a mano, comienza por los tonos claros y termina con los oscuros. Usa detergente suave ya disuelto en el agua."],
    ["07", "Repara antes de reemplazar", "Un botón, un dobladillo o una pequeña costura pueden extender años la vida de una prenda favorita."],
];

function TipsR() {
    return (
        <main className="guide-page guide-page-fashion">
            <section className="guide-hero">
                <div className="guide-hero-copy">
                    <span>Virtuosa Wardrobe · Guía 01</span>
                    <h1>Tu ropa merece una vida más larga.</h1>
                    <p>Siete hábitos simples para cuidar mejor lo que ya amas y construir un armario más consciente.</p>
                    <a href="#fashion-guide">Descubrir la guía <i className="fa-solid fa-arrow-down" aria-hidden="true" /></a>
                </div>
                <div className="guide-hero-image" role="img" aria-label="Selección editorial de prendas de moda">
                    <span>07</span>
                </div>
            </section>

            <section className="guide-intro" id="fashion-guide">
                <div>
                    <span>Care journal</span>
                    <h2>Menos reglas.<br />Mejores rituales.</h2>
                </div>
                <p>La moda también está en cómo cuidamos cada pieza. Empieza con estos gestos cotidianos y adáptalos a tus prendas.</p>
            </section>

            <section className="guide-feature">
                <img src={ImgRopa} alt="Prendas seleccionadas en una tienda de moda" />
                <div>
                    <span>Una pausa antes de lavar</span>
                    <h2>El cuidado comienza al quitarte la prenda.</h2>
                    <p>Déjala respirar, revisa su estado y sigue las indicaciones de la etiqueta. Ese pequeño momento evita lavados innecesarios y conserva textura, forma y color.</p>
                </div>
            </section>

            <section className="guide-grid" aria-label="Siete consejos para cuidar la ropa">
                {clothingTips.map(([number, title, description]) => (
                    <article className="guide-card" key={number}>
                        <span>{number}</span>
                        <h3>{title}</h3>
                        <p>{description}</p>
                    </article>
                ))}
            </section>

            <section className="guide-quote">
                <span aria-hidden="true">“</span>
                <p>El estilo más actual es aprender a valorar lo que ya forma parte de tu historia.</p>
            </section>
        </main>
    );
}

export default TipsR;
