import React, {
    useEffect,
    useState,
} from "react";

import axios from "axios";

import Footer from "../../components/footer/footer";
import Home from "../../components/home/home";
import Header from "../../components/header/header";

import "../../../src/components/assets/css/Vestidos.css";

import { api } from "../../utils/peticiones";

function Vestidos() {
    const [vestidos, setVestidos] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    const [
        productoSeleccionado,
        setProductoSeleccionado,
    ] = useState(null);

    /* =========================================================
       CARGAR PRODUCTOS DESDE POSTGRESQL
    ========================================================= */

    useEffect(() => {
        const cargarVestidos =
            async () => {
                try {
                    setLoading(true);
                    setError("");

                    const response =
                        await axios.get(api);

                    setVestidos(
                        response.data.data ||
                        []
                    );
                } catch (error) {
                    console.error(
                        "Error cargando vestidos:",
                        error
                    );

                    setError(
                        "No fue posible cargar los productos."
                    );
                } finally {
                    setLoading(false);
                }
            };

        cargarVestidos();
    }, []);

    /* =========================================================
       PRECIO
    ========================================================= */

    const formatoPrecio = (
        precio
    ) => {
        const numero =
            Number(precio);

        return numero.toLocaleString(
            "es-CO",
            {
                style: "currency",
                currency: "COP",
                minimumFractionDigits: 0,
            }
        );
    };

    /* =========================================================
       RENDER
    ========================================================= */

    return (
        <div>
            <Header />

            <Home />

            {/* =====================================================
          HERO
      ===================================================== */}

            <section className="viste-a-la-moda">
                <h1>
                    VISTE A LA MODA
                </h1>
            </section>

            {/* =====================================================
          PRODUCTOS
      ===================================================== */}

            <main className="contenedor">
                <h1>Vestidos</h1>

                <p
                    style={{
                        marginBottom:
                            "2rem",
                        color: "#666",
                    }}
                >
                    Descubre nuestra
                    selección de vestidos
                    Virtuosa.
                </p>

                {/* ===================================================
            FILTROS VISUALES
        =================================================== */}

                <div className="container">
                    <div className="boton1">
                        <select
                            name="corte"
                            defaultValue="0"
                        >
                            <option value="0">
                                Corte
                            </option>

                            <option value="1">
                                Corto
                            </option>

                            <option value="2">
                                Semicorto
                            </option>

                            <option value="3">
                                Largo
                            </option>
                        </select>

                        <select
                            name="talla"
                            defaultValue="0"
                        >
                            <option value="0">
                                Talla
                            </option>

                            <option value="1">
                                XXS
                            </option>

                            <option value="2">
                                XS
                            </option>

                            <option value="3">
                                S
                            </option>

                            <option value="4">
                                M
                            </option>

                            <option value="5">
                                L
                            </option>

                            <option value="6">
                                XL
                            </option>

                            <option value="7">
                                XXL
                            </option>
                        </select>

                        <select
                            name="ocasion"
                            defaultValue="0"
                        >
                            <option value="0">
                                Ocasión
                            </option>

                            <option value="1">
                                Casual
                            </option>

                            <option value="2">
                                Noche
                            </option>

                            <option value="3">
                                Gala
                            </option>

                            <option value="4">
                                Work
                            </option>
                        </select>

                        <select
                            name="color"
                            defaultValue="0"
                        >
                            <option value="0">
                                Color
                            </option>

                            <option value="1">
                                Rojo
                            </option>

                            <option value="2">
                                Blanco
                            </option>

                            <option value="3">
                                Negro
                            </option>

                            <option value="4">
                                Morado
                            </option>

                            <option value="5">
                                Lila
                            </option>
                        </select>
                    </div>

                    <div className="boton2">
                        <select
                            name="popularidad"
                            className="popularidad"
                            defaultValue="0"
                        >
                            <option value="0">
                                Ordenar por
                            </option>

                            <option value="1">
                                Popularidad
                            </option>

                            <option value="2">
                                Precio: menor a
                                mayor
                            </option>

                            <option value="3">
                                Precio: mayor a
                                menor
                            </option>

                            <option value="4">
                                Novedades
                            </option>
                        </select>
                    </div>
                </div>

                {/* ===================================================
            LOADING
        =================================================== */}

                {loading && (
                    <div
                        style={{
                            padding: "4rem",
                            textAlign:
                                "center",
                        }}
                    >
                        <h2>
                            Cargando productos...
                        </h2>
                    </div>
                )}

                {/* ===================================================
            ERROR
        =================================================== */}

                {!loading &&
                    error && (
                        <div
                            style={{
                                padding: "3rem",
                                textAlign:
                                    "center",
                                color:
                                    "#9c2b48",
                            }}
                        >
                            <h2>
                                {error}
                            </h2>

                            <p>
                                Verifica que la API
                                esté ejecutándose en
                                el puerto 4000.
                            </p>
                        </div>
                    )}

                {/* ===================================================
            SIN PRODUCTOS
        =================================================== */}

                {!loading &&
                    !error &&
                    vestidos.length ===
                    0 && (
                        <div
                            style={{
                                padding: "4rem",
                                textAlign:
                                    "center",
                            }}
                        >
                            <h2>
                                No hay vestidos
                                disponibles.
                            </h2>
                        </div>
                    )}

                {/* ===================================================
            GRID
        =================================================== */}

                {!loading &&
                    !error &&
                    vestidos.length >
                    0 && (
                        <div className="container2">
                            {vestidos.map(
                                (
                                    vestido
                                ) => (
                                    <article
                                        className="card"
                                        key={
                                            vestido.id
                                        }
                                    >
                                        {/* Imagen */}

                                        <div className="venta1">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setProductoSeleccionado(
                                                        vestido
                                                    )
                                                }
                                                style={{
                                                    border:
                                                        "none",
                                                    padding: 0,
                                                    background:
                                                        "transparent",
                                                    width:
                                                        "100%",
                                                    cursor:
                                                        "pointer",
                                                }}
                                            >
                                                <img
                                                    src={
                                                        vestido.image_url
                                                    }
                                                    alt={
                                                        vestido.name
                                                    }
                                                />
                                            </button>
                                        </div>

                                        {/* Información */}

                                        <div className="text-card">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setProductoSeleccionado(
                                                        vestido
                                                    )
                                                }
                                                style={{
                                                    border:
                                                        "none",
                                                    background:
                                                        "transparent",
                                                    width:
                                                        "100%",
                                                    cursor:
                                                        "pointer",
                                                }}
                                            >
                                                <h4>
                                                    {
                                                        vestido.name
                                                    }
                                                </h4>
                                            </button>

                                            <p>
                                                {formatoPrecio(
                                                    vestido.price
                                                )}
                                            </p>

                                            <div className="select-icon">
                                                <select
                                                    name={`cantidad-${vestido.id}`}
                                                    defaultValue="1"
                                                >
                                                    <option value="1">
                                                        1
                                                    </option>

                                                    <option value="2">
                                                        2
                                                    </option>

                                                    <option value="3">
                                                        3
                                                    </option>

                                                    <option value="4">
                                                        4
                                                    </option>

                                                    <option value="5">
                                                        5
                                                    </option>
                                                </select>

                                                <span
                                                    style={{
                                                        marginLeft:
                                                            "1rem",
                                                    }}
                                                >
                                                    Stock:{" "}
                                                    {
                                                        vestido.stock
                                                    }
                                                </span>
                                            </div>
                                        </div>
                                    </article>
                                )
                            )}
                        </div>
                    )}
            </main>

            {/* =====================================================
          MODAL
      ===================================================== */}

            {productoSeleccionado && (
                <div
                    className="modal"
                    style={{
                        opacity: 1,
                        pointerEvents:
                            "auto",
                        zIndex: 1000,
                    }}
                    onClick={() =>
                        setProductoSeleccionado(
                            null
                        )
                    }
                >
                    <button
                        type="button"
                        className="close"
                        onClick={() =>
                            setProductoSeleccionado(
                                null
                            )
                        }
                    >
                        X
                    </button>

                    <div
                        className="modalContainer"
                        onClick={(event) =>
                            event.stopPropagation()
                        }
                    >
                        <figure className="modalPicture">
                            <img
                                src={
                                    productoSeleccionado.image_url
                                }
                                alt={
                                    productoSeleccionado.name
                                }
                            />
                        </figure>

                        <section className="modalTEXT">
                            <h2 className="modalTitle">
                                {
                                    productoSeleccionado.name
                                }
                            </h2>

                            <p className="modalP">
                                {
                                    productoSeleccionado.description
                                }
                            </p>

                            <div className="charact">
                                <ul>
                                    <li>
                                        Stock disponible:{" "}
                                        {
                                            productoSeleccionado.stock
                                        }
                                    </li>

                                    <li>
                                        Categoría:{" "}
                                        {
                                            productoSeleccionado.category_name
                                        }
                                    </li>

                                    <li>
                                        Precio:{" "}
                                        {formatoPrecio(
                                            productoSeleccionado.price
                                        )}
                                    </li>
                                </ul>
                            </div>

                            <div className="select-icon">
                                <select
                                    name="talla"
                                    defaultValue="M"
                                >
                                    <option value="XS">
                                        XS
                                    </option>

                                    <option value="S">
                                        S
                                    </option>

                                    <option value="M">
                                        M
                                    </option>

                                    <option value="L">
                                        L
                                    </option>

                                    <option value="XL">
                                        XL
                                    </option>
                                </select>

                                <select
                                    name="cantidad"
                                    defaultValue="1"
                                >
                                    <option value="1">
                                        1
                                    </option>

                                    <option value="2">
                                        2
                                    </option>

                                    <option value="3">
                                        3
                                    </option>

                                    <option value="4">
                                        4
                                    </option>

                                    <option value="5">
                                        5
                                    </option>
                                </select>
                            </div>
                        </section>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
}

export default Vestidos;