import React from "react";
import { Link } from "react-router-dom";

import "./Maquillaje.css";

function Makeup() {
    return (
        <main className="makeup">
            {/* ===================================================
          BANNER
      =================================================== */}

            <section className="banner-MAKEUP">
                <div className="banner-MAKEUP-overlay">
                    <span className="makeup-eyebrow">
                        VIRTUOSA BEAUTY
                    </span>

                    <h1>
                        MAQUILLAJE
                    </h1>

                    <p>
                        Descubre productos para
                        resaltar cada parte de ti.
                    </p>
                </div>
            </section>

            {/* ===================================================
          CONTENIDO
      =================================================== */}

            <section className="contenido-makeup">
                <div className="makeup-heading">
                    <span>
                        Explora
                    </span>

                    <h2>
                        Tu espacio de belleza
                    </h2>

                    <p>
                        Elige una categoría y descubre
                        los productos disponibles en
                        nuestro catálogo.
                    </p>
                </div>

                {/* =================================================
            CATEGORÍAS
        ================================================= */}

                <div className="atajos-makeup">
                    {/* OJOS */}

                    <Link
                        to="/VirtuosaCrud/ojos"
                        className="atajo-makeup-card"
                    >
                        <div className="atajo-makeup-icon">
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/82/82832.png"
                                alt=""
                            />
                        </div>

                        <div className="atajo-makeup-content">
                            <span>
                                Maquillaje
                            </span>

                            <h3>
                                Ojos
                            </h3>

                            <p>
                                Sombras, máscaras y productos
                                para destacar tu mirada.
                            </p>

                            <strong>
                                Explorar →
                            </strong>
                        </div>
                    </Link>

                    {/* LABIOS */}

                    <Link
                        to="/VirtuosaCrud/labios"
                        className="atajo-makeup-card"
                    >
                        <div className="atajo-makeup-icon">
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/1024/1024505.png"
                                alt=""
                            />
                        </div>

                        <div className="atajo-makeup-content">
                            <span>
                                Maquillaje
                            </span>

                            <h3>
                                Labios
                            </h3>

                            <p>
                                Colores y acabados para
                                complementar cada estilo.
                            </p>

                            <strong>
                                Explorar →
                            </strong>
                        </div>
                    </Link>

                    {/* PIEL */}

                    <Link
                        to="/VirtuosaCrud/piel"
                        className="atajo-makeup-card"
                    >
                        <div className="atajo-makeup-icon">
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/1207/1207069.png"
                                alt=""
                            />
                        </div>

                        <div className="atajo-makeup-content">
                            <span>
                                Cuidado
                            </span>

                            <h3>
                                Piel
                            </h3>

                            <p>
                                Productos para cuidar,
                                hidratar y preparar tu piel.
                            </p>

                            <strong>
                                Explorar →
                            </strong>
                        </div>
                    </Link>

                    {/* ROSTRO */}

                    <Link
                        to="/VirtuosaCrud/rostro"
                        className="atajo-makeup-card"
                    >
                        <div className="atajo-makeup-icon">
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/5731/5731856.png"
                                alt=""
                            />
                        </div>

                        <div className="atajo-makeup-content">
                            <span>
                                Maquillaje
                            </span>

                            <h3>
                                Rostro
                            </h3>

                            <p>
                                Bases, rubores y productos
                                para realzar tus facciones.
                            </p>

                            <strong>
                                Explorar →
                            </strong>
                        </div>
                    </Link>
                </div>
            </section>
        </main>
    );
}

export default Makeup;