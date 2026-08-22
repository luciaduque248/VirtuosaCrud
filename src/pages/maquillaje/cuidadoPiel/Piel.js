import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import axios from "axios";

import AddToCartControls from "../../../components/cart/AddToCartControls";

import Footer from "../../../components/footer/footer";
import Header from "../../../components/header/header";
import Home from "../../../components/home/home";

import {
  apipiel,
} from "../../../utils/peticiones";

import "./cuidadoPiel.css";

function Piel() {
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
            apipiel
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
          "Error cargando productos para la piel:",
          err
        );

        setError(
          "No fue posible cargar los productos para el cuidado de la piel. Verifica que la API de Virtuosa esté funcionando."
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
     FILTROS
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

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <div className="piel-page">
      <Header />

      <Home />

      {/* ===================================================
          HERO
      =================================================== */}

      <section className="piel-hero">
        <div className="piel-hero-overlay">
          <div className="piel-hero-content">
            <span className="piel-eyebrow">
              VIRTUOSA SKIN
            </span>

            <h1>
              Cuida tu
              piel
            </h1>

            <p>
              Una rutina de
              belleza comienza
              con una piel
              cuidada, hidratada
              y protegida.
            </p>

            <a
              href="#catalogo-piel"
              className="piel-hero-button"
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
        className="piel-main"
        id="catalogo-piel"
      >
        <div className="piel-heading">
          <span>
            Skin care
          </span>

          <h2>
            Cuidado de la piel
          </h2>

          <p>
            Descubre productos
            seleccionados para
            hidratar, preparar
            y cuidar tu piel
            todos los días.
          </p>
        </div>

        {/* =================================================
            TOOLBAR
        ================================================= */}

        <section className="piel-toolbar">
          <div className="piel-search">
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

          <div className="piel-filters">
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

        {/* Contador */}

        {!loading &&
          !error && (
            <div className="piel-results">
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
          <section className="piel-status">
            <div className="piel-loader" />

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
            <section className="piel-status">
              <div className="piel-status-icon">
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
            <section className="piel-status">
              <div className="piel-status-icon">
                ♡
              </div>

              <h3>
                No encontramos
                productos
              </h3>

              <p>
                Cambia los filtros
                o intenta con otro
                término.
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
            <section className="piel-grid">
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
                      className="piel-card"
                      key={
                        producto.id
                      }
                    >
                      {/* Imagen */}

                      <div className="piel-card-image">
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
                                "https://placehold.co/800x800/edf4ee/5f7764?text=Virtuosa+Skin";
                            }}
                          />
                        </button>

                        {producto.featured && (
                          <span className="piel-featured-badge">
                            Recomendado
                          </span>
                        )}

                        {agotado && (
                          <span className="piel-out-badge">
                            Agotado
                          </span>
                        )}
                      </div>

                      {/* Información */}

                      <div className="piel-card-body">
                        <span className="piel-card-category">
                          Skin care
                        </span>

                        <div className="piel-card-title">
                          <h3>
                            {
                              producto.name
                            }
                          </h3>

                          <button
                            type="button"
                            className="piel-favorite"
                            aria-label="Agregar a favoritos"
                          >
                            ♡
                          </button>
                        </div>

                        <p className="piel-card-description">
                          {producto.description ||
                            "Producto de cuidado personal de Virtuosa."}
                        </p>

                        <div className="piel-card-footer">
                          <div className="piel-card-price">
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
                            className="piel-view-button"
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
          className="piel-modal-overlay"
          onClick={
            cerrarProducto
          }
          role="presentation"
        >
          <article
            className="piel-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="piel-modal-title"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <button
              type="button"
              className="piel-modal-close"
              onClick={
                cerrarProducto
              }
              aria-label="Cerrar producto"
            >
              ×
            </button>

            {/* Imagen */}

            <div className="piel-modal-image">
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
                    "https://placehold.co/800x800/edf4ee/5f7764?text=Virtuosa+Skin";
                }}
              />

              {productoSeleccionado.featured && (
                <span className="piel-modal-featured">
                  Recomendado
                </span>
              )}
            </div>

            {/* Información */}

            <div className="piel-modal-content">
              <span className="piel-modal-category">
                {
                  productoSeleccionado.category_name
                }{" "}
                · Skin care
              </span>

              <h2 id="piel-modal-title">
                {
                  productoSeleccionado.name
                }
              </h2>

              <strong className="piel-modal-price">
                {formatoPrecio(
                  productoSeleccionado.price
                )}
              </strong>

              <p className="piel-modal-description">
                {productoSeleccionado.description ||
                  "Producto de cuidado personal de Virtuosa."}
              </p>

              <div className="piel-modal-info">
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
                    Cuidado de la piel
                  </strong>
                </div>
              </div>

              {/* Cantidad */}

              <div className="piel-modal-field">
                <label htmlFor="piel-cantidad">
                  Cantidad
                </label>

                <AddToCartControls
                  product={
                    productoSeleccionado
                  }
                />
              </div>


              {mensajeCarrito && (
                <div className="piel-cart-message">
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

export default Piel;
