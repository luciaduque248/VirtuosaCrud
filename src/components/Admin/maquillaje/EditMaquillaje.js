import React from "react";

import {
    Link,
} from "react-router-dom";

import NavbarAdmin from "../navbar/NavbarAdmin";

import "../products/AdminProducts.css";

function EditMaquillaje() {
    return (
        <div className="admin-products-page">
            <NavbarAdmin />

            <main className="admin-category-hub">
                <span className="admin-product-category">
                    Administración
                </span>

                <h1>
                    Maquillaje
                </h1>

                <p>
                    Selecciona la categoría
                    que deseas administrar.
                </p>

                <section className="admin-category-grid">
                    <Link
                        to="/VirtuosaCrud/edit-ojos"
                        className="admin-category-card"
                    >
                        <i className="fa-solid fa-eye" />

                        <strong>
                            Ojos
                        </strong>

                        <span>
                            Sombras, paletas y máscaras
                        </span>
                    </Link>

                    <Link
                        to="/VirtuosaCrud/edit-labios"
                        className="admin-category-card"
                    >
                        <i className="fa-solid fa-wand-magic-sparkles" />

                        <strong>
                            Labios
                        </strong>

                        <span>
                            Labiales y productos para labios
                        </span>
                    </Link>

                    <Link
                        to="/VirtuosaCrud/edit-rostro"
                        className="admin-category-card"
                    >
                        <i className="fa-solid fa-face-smile" />

                        <strong>
                            Rostro
                        </strong>

                        <span>
                            Bases, rubores y contorno
                        </span>
                    </Link>

                    <Link
                        to="/VirtuosaCrud/edit-cuidadodelapiel"
                        className="admin-category-card"
                    >
                        <i className="fa-solid fa-spa" />

                        <strong>
                            Cuidado de la piel
                        </strong>

                        <span>
                            Skin care y tratamientos
                        </span>
                    </Link>
                </section>
            </main>
        </div>
    );
}

export default EditMaquillaje;