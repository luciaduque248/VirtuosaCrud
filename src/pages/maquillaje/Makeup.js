import { Link } from "react-router-dom";

import eyesImage from "../../components/assets/img/maquillaje/banner/ojos.png";
import lipsImage from "../../components/assets/img/maquillaje/banner/labios.png";
import skinImage from "../../components/assets/img/maquillaje/banner/piel.png";
import faceImage from "../../components/assets/img/maquillaje/banner/rostro.png";

import "./Maquillaje.css";

const beautyCategories = [
    { name: "Ojos", note: "Define tu mirada", description: "Sombras, máscaras y delineadores para crear desde lo sutil hasta lo inesperado.", image: eyesImage, to: "/VirtuosaCrud/ojos", number: "01" },
    { name: "Labios", note: "Tu color, tu firma", description: "Tonos y acabados que transforman un gesto en una declaración.", image: lipsImage, to: "/VirtuosaCrud/labios", number: "02" },
    { name: "Piel", note: "El ritual primero", description: "Cuidado, hidratación y preparación para una piel que se siente tan bien como luce.", image: skinImage, to: "/VirtuosaCrud/piel", number: "03" },
    { name: "Rostro", note: "Luz y dimensión", description: "Bases, rubores e iluminadores para realzar tus facciones sin ocultar quién eres.", image: faceImage, to: "/VirtuosaCrud/rostro", number: "04" },
];

function Makeup() {
    return (
        <main className="beauty-page">
            <section className="beauty-hero" aria-labelledby="beauty-title">
                <div className="beauty-hero-copy">
                    <span>Virtuosa Beauty · 2026</span>
                    <h1 id="beauty-title">El maquillaje no te cambia. Te revela.</h1>
                    <p>Una selección de color, textura y cuidado para explorar cada versión de ti.</p>
                    <a href="#beauty-categories">Descubrir categorías <i className="fa-solid fa-arrow-down" aria-hidden="true" /></a>
                </div>
                <div className="beauty-hero-image" role="img" aria-label="Editorial de maquillaje Virtuosa" />
                <span className="beauty-hero-index" aria-hidden="true">Beauty / 01</span>
            </section>

            <section className="beauty-intro" id="beauty-categories" aria-labelledby="beauty-categories-title">
                <span className="beauty-kicker">Tu ritual, a tu manera</span>
                <h2 id="beauty-categories-title">Empieza por lo que quieres expresar hoy.</h2>
                <p>Explora por categoría y encuentra productos pensados para combinar, experimentar y hacerlos tuyos.</p>
            </section>

            <section className="beauty-grid" aria-label="Categorías de maquillaje">
                {beautyCategories.map((category) => (
                    <article className="beauty-card" key={category.name}>
                        <Link to={category.to} aria-label={`Explorar productos para ${category.name}`}>
                            <img src={category.image} alt="" />
                            <span className="beauty-card-shade" aria-hidden="true" />
                            <span className="beauty-card-number">{category.number}</span>
                            <div className="beauty-card-copy">
                                <span>{category.note}</span>
                                <h2>{category.name}</h2>
                                <p>{category.description}</p>
                                <strong>Explorar <i className="fa-solid fa-arrow-right" aria-hidden="true" /></strong>
                            </div>
                        </Link>
                    </article>
                ))}
            </section>

            <section className="beauty-quote" aria-label="Mensaje de Virtuosa Beauty">
                <span aria-hidden="true">“</span>
                <p>La tendencia más poderosa sigue siendo sentirte tú.</p>
                <Link to="/VirtuosaCrud/tips/maquillaje">Descubre nuestros tips</Link>
            </section>
        </main>
    );
}

export default Makeup;
