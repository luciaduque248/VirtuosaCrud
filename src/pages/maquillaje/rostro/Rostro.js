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
  apirostro,
} from "../../../utils/peticiones";

import "./rostroC.css";

function Rostro() {
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
            apirostro
          );

        const data =
          response?.data?.data;

        if (
          !Array.isArray(data)
        ) {
          throw new Error(
            "La API no devolvió una lista válida."
          );
        }

        setProductos(data);
      } catch (err) {
        console.error(
          "Error cargando productos de rostro:",
          err
        );

        setError(
          "No fue posible cargar los productos para rostro. Verifica que la API de Virtuosa esté ejecutándose."
        );
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    cargarProductos();
  }, []);

  /* =======================================================
     CONTROL DEL MODAL
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

  const productosFiltrados =
    useMemo(() => {
      let resultado = [
        ...productos,
      ];

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

  const cerrarProducto =
    () => {
      setProductoSeleccionado(
        null
      );

      setMensajeCarrito("");
    };

  const agregarAlCarrito =
    () => {
      setMensajeCarrito(
        "Producto preparado para el carrito. El carrito completo se integrará posteriormente."
      );
    };

  return (
    <div className="rostro-page">
      <Header />

      <Home />

      {/* ===================================================
          HERO
      =================================================== */}

      <section className="rostro-hero">
        <div className="rostro-hero-overlay">
          <div className="rostro-hero-content">
            <span className="rostro-eyebrow">
              VIRTUOSA BEAUTY
            </span>

            <h1>
              Tu piel,
              tu expresión
            </h1>

            <p>
              Bases, rubores y
              productos para
              realzar el rostro
              manteniendo un
              acabado natural.
            </p>

            <a
              href="#catalogo-rostro"
              className="rostro-hero-button"
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
        className="rostro-main"
        id="catalogo-rostro"
      >
        <div className="rostro-heading">
          <span>
            Maquillaje
          </span>

          <h2>
            Rostro
          </h2>

          <p>
            Descubre productos
            para preparar,
            unificar y realzar
            el rostro dentro de
            la colección
            Virtuosa Beauty.
          </p>
        </div>

        {/* =================================================
            TOOLBAR
        ================================================= */}

        <section className="rostro-toolbar">
          <div className="rostro-search">
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

          <div className="rostro-filters">
            <select
              value={
                disponibilidad
              }
              onChange={(event) =>
                setDisponibilidad(
                  event.target.value
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
                  event.target.value
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

        {!loading &&
          !error && (
            <div className="rostro-results">
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
          <section className="rostro-status">
            <div className="rostro-loader" />

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
            <section className="rostro-status">
              <div className="rostro-status-icon">
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
                Intentar nuevamente
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
            <section className="rostro-status">
              <div className="rostro-status-icon">
                ♡
              </div>

              <h3>
                No encontramos
                productos
              </h3>

              <p>
                Cambia los filtros
                o intenta con otro
                término de
                búsqueda.
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
            <section className="rostro-grid">
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
                      className="rostro-card"
                      key={
                        producto.id
                      }
                    >
                      <div className="rostro-card-image">
                        <button
                          type="button"
                          onClick={() =>
                            abrirProducto(
                              producto
                            )
                          }
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
                                "https://placehold.co/800x800/f7eee9/8b6858?text=Virtuosa+Beauty";
                            }}
                          />
                        </button>

                        {producto.featured && (
                          <span className="rostro-featured-badge">
                            Favorito
                          </span>
                        )}

                        {agotado && (
                          <span className="rostro-out-badge">
                            Agotado
                          </span>
                        )}
                      </div>

                      <div className="rostro-card-body">
                        <span className="rostro-card-category">
                          Beauty · Rostro
                        </span>

                        <div className="rostro-card-title">
                          <h3>
                            {
                              producto.name
                            }
                          </h3>

                          <button
                            type="button"
                            className="rostro-favorite"
                            aria-label="Agregar a favoritos"
                          >
                            ♡
                          </button>
                        </div>

                        <p className="rostro-card-description">
                          {producto.description ||
                            "Producto de la colección Virtuosa Beauty."}
                        </p>

                        <div className="rostro-card-footer">
                          <div className="rostro-card-price">
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
                            className="rostro-view-button"
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
          className="rostro-modal-overlay"
          onClick={
            cerrarProducto
          }
          role="presentation"
        >
          <article
            className="rostro-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="rostro-modal-title"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <button
              type="button"
              className="rostro-modal-close"
              onClick={
                cerrarProducto
              }
              aria-label="Cerrar producto"
            >
              ×
            </button>

            <div className="rostro-modal-image">
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
                    "https://placehold.co/800x800/f7eee9/8b6858?text=Virtuosa+Beauty";
                }}
              />

              {productoSeleccionado.featured && (
                <span className="rostro-modal-featured">
                  Favorito
                </span>
              )}
            </div>

            <div className="rostro-modal-content">
              <span className="rostro-modal-category">
                {
                  productoSeleccionado.category_name
                }{" "}
                · Rostro
              </span>

              <h2 id="rostro-modal-title">
                {
                  productoSeleccionado.name
                }
              </h2>

              <strong className="rostro-modal-price">
                {formatoPrecio(
                  productoSeleccionado.price
                )}
              </strong>

              <p className="rostro-modal-description">
                {productoSeleccionado.description ||
                  "Producto de la colección Virtuosa Beauty."}
              </p>

              <div className="rostro-modal-info">
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
                    Rostro
                  </strong>
                </div>
              </div>

              <div className="rostro-modal-field">
                <label htmlFor="rostro-cantidad">
                  Cantidad
                </label>

                <select
                  id="rostro-cantidad"
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

              <button
                type="button"
                className="rostro-add-button"
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
                <div className="rostro-cart-message">
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

export default Rostro;