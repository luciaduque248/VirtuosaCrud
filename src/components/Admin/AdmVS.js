import React, {
    useCallback,
    useEffect,
    useState,
} from "react";

import axios from "axios";

import {
    Link,
} from "react-router-dom";

import {
    api,
    productsApi,
} from "../../utils/peticiones";

import {
    confirmDelete,
    errorAlert,
    productDeletedAlert,
} from "../../utils/alerts";

import NavbarAdmin from "./navbar/NavbarAdmin";
import EditVestido from "./vestidos/EditVestido";

import "./vestidos/VestidosAdmin.css";

function AdmVS() {
    const [
        vestidos,
        setVestidos,
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
        modal,
        setModal,
    ] = useState(false);

    const [
        vestidoSeleccionado,
        setVestidoSeleccionado,
    ] = useState(null);

    /* =========================================================
       CARGAR VESTIDOS
    ========================================================= */

    const cargarVestidos =
        useCallback(
            async () => {
                try {
                    setLoading(true);
                    setError("");

                    const response =
                        await axios.get(
                            api
                        );

                    const data =
                        response?.data
                            ?.data;

                    if (
                        !Array.isArray(
                            data
                        )
                    ) {
                        throw new Error(
                            "La API no devolvió una lista válida."
                        );
                    }

                    setVestidos(
                        data
                    );
                } catch (err) {
                    console.error(
                        "Error cargando vestidos:",
                        err
                    );

                    setError(
                        "No fue posible cargar los vestidos."
                    );
                } finally {
                    setLoading(
                        false
                    );
                }
            },
            []
        );

    useEffect(() => {
        cargarVestidos();
    }, [
        cargarVestidos,
    ]);

    /* =========================================================
       PRECIO
    ========================================================= */

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

                minimumFractionDigits:
                    0,

                maximumFractionDigits:
                    0,
            }
        );
    };

    /* =========================================================
       EDITAR
    ========================================================= */

    const abrirEdicion = (
        vestido
    ) => {
        setVestidoSeleccionado(
            vestido
        );

        setModal(true);
    };

    /* =========================================================
       ELIMINAR
    ========================================================= */

    const handleDelete =
        async (
            vestido
        ) => {
            const confirmed =
                await confirmDelete(
                    vestido.name
                );

            if (
                !confirmed
            ) {
                return;
            }

            try {
                await axios.delete(
                    `${productsApi}/${vestido.id}`
                );

                await productDeletedAlert(
                    vestido.name
                );

                await cargarVestidos();
            } catch (err) {
                console.error(
                    "Error eliminando producto:",
                    err
                );

                errorAlert(
                    "No se pudo eliminar",
                    err?.response
                        ?.data
                        ?.message ||
                    "Ocurrió un error al eliminar el producto."
                );
            }
        };

    /* =========================================================
       RENDER
    ========================================================= */

    return (
        <div className="vestidos-admin-page">
            <NavbarAdmin />

            <section className="vestidos-admin-header">
                <div>
                    <span>
                        Administración
                    </span>

                    <h1>
                        Vestidos
                    </h1>

                    <p>
                        Gestiona los productos
                        almacenados en la base
                        de datos de Virtuosa.
                    </p>
                </div>

                <Link
                    to="/VirtuosaCrud/form-vestidos"
                    className="vestidos-admin-create"
                >
                    + Nuevo producto
                </Link>
            </section>

            {!loading &&
                !error && (
                    <section className="vestidos-admin-stats">
                        <article>
                            <span>
                                Productos
                            </span>

                            <strong>
                                {
                                    vestidos.length
                                }
                            </strong>
                        </article>

                        <article>
                            <span>
                                En stock
                            </span>

                            <strong>
                                {
                                    vestidos.filter(
                                        (
                                            producto
                                        ) =>
                                            Number(
                                                producto.stock
                                            ) > 0
                                    ).length
                                }
                            </strong>
                        </article>

                        <article>
                            <span>
                                Destacados
                            </span>

                            <strong>
                                {
                                    vestidos.filter(
                                        (
                                            producto
                                        ) =>
                                            producto.featured
                                    ).length
                                }
                            </strong>
                        </article>
                    </section>
                )}

            {loading && (
                <section className="vestidos-admin-status">
                    <div className="vestidos-admin-loader" />

                    <h2>
                        Cargando productos...
                    </h2>
                </section>
            )}

            {!loading &&
                error && (
                    <section className="vestidos-admin-status">
                        <div className="vestidos-admin-error-icon">
                            !
                        </div>

                        <h2>
                            No pudimos cargar
                            los productos
                        </h2>

                        <p>
                            {error}
                        </p>

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

            {!loading &&
                !error &&
                vestidos.length ===
                0 && (
                    <section className="vestidos-admin-status">
                        <h2>
                            No hay vestidos
                        </h2>

                        <p>
                            Puedes crear el
                            primer producto
                            desde el panel.
                        </p>

                        <Link
                            to="/VirtuosaCrud/form-vestidos"
                            className="vestidos-admin-empty-button"
                        >
                            Crear producto
                        </Link>
                    </section>
                )}

            {!loading &&
                !error &&
                vestidos.length >
                0 && (
                    <main className="vestidos-admin-grid">
                        {vestidos.map(
                            (
                                vestido
                            ) => (
                                <article
                                    className="vestidos-admin-card"
                                    key={
                                        vestido.id
                                    }
                                >
                                    <div className="vestidos-admin-image">
                                        <img
                                            src={
                                                vestido.image_url
                                            }
                                            alt={
                                                vestido.name
                                            }
                                        />

                                        {vestido.featured && (
                                            <span>
                                                Destacado
                                            </span>
                                        )}
                                    </div>

                                    <div className="vestidos-admin-card-content">
                                        <span className="vestidos-admin-category">
                                            {
                                                vestido.subcategory
                                            }
                                        </span>

                                        <h2>
                                            {
                                                vestido.name
                                            }
                                        </h2>

                                        <p>
                                            {vestido.description ||
                                                "Sin descripción."}
                                        </p>

                                        <div className="vestidos-admin-meta">
                                            <div>
                                                <span>
                                                    Precio
                                                </span>

                                                <strong>
                                                    {formatoPrecio(
                                                        vestido.price
                                                    )}
                                                </strong>
                                            </div>

                                            <div>
                                                <span>
                                                    Stock
                                                </span>

                                                <strong>
                                                    {
                                                        vestido.stock
                                                    }
                                                </strong>
                                            </div>
                                        </div>

                                        <div className="vestidos-admin-actions">
                                            <button
                                                type="button"
                                                className="vestidos-admin-edit"
                                                onClick={() =>
                                                    abrirEdicion(
                                                        vestido
                                                    )
                                                }
                                            >
                                                Editar
                                            </button>

                                            <button
                                                type="button"
                                                className="vestidos-admin-delete"
                                                onClick={() =>
                                                    handleDelete(
                                                        vestido
                                                    )
                                                }
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    </div>
                                </article>
                            )
                        )}
                    </main>
                )}

            {modal &&
                vestidoSeleccionado && (
                    <EditVestido
                        vestido={
                            vestidoSeleccionado
                        }
                        close={
                            setModal
                        }
                        onUpdated={
                            cargarVestidos
                        }
                    />
                )}
        </div>
    );
}

export default AdmVS;