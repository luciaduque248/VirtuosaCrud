import React, {
    useEffect,
    useMemo,
    useState,
} from "react";

import axios from "axios";

import Footer from "../../components/footer/footer";
import Home from "../../components/home/home";
import Header from "../../components/header/header";

import "../../components/assets/css/Vestidos.css";

import { api } from "../../utils/peticiones";

/* =========================================================
   VESTIDOS
========================================================= */

function Vestidos() {
    /* =======================================================
       STATES
    ======================================================= */

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

    const [busqueda, setBusqueda] =
        useState("");

    const [orden, setOrden] =
        useState("featured");

    const [
        disponibilidad,
        setDisponibilidad,
    ] = useState("todos");

    /* =======================================================
       CARGAR PRODUCTOS
    ======================================================= */

    const cargarVestidos =
        async () => {
            try {
                setLoading(true);
                setError("");

                const response =
                    await axios.get(api);

                const productos =
                    response?.data?.data;

                if (
                    !Array.isArray(productos)
                ) {
                    throw new Error(
                        "La API no devolvió una lista válida de productos."
                    );
                }

                setVestidos(productos);
            } catch (err) {
                console.error(
                    "Error al cargar vestidos:",
                    err
                );

                setError(
                    "No pudimos cargar los vestidos. Verifica que el servidor de Virtuosa esté ejecutándose."
                );
            } finally {
                setLoading(false);
            }
        };

    useEffect(() => {
        cargarVestidos();
    }, []);

    /* =======================================================
       BLOQUEAR SCROLL CON MODAL
    ======================================================= */

    useEffect(() => {
        if (productoSeleccionado) {
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
    }, [productoSeleccionado]);

    /* =======================================================
       CERRAR MODAL CON ESC
    ======================================================= */

    useEffect(() => {
        const handleEscape = (
            event
        ) => {
            if (
                event.key === "Escape"
            ) {
                setProductoSeleccionado(
                    null
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
       FORMATO PRECIO
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
                style: "currency",
                currency: "COP",
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
            }
        );
    };

    /* =======================================================
       FILTRAR Y ORDENAR
    ======================================================= */

    const vestidosFiltrados =
        useMemo(() => {
            let resultado = [
                ...vestidos,
            ];

            /* Buscador */

            const texto =
                busqueda
                    .trim()
                    .toLowerCase();

            if (texto) {
                resultado =
                    resultado.filter(
                        (producto) => {
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
                        (producto) =>
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
                            Number(a.price) -
                            Number(b.price)
                    );
                    break;

                case "price-desc":
                    resultado.sort(
                        (a, b) =>
                            Number(b.price) -
                            Number(a.price)
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
            vestidos,
            busqueda,
            disponibilidad,
            orden,
        ]);

    /* =======================================================
       RENDER
    ======================================================= */

    return (
        <div className="vestidos-page">
            <Header />

            <Home />

            {/* ===================================================
          HERO
      =================================================== */}

            <section className="vestidos-hero">
                <div className="vestidos-hero-overlay">
                    <div className="vestidos-hero-content">
                        <span className="vestidos-eyebrow">
                            VIRTUOSA
                        </span>

                        <h1>
                            Viste a la moda
                        </h1>

                        <p>
                            Descubre piezas
                            seleccionadas para
                            expresar tu estilo.
                        </p>

                        <a
                            href="#catalogo-vestidos"
                            className="vestidos-hero-button"
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
                className="vestidos-main"
                id="catalogo-vestidos"
            >
                {/* Header catálogo */}

                <div className="vestidos-heading">
                    <span>
                        Colección
                    </span>

                    <h2>
                        Vestidos
                    </h2>

                    <p>
                        Una selección de
                        prendas femeninas
                        disponibles directamente
                        desde el catálogo de
                        Virtuosa.
                    </p>
                </div>

                {/* =================================================
            TOOLBAR
        ================================================= */}

                <section className="vestidos-toolbar">
                    {/* Buscador */}

                    <div className="vestidos-search">
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
                            placeholder="Buscar vestido..."
                            value={busqueda}
                            onChange={(event) =>
                                setBusqueda(
                                    event.target
                                        .value
                                )
                            }
                        />
                    </div>

                    {/* Filtros */}

                    <div className="vestidos-filters">
                        <select
                            value={
                                disponibilidad
                            }
                            onChange={(event) =>
                                setDisponibilidad(
                                    event.target
                                        .value
                                )
                            }
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
                            onChange={(event) =>
                                setOrden(
                                    event.target
                                        .value
                                )
                            }
                        >
                            <option value="featured">
                                Destacados
                            </option>

                            <option value="price-asc">
                                Precio: menor a
                                mayor
                            </option>

                            <option value="price-desc">
                                Precio: mayor a
                                menor
                            </option>

                            <option value="name">
                                Nombre A-Z
                            </option>
                        </select>
                    </div>
                </section>

                {/* Contador */}

                {!loading &&
                    !error && (
                        <div className="vestidos-results-info">
                            <p>
                                {vestidosFiltrados.length}{" "}
                                {vestidosFiltrados.length ===
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
                    <section className="vestidos-status">
                        <div className="vestidos-loader" />

                        <h3>
                            Cargando colección
                        </h3>

                        <p>
                            Estamos obteniendo los
                            productos desde
                            Virtuosa.
                        </p>
                    </section>
                )}

                {/* =================================================
            ERROR
        ================================================= */}

                {!loading &&
                    error && (
                        <section className="vestidos-status vestidos-error">
                            <div className="vestidos-status-icon">
                                !
                            </div>

                            <h3>
                                No pudimos cargar
                                los productos
                            </h3>

                            <p>{error}</p>

                            <button
                                type="button"
                                onClick={
                                    cargarVestidos
                                }
                            >
                                Intentar nuevamente
                            </button>
                        </section>
                    )}

                {/* =================================================
            SIN RESULTADOS
        ================================================= */}

                {!loading &&
                    !error &&
                    vestidosFiltrados.length ===
                    0 && (
                        <section className="vestidos-status">
                            <div className="vestidos-status-icon">
                                ♡
                            </div>

                            <h3>
                                No encontramos
                                productos
                            </h3>

                            <p>
                                Prueba con otro
                                término de búsqueda
                                o cambia los filtros.
                            </p>

                            <button
                                type="button"
                                onClick={() => {
                                    setBusqueda("");
                                    setDisponibilidad(
                                        "todos"
                                    );
                                    setOrden(
                                        "featured"
                                    );
                                }}
                            >
                                Limpiar filtros
                            </button>
                        </section>
                    )}

                {/* =================================================
            PRODUCT GRID
        ================================================= */}

                {!loading &&
                    !error &&
                    vestidosFiltrados.length >
                    0 && (
                        <section className="vestidos-grid">
                            {vestidosFiltrados.map(
                                (
                                    vestido
                                ) => {
                                    const stock =
                                        Number(
                                            vestido.stock
                                        );

                                    const agotado =
                                        stock <= 0;

                                    return (
                                        <article
                                            className="vestidos-card"
                                            key={
                                                vestido.id
                                            }
                                        >
                                            {/* Imagen */}

                                            <div className="vestidos-card-image">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setProductoSeleccionado(
                                                            vestido
                                                        )
                                                    }
                                                    aria-label={`Ver ${vestido.name}`}
                                                >
                                                    <img
                                                        src={
                                                            vestido.image_url
                                                        }
                                                        alt={
                                                            vestido.name
                                                        }
                                                        loading="lazy"
                                                        onError={(
                                                            event
                                                        ) => {
                                                            event.currentTarget.src =
                                                                "https://placehold.co/800x1000/f1e8f6/70567c?text=Virtuosa";
                                                        }}
                                                    />
                                                </button>

                                                {vestido.featured && (
                                                    <span className="vestidos-badge vestidos-badge-featured">
                                                        Destacado
                                                    </span>
                                                )}

                                                {agotado && (
                                                    <span className="vestidos-badge vestidos-badge-stock">
                                                        Agotado
                                                    </span>
                                                )}
                                            </div>

                                            {/* Info */}

                                            <div className="vestidos-card-body">
                                                <div className="vestidos-card-header">
                                                    <div>
                                                        <span className="vestidos-card-category">
                                                            {
                                                                vestido.subcategory
                                                            }
                                                        </span>

                                                        <h3>
                                                            {
                                                                vestido.name
                                                            }
                                                        </h3>
                                                    </div>

                                                    <button
                                                        type="button"
                                                        className="vestidos-favorite"
                                                        aria-label="Agregar a favoritos"
                                                    >
                                                        ♡
                                                    </button>
                                                </div>

                                                <p className="vestidos-card-description">
                                                    {vestido.description ||
                                                        "Producto de la colección Virtuosa."}
                                                </p>

                                                <div className="vestidos-card-footer">
                                                    <div>
                                                        <strong>
                                                            {formatoPrecio(
                                                                vestido.price
                                                            )}
                                                        </strong>

                                                        <span
                                                            className={
                                                                agotado
                                                                    ? "vestidos-stock agotado"
                                                                    : "vestidos-stock"
                                                            }
                                                        >
                                                            {agotado
                                                                ? "Sin stock"
                                                                : `${stock} disponibles`}
                                                        </span>
                                                    </div>

                                                    <button
                                                        type="button"
                                                        className="vestidos-details-button"
                                                        onClick={() =>
                                                            setProductoSeleccionado(
                                                                vestido
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
          MODAL PRODUCTO
      =================================================== */}

            {productoSeleccionado && (
                <div
                    className="vestidos-modal-overlay"
                    onClick={() =>
                        setProductoSeleccionado(
                            null
                        )
                    }
                    role="presentation"
                >
                    <article
                        className="vestidos-modal"
                        onClick={(event) =>
                            event.stopPropagation()
                        }
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="producto-modal-title"
                    >
                        {/* Cerrar */}

                        <button
                            type="button"
                            className="vestidos-modal-close"
                            onClick={() =>
                                setProductoSeleccionado(
                                    null
                                )
                            }
                            aria-label="Cerrar producto"
                        >
                            ×
                        </button>

                        {/* Imagen */}

                        <div className="vestidos-modal-image">
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
                                        "https://placehold.co/800x1000/f1e8f6/70567c?text=Virtuosa";
                                }}
                            />
                        </div>

                        {/* Información */}

                        <div className="vestidos-modal-content">
                            <span className="vestidos-modal-category">
                                {
                                    productoSeleccionado.category_name
                                }{" "}
                                ·{" "}
                                {
                                    productoSeleccionado.subcategory
                                }
                            </span>

                            <h2 id="producto-modal-title">
                                {
                                    productoSeleccionado.name
                                }
                            </h2>

                            <strong className="vestidos-modal-price">
                                {formatoPrecio(
                                    productoSeleccionado.price
                                )}
                            </strong>

                            <p className="vestidos-modal-description">
                                {productoSeleccionado.description ||
                                    "Producto de la colección Virtuosa."}
                            </p>

                            <div className="vestidos-modal-info">
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
                                        {
                                            productoSeleccionado.category_name
                                        }
                                    </strong>
                                </div>
                            </div>

                            {/* Talla */}

                            <div className="vestidos-modal-option">
                                <label htmlFor="modal-talla">
                                    Talla
                                </label>

                                <select
                                    id="modal-talla"
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

                            <div className="vestidos-modal-option">
                                <label htmlFor="modal-cantidad">
                                    Cantidad
                                </label>

                                <select
                                    id="modal-cantidad"
                                    defaultValue="1"
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
                                        (_, index) =>
                                            index + 1
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
                                className="vestidos-add-button"
                                disabled={
                                    Number(
                                        productoSeleccionado.stock
                                    ) <= 0
                                }
                                onClick={() => {
                                    alert(
                                        "El carrito se implementará en la siguiente fase de Virtuosa."
                                    );
                                }}
                            >
                                {Number(
                                    productoSeleccionado.stock
                                ) > 0
                                    ? "Agregar al carrito"
                                    : "Producto agotado"}
                            </button>
                        </div>
                    </article>
                </div>
            )}

            <Footer />
        </div>
    );
}

export default Vestidos;