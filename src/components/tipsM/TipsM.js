import React from "react";
import ImgMakeup from "../assets/img/tips/imgTipsMakeup.png";
import ImgProducts from "../assets/img/tips/imgMakeupp.png";
import "./TipsM.css";

const beautyTips = [
    ["01", "Lejos de la humedad", "El baño no es el mejor lugar para tus cosméticos. Elige un espacio fresco, seco y protegido de la luz directa."],
    ["02", "Cierra cada fórmula", "Tapas y envases bien cerrados evitan que el producto se seque, se oxide o acumule polvo."],
    ["03", "Observa las señales", "Revisa el símbolo PAO del envase. Si cambia el olor, el color o la textura, es momento de reemplazarlo."],
    ["04", "Brochas siempre limpias", "Lava las herramientas con suavidad y déjalas secar en posición horizontal para proteger el pegamento y las cerdas."],
    ["05", "Tu maquillaje es personal", "No compartas productos que estén en contacto con ojos o labios. Es una regla sencilla que protege tu piel."],
];

function TipsMk() {
    return (
        <main className="beauty-guide">
            <section className="beauty-guide-hero">
                <div className="beauty-guide-visual">
                    <img src={ImgMakeup} alt="Maquillaje profesional en una sesión editorial" />
                    <span>Beauty file · 05</span>
                </div>
                <div className="beauty-guide-copy">
                    <span>Virtuosa Beauty · Guía 02</span>
                    <h1>Tu maquillaje, mejor cuidado.</h1>
                    <p>Cinco rituales para conservar tus favoritos, proteger tu piel y disfrutar cada fórmula por más tiempo.</p>
                    <a href="#beauty-notes">Leer beauty notes <i className="fa-solid fa-arrow-down" aria-hidden="true" /></a>
                </div>
            </section>

            <section className="beauty-guide-heading" id="beauty-notes">
                <span>Más orden, más intención</span>
                <h2>Una rutina limpia también se siente más bonita.</h2>
            </section>

            <section className="beauty-guide-layout">
                <div className="beauty-guide-sticky">
                    <img src={ImgProducts} alt="Selección de cosméticos en tonos cálidos" />
                    <p>Todo empieza con un espacio fresco, herramientas limpias y productos que todavía se sienten bien.</p>
                </div>
                <div className="beauty-guide-list">
                    {beautyTips.map(([number, title, description]) => (
                        <article key={number}>
                            <span>{number}</span>
                            <div>
                                <h3>{title}</h3>
                                <p>{description}</p>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            <section className="beauty-guide-note">
                <span>Nota de belleza</span>
                <p>No necesitas más productos. Necesitas conocer mejor los que ya tienes.</p>
            </section>
        </main>
    );
}

export default TipsMk;
