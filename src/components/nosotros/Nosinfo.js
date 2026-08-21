import { Link } from "react-router-dom";

const principles = [
    { number: "01", title: "Experiencia simple", text: "Optimizamos cada paso para que descubrir, elegir y comprar se sienta natural." },
    { number: "02", title: "Calidad con criterio", text: "Cada producto debe superar nuestros filtros antes de entrar al universo Virtuosa." },
    { number: "03", title: "Estilo accesible", text: "Creemos que sentirte bien con lo que eliges no debería estar fuera de tu alcance." },
];

function Nosinfo() {
    return (
        <>
            <section className="about-story" id="about-story" aria-labelledby="about-story-title">
                <span className="about-story-index">Nuestra historia / 01</span>
                <div className="about-story-heading">
                    <span>Una idea que sigue evolucionando</span>
                    <h2 id="about-story-title">La puerta digital a un mundo que vale la pena conocer.</h2>
                </div>
                <div className="about-story-text">
                    <p>Virtuosa es una tienda de belleza y moda creada para comprar desde cualquier lugar, a cualquier hora, con acompañamiento real para tomar mejores decisiones.</p>
                    <p>Nacimos el 18 de agosto de 2017 en Bogotá, cuando una pareja de emprendedores decidió redefinir la compra digital: menos distancia, más confianza y una selección con propósito.</p>
                </div>
            </section>

            <section className="about-manifesto" aria-labelledby="about-manifesto-title">
                <div className="about-manifesto-copy">
                    <span>Manifiesto Virtuosa</span>
                    <h2 id="about-manifesto-title">No creemos en una única forma de ser bella.</h2>
                    <p>Creemos en darte herramientas, inspiración y libertad para descubrir la tuya.</p>
                </div>
                <div className="about-manifesto-image" role="img" aria-label="Mujer expresando su estilo personal" />
            </section>

            <section className="about-principles" aria-labelledby="about-principles-title">
                <div className="about-principles-heading">
                    <span>Lo que nos mueve</span>
                    <h2 id="about-principles-title">Tres principios. Una forma de hacer las cosas.</h2>
                </div>
                <div className="about-principles-grid">
                    {principles.map((principle) => (
                        <article key={principle.number}>
                            <span>{principle.number}</span>
                            <h3>{principle.title}</h3>
                            <p>{principle.text}</p>
                        </article>
                    ))}
                </div>
            </section>

            <section className="about-cta">
                <span aria-hidden="true">V</span>
                <div>
                    <p>Ahora que nos conoces, descubre lo que elegimos para ti.</p>
                    <Link to="/VirtuosaCrud/maquillaje">Explorar Virtuosa <i className="fa-solid fa-arrow-right" aria-hidden="true" /></Link>
                </div>
            </section>
        </>
    );
}

export default Nosinfo;
