import React, {
    useEffect,
    useMemo,
    useState,
} from "react";

import axios from "axios";

import Footer from "../../../components/footer/footer";
import Header from "../../../components/header/header";
import Home from "../../../components/home/home";

import {
    apilabios,
} from "../../../utils/peticiones";

import "./labiosC.css";

/* =========================================================
   LABIOS
========================================================= */

function Labios() {
    /* =======================================================
       STATES
    ======================================================= */

    const [
        productos,
        setProductos,
    ] = useState([]);

    const [
        loading,
        setLoading,
    ] = useState(true);

    const [
        error,
        setError,
    ] = useState("");

    const [
        productoSeleccionado,
        setProductoSeleccionado,
    ] = useState(null);

    const [
        busqueda,
        setBusqueda,
    ] = useState("");

    const [
        orden,
        setOrden,
    ] = useState("featured");

    const [
        disponibilidad,
        setDisponibilidad,
    ] = useState("todos");

    const [
        mensajeCarrito,
        setMensajeCarrito,
    ] = useState("");

    /* =======================================================
       CARGAR PRODUCTOS
    ======================================================= */

    const cargarProductos =
        async () => {
            try {
                setLoading(true);
                setError("");

                const response =
                    await axios.get(
                        apilabios
                    );

                const data =
                    response?.data?.data;

                if (
                    !Array.isArray(data)
                ) {
                    throw new Error(
                        "La API no devolvió una lista válida de productos."
                    );
                }

                setProductos(data);
            } catch (err) {
                console.error(
                    "Error cargando productos para labios:",
                    err
                );

                setError(
                    "No fue posible cargar los productos de labios. Verifica que la API de Virtuosa esté funcionando."
                );
            } finally {
                setLoading(false);
            }
        };

    useEffect(() => {
        cargarProductos();
    }, []);

    /* =======================================================
       BLOQUEAR SCROLL CON MODAL
    ======================================================= */

    useEffect(() => {
        if (
            productoSeleccionado
        ) {
            document.body.style.overflow =
                "hidden";
        } else {
            document.body.style.overflow =
                "";
        }

        return () => {
            document.body.style.overflow =
                "";
        };
    }, [
        productoSeleccionado,
    ]);

    /* =======================================================
       CERRAR CON ESC
    ======================================================= */

    useEffect(() => {
        const handleEscape = (
            event
        ) => {
            if (
                event.key ===
                "Escape"
            ) {
                setProductoSeleccionado(
                    null
                );

                setMensajeCarrito(
                    ""
                );
            }
        };

        window.addEventListener(
            "keydown",
            handleEscape
        );

        return () => {
            window.removeEventListener(
                "keydown",
                handleEscape
            );
        };
    }, []);

    /* =======================================================
       PRECIO
    ======================================================= */

    const formatoPrecio = (
        precio
    ) => {
        const numero =
            Number(precio);

        if (
            Number.isNaN(numero)
        ) {
            return "$ 0";
        }

        return numero.toLocaleString(
            "es-CO",
            {
                style:
                    "currency",
                currency:
                    "COP",
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
            }
        );
    };

    /* =======================================================
       FILTRAR Y ORDENAR
    ======================================================= */

    const productosFiltrados =
        useMemo(() => {
            let resultado = [
                ...productos,
            ];

            const texto =
                busqueda
                    .trim()
                    .toLowerCase();

            /* Búsqueda */

            if (texto) {
                resultado =
                    resultado.filter(
                        (
                            producto
                        ) => {
                            const nombre =
                                producto.name
                                    ?.toLowerCase() ||
                                "";

                            const descripcion =
                                producto.description
                                    ?.toLowerCase() ||
                                "";

                            return (
                                nombre.includes(
                                    texto
                                ) ||
                                descripcion.includes(
                                    texto
                                )
                            );
                        }
                    );
            }

            /* Stock */

            if (
                disponibilidad ===
                "disponibles"
            ) {
                resultado =
                    resultado.filter(
                        (
                            producto
                        ) =>
                            Number(
                                producto.stock
                            ) > 0
                    );
            }

            /* Orden */

            switch (orden) {
                case "price-asc":
                    resultado.sort(
                        (a, b) =>
                            Number(
                                a.price
                            ) -
                            Number(
                                b.price
                            )
                    );
                    break;

                case "price-desc":
                    resultado.sort(
                        (a, b) =>
                            Number(
                                b.price
                            ) -
                            Number(
                                a.price
                            )
                    );
                    break;

                case "name":
                    resultado.sort(
                        (a, b) =>
                            a.name.localeCompare(
                                b.name,
                                "es"
                            )
                    );
                    break;

                case "featured":
                default:
                    resultado.sort(
                        (a, b) =>
                            Number(
                                b.featured
                            ) -
                            Number(
                                a.featured
                            )
                    );
                    break;
            }

            return resultado;
        }, [
            productos,
            busqueda,
            orden,
            disponibilidad,
        ]);

    /* =======================================================
       MODAL
    ======================================================= */

    const abrirProducto = (
        producto
    ) => {
        setProductoSeleccionado(
            producto
        );

        setMensajeCarrito("");
    };

    const cerrarProducto =
        () => {
            setProductoSeleccionado(
                null
            );

            setMensajeCarrito("");
        };

    /* =======================================================
       CARRITO
    ======================================================= */

    const agregarAlCarrito =
        () => {
            setMensajeCarrito(
                "Producto preparado para el carrito. Implementaremos el carrito completo en una fase posterior."
            );
        };

    /* =======================================================
       RENDER
    ======================================================= */

    return (
        <div className="labios-page">
            <Header />

            <Home />

            {/* ===================================================
          HERO
      =================================================== */}

            <section className="labios-hero">
                <div className="labios-hero-overlay">
                    <div className="labios-hero-content">
                        <span className="labios-eyebrow">
                            VIRTUOSA BEAUTY
                        </span>

                        <h1>
                            Color que
                            habla por ti
                        </h1>

                        <p>
                            Labiales y
                            productos para
                            labios diseñados
                            para complementar
                            cada estilo.
                        </p>

                        <a
                            href="#catalogo-labios"
                            className="labios-hero-button"
                        >
                            Explorar colección
                        </a>
                    </div>
                </div>
            </section>

            {/* ===================================================
          CATÁLOGO
      =================================================== */}

            <main
                className="labios-main"
                id="catalogo-labios"
            >
                {/* Encabezado */}

                <div className="labios-heading">
                    <span>
                        Maquillaje
                    </span>

                    <h2>
                        Labios
                    </h2>

                    <p>
                        Descubre tonos,
                        acabados y productos
                        seleccionados de la
                        colección Virtuosa
                        Beauty.
                    </p>
                </div>

                {/* =================================================
            TOOLBAR
        ================================================= */}

                <section className="labios-toolbar">
                    {/* Buscador */}

                    <div className="labios-search">
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.8"
                                d="m21 21-4.35-4.35m2.1-5.4a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z"
                            />
                        </svg>

                        <input
                            type="search"
                            placeholder="Buscar labial..."
                            value={
                                busqueda
                            }
                            onChange={(
                                event
                            ) =>
                                setBusqueda(
                                    event
                                        .target
                                        .value
                                )
                            }
                        />
                    </div>

                    {/* Filtros */}

                    <div className="labios-filters">
                        <select
                            value={
                                disponibilidad
                            }
                            onChange={(
                                event
                            ) =>
                                setDisponibilidad(
                                    event
                                        .target
                                        .value
                                )
                            }
                            aria-label="Disponibilidad"
                        >
                            <option value="todos">
                                Todos
                            </option>

                            <option value="disponibles">
                                Con stock
                            </option>
                        </select>

                        <select
                            value={orden}
                            onChange={(
                                event
                            ) =>
                                setOrden(
                                    event
                                        .target
                                        .value
                                )
                            }
                            aria-label="Ordenar productos"
                        >
                            <option value="featured">
                                Destacados
                            </option>

                            <option value="price-asc">
                                Precio: menor
                                a mayor
                            </option>

                            <option value="price-desc">
                                Precio: mayor
                                a menor
                            </option>

                            <option value="name">
                                Nombre A-Z
                            </option>
                        </select>
                    </div>
                </section>

                {/* Resultados */}

                {!loading &&
                    !error && (
                        <div className="labios-results">
                            <p>
                                {
                                    productosFiltrados.length
                                }{" "}
                                {productosFiltrados.length ===
                                    1
                                    ? "producto"
                                    : "productos"}
                            </p>
                        </div>
                    )}

                {/* =================================================
            LOADING
        ================================================= */}

                {loading && (
                    <section className="labios-status">
                        <div className="labios-loader" />

                        <h3>
                            Cargando productos
                        </h3>

                        <p>
                            Consultando el
                            catálogo de
                            Virtuosa.
                        </p>
                    </section>
                )}

                {/* =================================================
            ERROR
        ================================================= */}

                {!loading &&
                    error && (
                        <section className="labios-status">
                            <div className="labios-status-icon">
                                !
                            </div>

                            <h3>
                                No pudimos cargar
                                los productos
                            </h3>

                            <p>
                                {error}
                            </p>

                            <button
                                type="button"
                                onClick={
                                    cargarProductos
                                }
                            >
                                Intentar
                                nuevamente
                            </button>
                        </section>
                    )}

                {/* =================================================
            SIN RESULTADOS
        ================================================= */}

                {!loading &&
                    !error &&
                    productosFiltrados.length ===
                    0 && (
                        <section className="labios-status">
                            <div className="labios-status-icon">
                                ♡
                            </div>

                            <h3>
                                No encontramos
                                productos
                            </h3>

                            <p>
                                Cambia los
                                filtros o intenta
                                con otro término.
                            </p>

                            <button
                                type="button"
                                onClick={() => {
                                    setBusqueda("");

                                    setOrden(
                                        "featured"
                                    );

                                    setDisponibilidad(
                                        "todos"
                                    );
                                }}
                            >
                                Limpiar filtros
                            </button>
                        </section>
                    )}

                {/* =================================================
            PRODUCTOS
        ================================================= */}

                {!loading &&
                    !error &&
                    productosFiltrados.length >
                    0 && (
                        <section className="labios-grid">
                            {productosFiltrados.map(
                                (
                                    producto
                                ) => {
                                    const stock =
                                        Number(
                                            producto.stock
                                        );

                                    const agotado =
                                        stock <= 0;

                                    return (
                                        <article
                                            className="labios-card"
                                            key={
                                                producto.id
                                            }
                                        >
                                            {/* Imagen */}

                                            <div className="labios-card-image">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        abrirProducto(
                                                            producto
                                                        )
                                                    }
                                                    aria-label={`Ver ${producto.name}`}
                                                >
                                                    <img
                                                        src={
                                                            producto.image_url
                                                        }
                                                        alt={
                                                            producto.name
                                                        }
                                                        loading="lazy"
                                                        onError={(
                                                            event
                                                        ) => {
                                                            event.currentTarget.src =
                                                                "https://placehold.co/800x800/f8e9ed/8d4b5d?text=Virtuosa+Beauty";
                                                        }}
                                                    />
                                                </button>

                                                {producto.featured && (
                                                    <span className="labios-featured-badge">
                                                        Favorito
                                                    </span>
                                                )}

                                                {agotado && (
                                                    <span className="labios-out-badge">
                                                        Agotado
                                                    </span>
                                                )}
                                            </div>

                                            {/* Contenido */}

                                            <div className="labios-card-body">
                                                <span className="labios-card-category">
                                                    Beauty ·
                                                    Labios
                                                </span>

                                                <div className="labios-card-title">
                                                    <h3>
                                                        {
                                                            producto.name
                                                        }
                                                    </h3>

                                                    <button
                                                        type="button"
                                                        className="labios-favorite"
                                                        aria-label="Agregar a favoritos"
                                                    >
                                                        ♡
                                                    </button>
                                                </div>

                                                <p className="labios-card-description">
                                                    {producto.description ||
                                                        "Producto de la colección Virtuosa Beauty."}
                                                </p>

                                                <div className="labios-card-footer">
                                                    <div className="labios-card-price">
                                                        <strong>
                                                            {formatoPrecio(
                                                                producto.price
                                                            )}
                                                        </strong>

                                                        <span
                                                            className={
                                                                agotado
                                                                    ? "agotado"
                                                                    : ""
                                                            }
                                                        >
                                                            {agotado
                                                                ? "Sin stock"
                                                                : `${stock} disponibles`}
                                                        </span>
                                                    </div>

                                                    <button
                                                        type="button"
                                                        className="labios-view-button"
                                                        onClick={() =>
                                                            abrirProducto(
                                                                producto
                                                            )
                                                        }
                                                    >
                                                        Ver producto
                                                    </button>
                                                </div>
                                            </div>
                                        </article>
                                    );
                                }
                            )}
                        </section>
                    )}
            </main>

            {/* ===================================================
          MODAL
      =================================================== */}

            {productoSeleccionado && (
                <div
                    className="labios-modal-overlay"
                    onClick={
                        cerrarProducto
                    }
                    role="presentation"
                >
                    <article
                        className="labios-modal"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="labios-modal-title"
                        onClick={(
                            event
                        ) =>
                            event.stopPropagation()
                        }
                    >
                        {/* Cerrar */}

                        <button
                            type="button"
                            className="labios-modal-close"
                            onClick={
                                cerrarProducto
                            }
                            aria-label="Cerrar producto"
                        >
                            ×
                        </button>

                        {/* Imagen */}

                        <div className="labios-modal-image">
                            <img
                                src={
                                    productoSeleccionado.image_url
                                }
                                alt={
                                    productoSeleccionado.name
                                }
                                onError={(
                                    event
                                ) => {
                                    event.currentTarget.src =
                                        "https://placehold.co/800x800/f8e9ed/8d4b5d?text=Virtuosa+Beauty";
                                }}
                            />

                            {productoSeleccionado.featured && (
                                <span className="labios-modal-featured">
                                    Favorito
                                </span>
                            )}
                        </div>

                        {/* Información */}

                        <div className="labios-modal-content">
                            <span className="labios-modal-category">
                                {
                                    productoSeleccionado.category_name
                                }{" "}
                                · Labios
                            </span>

                            <h2 id="labios-modal-title">
                                {
                                    productoSeleccionado.name
                                }
                            </h2>

                            <strong className="labios-modal-price">
                                {formatoPrecio(
                                    productoSeleccionado.price
                                )}
                            </strong>

                            <p className="labios-modal-description">
                                {productoSeleccionado.description ||
                                    "Producto de la colección Virtuosa Beauty."}
                            </p>

                            {/* Info */}

                            <div className="labios-modal-info">
                                <div>
                                    <span>
                                        Disponibilidad
                                    </span>

                                    <strong>
                                        {Number(
                                            productoSeleccionado.stock
                                        ) > 0
                                            ? `${productoSeleccionado.stock} unidades`
                                            : "Agotado"}
                                    </strong>
                                </div>

                                <div>
                                    <span>
                                        Categoría
                                    </span>

                                    <strong>
                                        Labios
                                    </strong>
                                </div>
                            </div>

                            {/* Cantidad */}

                            <div className="labios-modal-field">
                                <label htmlFor="labios-cantidad">
                                    Cantidad
                                </label>

                                <select
                                    id="labios-cantidad"
                                    defaultValue="1"
                                    disabled={
                                        Number(
                                            productoSeleccionado.stock
                                        ) <= 0
                                    }
                                >
                                    {Array.from(
                                        {
                                            length:
                                                Math.min(
                                                    Math.max(
                                                        Number(
                                                            productoSeleccionado.stock
                                                        ),
                                                        1
                                                    ),
                                                    5
                                                ),
                                        },
                                        (
                                            _,
                                            index
                                        ) =>
                                            index +
                                            1
                                    ).map(
                                        (
                                            cantidad
                                        ) => (
                                            <option
                                                key={
                                                    cantidad
                                                }
                                                value={
                                                    cantidad
                                                }
                                            >
                                                {
                                                    cantidad
                                                }
                                            </option>
                                        )
                                    )}
                                </select>
                            </div>

                            {/* CTA */}

                            <button
                                type="button"
                                className="labios-add-button"
                                disabled={
                                    Number(
                                        productoSeleccionado.stock
                                    ) <= 0
                                }
                                onClick={
                                    agregarAlCarrito
                                }
                            >
                                {Number(
                                    productoSeleccionado.stock
                                ) > 0
                                    ? "Agregar al carrito"
                                    : "Producto agotado"}
                            </button>

                            {mensajeCarrito && (
                                <div className="labios-cart-message">
                                    {
                                        mensajeCarrito
                                    }
                                </div>
                            )}
                        </div>
                    </article>
                </div>
            )}

            <Footer />
        </div>
    );
}

export default Labios;