import { Link } from "react-router-dom";

import Header from "../components/header/header";
import Home from "../components/home/home";
import Footer from "../components/footer/footer";
import fashionTipsImage from "../components/assets/img/tips/TipsRopa.png";
import beautyTipsImage from "../components/assets/img/tips/imgTipsMakeup.png";

import "../components/assets/css/Tips.css";

function Tips() {
    return (
        <div className="tips-page">
            <Header />
            <Home />

            <main>
                <section className="tips-hero" aria-labelledby="tips-title">
                    <div className="tips-hero-copy">
                        <span>Virtuosa Journal · 2026</span>
                        <h1 id="tips-title">Ideas para llevar tu estilo un poco más lejos.</h1>
                        <p>Guías honestas, inspiración útil y consejos para hacer de la moda y la belleza algo verdaderamente tuyo.</p>
                        <a href="#tips-editions">Explorar el journal <i className="fa-solid fa-arrow-down" aria-hidden="true" /></a>
                    </div>
                    <div className="tips-hero-art" aria-hidden="true">
                        <span>Style<br />notes</span>
                    </div>
                </section>

                <section className="tips-intro" id="tips-editions" aria-labelledby="tips-intro-title">
                    <span>Dos universos, una actitud</span>
                    <h2 id="tips-intro-title">Elige por dónde quieres empezar.</h2>
                    <p>Contenido breve, visual y fácil de aplicar a tu rutina diaria.</p>
                </section>

                <section className="tips-editions" aria-label="Categorías de consejos">
                    <article className="tips-edition">
                        <Link className="tips-edition-image" to="/VirtuosaCrud/tips/ropa">
                            <img src={fashionTipsImage} alt="" />
                            <span>01</span>
                        </Link>
                        <div className="tips-edition-copy">
                            <span>Fashion notes</span>
                            <h2>Vestir bien empieza por conocerte.</h2>
                            <p>Combinaciones, proporciones y pequeños recursos para construir looks con intención.</p>
                            <Link to="/VirtuosaCrud/tips/ropa">Leer tips de moda <i className="fa-solid fa-arrow-right" aria-hidden="true" /></Link>
                        </div>
                    </article>

                    <article className="tips-edition tips-edition-reverse">
                        <Link className="tips-edition-image" to="/VirtuosaCrud/tips/maquillaje">
                            <img src={beautyTipsImage} alt="" />
                            <span>02</span>
                        </Link>
                        <div className="tips-edition-copy">
                            <span>Beauty notes</span>
                            <h2>Tu rutina, pero más intuitiva.</h2>
                            <p>Técnicas, cuidado y color para aprovechar mejor cada producto sin complicarlo.</p>
                            <Link to="/VirtuosaCrud/tips/maquillaje">Leer tips de belleza <i className="fa-solid fa-arrow-right" aria-hidden="true" /></Link>
                        </div>
                    </article>
                </section>

                <section className="tips-closing">
                    <span aria-hidden="true">V</span>
                    <p>Las reglas inspiran. Tu criterio decide.</p>
                </section>
            </main>

            <Footer />
        </div>
    );
}

export default Tips;
