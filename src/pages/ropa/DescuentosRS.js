import React, {
    useEffect,
    useMemo,
    useState,
} from "react";

import axios from "axios";

import Footer from "../../components/footer/footer";
import Home from "../../components/home/home";
import Header from "../../components/header/header";

import "../../components/assets/css/Descuentos.css";

import {
    apidiscount,
} from "../../utils/peticiones";

/* =========================================================
   DESCUENTOS
========================================================= */

function Descuentos() {
    /* =======================================================
       STATES
    ======================================================= */

    const [
        descuentos,
        setDescuentos,
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
    ] = useState(
        "featured"
    );

    const [
        disponibilidad,
        setDisponibilidad,
    ] = useState(
        "todos"
    );

    const [
        mensajeCarrito,
        setMensajeCarrito,
    ] = useState("");

    /* =======================================================
       CARGAR PRODUCTOS
    ======================================================= */

    const cargarDescuentos =
        async () => {
            try {
                setLoading(true);
                setError("");

                const response =
                    await axios.get(
                        apidiscount
                    );

                const productos =
                    response?.data
                        ?.data;

                if (
                    !Array.isArray(
                        productos
                    )
                ) {
                    throw new Error(
                        "La API no devolvió una lista válida."
                    );
                }

                setDescuentos(
                    productos
                );
            } catch (err) {
                console.error(
                    "Error cargando descuentos:",
                    err
                );

                setError(
                    "No fue posible cargar los productos en promoción. Verifica que la API de Virtuosa esté ejecutándose."
                );
            } finally {
                setLoading(
                    false
                );
            }
        };

    useEffect(() => {
        cargarDescuentos();
    }, []);

    /* =======================================================
       MODAL - BLOQUEAR SCROLL
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
       CERRAR MODAL CON ESC
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
            Number.isNaN(
                numero
            )
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
       FILTRAR / ORDENAR
    ======================================================= */

    const productosFiltrados =
        useMemo(() => {
            let resultado = [
                ...descuentos,
            ];

            /* Búsqueda */

            const texto =
                busqueda
                    .trim()
                    .toLowerCase();

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

            /* Disponibilidad */

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

            /* Ordenamiento */

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
            descuentos,
            busqueda,
            disponibilidad,
            orden,
        ]);

    /* =======================================================
       ABRIR PRODUCTO
    ======================================================= */

    const abrirProducto = (
        producto
    ) => {
        setProductoSeleccionado(
            producto
        );

        setMensajeCarrito(
            ""
        );
    };

    /* =======================================================
       CERRAR PRODUCTO
    ======================================================= */

    const cerrarProducto =
        () => {
            setProductoSeleccionado(
                null
            );

            setMensajeCarrito(
                ""
            );
        };

    /* =======================================================
       SIMULACIÓN CARRITO
    ======================================================= */

    const agregarAlCarrito =
        () => {
            setMensajeCarrito(
                "Producto listo para el carrito. La integración del carrito se implementará en la siguiente fase."
            );
        };

    /* =======================================================
       RENDER
    ======================================================= */

    return (
        <div className="descuentos-page">
            <Header />

            <Home />

            {/* ===================================================
          HERO
      =================================================== */}

            <section className="descuentos-hero">
                <div className="descuentos-hero-overlay">
                    <div className="descuentos-hero-content">
                        <span className="descuentos-eyebrow">
                            VIRTUOSA ·
                            SALE
                        </span>

                        <h1>
                            Special
                            Sale
                        </h1>

                        <p>
                            Descubre una
                            selección de
                            prendas con
                            precios
                            especiales y
                            unidades
                            limitadas.
                        </p>

                        <a
                            href="#catalogo-descuentos"
                            className="descuentos-hero-button"
                        >
                            Ver
                            promociones
                        </a>
                    </div>
                </div>
            </section>

            {/* ===================================================
          CATÁLOGO
      =================================================== */}

            <main
                className="descuentos-main"
                id="catalogo-descuentos"
            >
                {/* Header */}

                <div className="descuentos-heading">
                    <span>
                        Sale
                    </span>

                    <h2>
                        Descuentos
                    </h2>

                    <p>
                        Encuentra
                        productos de
                        temporada y
                        promociones
                        disponibles
                        directamente
                        desde el catálogo
                        de Virtuosa.
                    </p>
                </div>

                {/* =================================================
            TOOLBAR
        ================================================= */}

                <section className="descuentos-toolbar">
                    <div className="descuentos-search">
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
                            placeholder="Buscar promoción..."
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

                    <div className="descuentos-filters">
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
                            aria-label="Filtrar disponibilidad"
                        >
                            <option value="todos">
                                Todos
                            </option>

                            <option value="disponibles">
                                Con stock
                            </option>
                        </select>

                        <select
                            value={
                                orden
                            }
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
                        <div className="descuentos-results">
                            <p>
                                {
                                    productosFiltrados.length
                                }{" "}
                                {productosFiltrados.length ===
                                    1
                                    ? "producto"
                                    : "productos"}{" "}
                                en promoción
                            </p>
                        </div>
                    )}

                {/* =================================================
            LOADING
        ================================================= */}

                {loading && (
                    <section className="descuentos-status">
                        <div className="descuentos-loader" />

                        <h3>
                            Cargando
                            promociones
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
                        <section className="descuentos-status descuentos-error">
                            <div className="descuentos-status-icon">
                                !
                            </div>

                            <h3>
                                No pudimos
                                cargar las
                                promociones
                            </h3>

                            <p>
                                {error}
                            </p>

                            <button
                                type="button"
                                onClick={
                                    cargarDescuentos
                                }
                            >
                                Intentar
                                nuevamente
                            </button>
                        </section>
                    )}

                {/* =================================================
            SIN PRODUCTOS
        ================================================= */}

                {!loading &&
                    !error &&
                    productosFiltrados.length ===
                    0 && (
                        <section className="descuentos-status">
                            <div className="descuentos-status-icon">
                                %
                            </div>

                            <h3>
                                No encontramos
                                promociones
                            </h3>

                            <p>
                                Prueba con
                                otro término
                                o elimina los
                                filtros
                                seleccionados.
                            </p>

                            <button
                                type="button"
                                onClick={() => {
                                    setBusqueda(
                                        ""
                                    );

                                    setDisponibilidad(
                                        "todos"
                                    );

                                    setOrden(
                                        "featured"
                                    );
                                }}
                            >
                                Limpiar
                                filtros
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
                        <section className="descuentos-grid">
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
                                            className="descuentos-card"
                                            key={
                                                producto.id
                                            }
                                        >
                                            {/* Imagen */}

                                            <div className="descuentos-card-image">
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
                                                                "https://placehold.co/800x1000/f8eef2/7f5064?text=Virtuosa+Sale";
                                                        }}
                                                    />
                                                </button>

                                                <span className="descuentos-sale-badge">
                                                    SALE
                                                </span>

                                                {producto.featured && (
                                                    <span className="descuentos-featured-badge">
                                                        Destacado
                                                    </span>
                                                )}

                                                {agotado && (
                                                    <span className="descuentos-out-badge">
                                                        Agotado
                                                    </span>
                                                )}
                                            </div>

                                            {/* Información */}

                                            <div className="descuentos-card-body">
                                                <span className="descuentos-card-category">
                                                    Promoción
                                                    ·{" "}
                                                    {
                                                        producto.subcategory
                                                    }
                                                </span>

                                                <div className="descuentos-card-title-row">
                                                    <h3>
                                                        {
                                                            producto.name
                                                        }
                                                    </h3>

                                                    <button
                                                        type="button"
                                                        className="descuentos-heart"
                                                        aria-label="Agregar a favoritos"
                                                    >
                                                        ♡
                                                    </button>
                                                </div>

                                                <p className="descuentos-card-description">
                                                    {producto.description ||
                                                        "Producto seleccionado de la colección Virtuosa."}
                                                </p>

                                                <div className="descuentos-card-bottom">
                                                    <div className="descuentos-price">
                                                        <span>
                                                            Precio
                                                            especial
                                                        </span>

                                                        <strong>
                                                            {formatoPrecio(
                                                                producto.price
                                                            )}
                                                        </strong>

                                                        <small
                                                            className={
                                                                agotado
                                                                    ? "sin-stock"
                                                                    : ""
                                                            }
                                                        >
                                                            {agotado
                                                                ? "Sin stock"
                                                                : `${stock} disponibles`}
                                                        </small>
                                                    </div>

                                                    <button
                                                        type="button"
                                                        className="descuentos-view-button"
                                                        onClick={() =>
                                                            abrirProducto(
                                                                producto
                                                            )
                                                        }
                                                    >
                                                        Ver
                                                        producto
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
                    className="descuentos-modal-overlay"
                    onClick={
                        cerrarProducto
                    }
                    role="presentation"
                >
                    <article
                        className="descuentos-modal"
                        onClick={(
                            event
                        ) =>
                            event.stopPropagation()
                        }
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="descuento-modal-title"
                    >
                        {/* Cerrar */}

                        <button
                            type="button"
                            className="descuentos-modal-close"
                            onClick={
                                cerrarProducto
                            }
                            aria-label="Cerrar producto"
                        >
                            ×
                        </button>

                        {/* Imagen */}

                        <div className="descuentos-modal-image">
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
                                        "https://placehold.co/800x1000/f8eef2/7f5064?text=Virtuosa+Sale";
                                }}
                            />

                            <span className="descuentos-modal-sale">
                                SALE
                            </span>
                        </div>

                        {/* Contenido */}

                        <div className="descuentos-modal-content">
                            <span className="descuentos-modal-category">
                                {
                                    productoSeleccionado.category_name
                                }{" "}
                                · Promoción
                            </span>

                            <h2 id="descuento-modal-title">
                                {
                                    productoSeleccionado.name
                                }
                            </h2>

                            <div className="descuentos-modal-price">
                                <span>
                                    Precio
                                    especial
                                </span>

                                <strong>
                                    {formatoPrecio(
                                        productoSeleccionado.price
                                    )}
                                </strong>
                            </div>

                            <p className="descuentos-modal-description">
                                {productoSeleccionado.description ||
                                    "Producto seleccionado de la colección Virtuosa."}
                            </p>

                            {/* Información */}

                            <div className="descuentos-modal-info">
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
                                        Colección
                                    </span>

                                    <strong>
                                        Promociones
                                    </strong>
                                </div>
                            </div>

                            {/* Talla */}

                            <div className="descuentos-modal-field">
                                <label htmlFor="descuento-talla">
                                    Talla
                                </label>

                                <select
                                    id="descuento-talla"
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
                            </div>

                            {/* Cantidad */}

                            <div className="descuentos-modal-field">
                                <label htmlFor="descuento-cantidad">
                                    Cantidad
                                </label>

                                <select
                                    id="descuento-cantidad"
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
                                className="descuentos-add-button"
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
                                <div className="descuentos-cart-message">
                                    {
                                        mensajeCarrito
                                    }
                                </div>
                            )}

                            <p className="descuentos-modal-note">
                                Catálogo
                                conectado a
                                PostgreSQL
                                mediante la API
                                REST de
                                Virtuosa.
                            </p>
                        </div>
                    </article>
                </div>
            )}

            <Footer />
        </div>
    );
}

export default Descuentos;