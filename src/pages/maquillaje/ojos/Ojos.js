import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import axios from "axios";

import Footer from "../../../components/footer/footer";
import Header from "../../../components/header/header";
import Home from "../../../components/home/home";

import { apiojos } from "../../../utils/peticiones";

import "./ojosC.css";

/* =========================================================
   OJOS
========================================================= */

function Ojos() {
  /* =======================================================
     STATES
  ======================================================= */

  const [productos, setProductos] =
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
          await axios.get(apiojos);

        const data =
          response?.data?.data;

        if (!Array.isArray(data)) {
          throw new Error(
            "La API no devolvió una lista válida de productos."
          );
        }

        setProductos(data);
      } catch (err) {
        console.error(
          "Error cargando productos para ojos:",
          err
        );

        setError(
          "No fue posible cargar los productos de ojos. Verifica que la API de Virtuosa esté funcionando."
        );
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    cargarProductos();
  }, []);

  /* =======================================================
     BLOQUEAR SCROLL DEL BODY CUANDO HAY MODAL
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
     ESC PARA CERRAR MODAL
  ======================================================= */

  useEffect(() => {
    const handleEscape = (
      event
    ) => {
      if (
        event.key === "Escape"
      ) {
        cerrarProducto();
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

    if (Number.isNaN(numero)) {
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
     FILTROS Y ORDENAMIENTO
  ======================================================= */

  const productosFiltrados =
    useMemo(() => {
      let resultado = [
        ...productos,
      ];

      /* Búsqueda */

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

      /* Stock */

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

  const cerrarProducto = () => {
    setProductoSeleccionado(
      null
    );

    setMensajeCarrito("");
  };

  /* =======================================================
     CARRITO - PRÓXIMA FASE
  ======================================================= */

  const agregarAlCarrito =
    () => {
      setMensajeCarrito(
        "Producto preparado para el carrito. Implementaremos el carrito completo en la siguiente fase."
      );
    };

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <div className="ojos-page">
      <Header />

      <Home />

      {/* ===================================================
          HERO
      =================================================== */}

      <section className="ojos-hero">
        <div className="ojos-hero-overlay">
          <div className="ojos-hero-content">
            <span className="ojos-eyebrow">
              VIRTUOSA BEAUTY
            </span>

            <h1>
              Miradas que
              hablan
            </h1>

            <p>
              Sombras, máscaras
              y productos
              seleccionados para
              resaltar tu mirada.
            </p>

            <a
              href="#catalogo-ojos"
              className="ojos-hero-button"
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
        className="ojos-main"
        id="catalogo-ojos"
      >
        {/* Título */}

        <div className="ojos-heading">
          <span>
            Maquillaje
          </span>

          <h2>
            Ojos
          </h2>

          <p>
            Descubre la
            colección de
            productos para ojos
            disponible en
            Virtuosa.
          </p>
        </div>

        {/* =================================================
            TOOLBAR
        ================================================= */}

        <section className="ojos-toolbar">
          {/* Buscador */}

          <div className="ojos-search">
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
              placeholder="Buscar producto..."
              value={busqueda}
              onChange={(event) =>
                setBusqueda(
                  event.target.value
                )
              }
            />
          </div>

          {/* Filtros */}

          <div className="ojos-filters">
            <select
              value={
                disponibilidad
              }
              onChange={(event) =>
                setDisponibilidad(
                  event.target.value
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
              onChange={(event) =>
                setOrden(
                  event.target.value
                )
              }
              aria-label="Ordenar productos"
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

        {/* Resultados */}

        {!loading &&
          !error && (
            <div className="ojos-results">
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
          <section className="ojos-status">
            <div className="ojos-loader" />

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
            <section className="ojos-status">
              <div className="ojos-status-icon">
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
            <section className="ojos-status">
              <div className="ojos-status-icon">
                ♡
              </div>

              <h3>
                No encontramos
                productos
              </h3>

              <p>
                Cambia los
                filtros o intenta
                con otro término
                de búsqueda.
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
            GRID
        ================================================= */}

        {!loading &&
          !error &&
          productosFiltrados.length >
          0 && (
            <section className="ojos-grid">
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
                      className="ojos-card"
                      key={
                        producto.id
                      }
                    >
                      {/* Imagen */}

                      <div className="ojos-card-image">
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
                                "https://placehold.co/800x800/eee8f5/705d83?text=Virtuosa+Beauty";
                            }}
                          />
                        </button>

                        {producto.featured && (
                          <span className="ojos-featured-badge">
                            Favorito
                          </span>
                        )}

                        {agotado && (
                          <span className="ojos-out-badge">
                            Agotado
                          </span>
                        )}
                      </div>

                      {/* Información */}

                      <div className="ojos-card-body">
                        <span className="ojos-card-category">
                          Beauty · Ojos
                        </span>

                        <div className="ojos-card-title">
                          <h3>
                            {
                              producto.name
                            }
                          </h3>

                          <button
                            type="button"
                            className="ojos-favorite"
                            aria-label="Agregar a favoritos"
                          >
                            ♡
                          </button>
                        </div>

                        <p className="ojos-card-description">
                          {producto.description ||
                            "Producto seleccionado de la colección de maquillaje Virtuosa."}
                        </p>

                        <div className="ojos-card-footer">
                          <div className="ojos-card-price">
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
                            className="ojos-view-button"
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
          MODAL PRODUCTO
      =================================================== */}

      {productoSeleccionado && (
        <div
          className="ojos-modal-overlay"
          onClick={
            cerrarProducto
          }
          role="presentation"
        >
          <article
            className="ojos-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="ojos-modal-title"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            {/* Cerrar */}

            <button
              type="button"
              className="ojos-modal-close"
              onClick={
                cerrarProducto
              }
              aria-label="Cerrar producto"
            >
              ×
            </button>

            {/* Imagen */}

            <div className="ojos-modal-image">
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
                    "https://placehold.co/800x800/eee8f5/705d83?text=Virtuosa+Beauty";
                }}
              />

              {productoSeleccionado.featured && (
                <span className="ojos-modal-featured">
                  Favorito
                </span>
              )}
            </div>

            {/* Información */}

            <div className="ojos-modal-content">
              <span className="ojos-modal-category">
                {
                  productoSeleccionado.category_name
                }{" "}
                · Ojos
              </span>

              <h2 id="ojos-modal-title">
                {
                  productoSeleccionado.name
                }
              </h2>

              <strong className="ojos-modal-price">
                {formatoPrecio(
                  productoSeleccionado.price
                )}
              </strong>

              <p className="ojos-modal-description">
                {productoSeleccionado.description ||
                  "Producto de la colección de maquillaje Virtuosa."}
              </p>

              {/* Información producto */}

              <div className="ojos-modal-info">
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
                    Ojos
                  </strong>
                </div>
              </div>

              {/* Cantidad */}

              <div className="ojos-modal-field">
                <label htmlFor="ojos-cantidad">
                  Cantidad
                </label>

                <select
                  id="ojos-cantidad"
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

              {/* Botón carrito */}

              <button
                type="button"
                className="ojos-add-button"
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
                <div className="ojos-cart-message">
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

export default Ojos;