import React, {
    useState,
} from "react";

import axios from "axios";

import {
    Link,
    useNavigate,
} from "react-router-dom";

import NavbarAdmin from "../navbar/NavbarAdmin";

import {
    productsApi,
} from "../../../utils/peticiones";

import {
    errorAlert,
    productCreatedAlert,
    warningAlert,
} from "../../../utils/alerts";

import "./VestidosAdmin.css";

function FormVestido() {
    const navigate =
        useNavigate();

    const [
        loading,
        setLoading,
    ] = useState(false);

    const [
        data,
        setData,
    ] = useState({
        name: "",
        description: "",
        price: "",
        imageUrl: "",
        stock: "",
        featured: false,
    });

    const handleChange = (
        event
    ) => {
        const {
            name,
            value,
            type,
            checked,
        } = event.target;

        setData(
            (
                previous
            ) => ({
                ...previous,

                [name]:
                    type ===
                        "checkbox"
                        ? checked
                        : value,
            })
        );
    };

    /* =========================================================
       SUBMIT
    ========================================================= */

    const handleSubmit =
        async (
            event
        ) => {
            event.preventDefault();

            if (
                !data.name.trim()
            ) {
                warningAlert(
                    "Nombre requerido",
                    "Debes ingresar el nombre del producto."
                );

                return;
            }

            if (
                !data.imageUrl.trim()
            ) {
                warningAlert(
                    "Imagen requerida",
                    "Debes ingresar la URL de una imagen."
                );

                return;
            }

            const precio =
                Number(
                    data.price
                );

            const stock =
                Number(
                    data.stock
                );

            if (
                Number.isNaN(
                    precio
                ) ||
                precio < 0
            ) {
                warningAlert(
                    "Precio inválido",
                    "Ingresa un precio válido."
                );

                return;
            }

            if (
                Number.isNaN(
                    stock
                ) ||
                stock < 0
            ) {
                warningAlert(
                    "Stock inválido",
                    "Ingresa un stock válido."
                );

                return;
            }

            const payload = {
                name:
                    data.name.trim(),

                description:
                    data.description.trim(),

                price:
                    precio,

                categoryId:
                    1,

                subcategory:
                    "vestidos",

                imageUrl:
                    data.imageUrl.trim(),

                stock,

                featured:
                    data.featured,
            };

            try {
                setLoading(true);

                const response =
                    await axios.post(
                        productsApi,
                        payload
                    );

                const productName =
                    response?.data
                        ?.data
                        ?.name ||
                    data.name;

                await productCreatedAlert(
                    productName
                );

                navigate(
                    "/VirtuosaCrud/edit-vestidos"
                );
            } catch (err) {
                console.error(
                    "Error creando producto:",
                    err
                );

                errorAlert(
                    "No se pudo guardar",
                    err?.response
                        ?.data
                        ?.message ||
                    "Ocurrió un error al crear el producto."
                );
            } finally {
                setLoading(false);
            }
        };

    return (
        <div className="vestidos-admin-page">
            <NavbarAdmin />

            <main className="vestidos-admin-form-page">
                <div className="vestidos-admin-form-header">
                    <span>
                        Administración
                    </span>

                    <h1>
                        Nuevo vestido
                    </h1>

                    <p>
                        El producto se
                        almacenará directamente
                        en PostgreSQL mediante
                        la API REST.
                    </p>
                </div>

                <form
                    className="vestidos-admin-form"
                    onSubmit={
                        handleSubmit
                    }
                >
                    <div className="vestidos-admin-field">
                        <label htmlFor="name">
                            Nombre del producto
                        </label>

                        <input
                            id="name"
                            type="text"
                            name="name"
                            value={
                                data.name
                            }
                            onChange={
                                handleChange
                            }
                            placeholder="Ej. Vestido Midnight Elegance"
                            required
                        />
                    </div>

                    <div className="vestidos-admin-field">
                        <label htmlFor="description">
                            Descripción
                        </label>

                        <textarea
                            id="description"
                            name="description"
                            value={
                                data.description
                            }
                            onChange={
                                handleChange
                            }
                            rows="5"
                            placeholder="Describe el producto..."
                        />
                    </div>

                    <div className="vestidos-admin-form-row">
                        <div className="vestidos-admin-field">
                            <label htmlFor="price">
                                Precio COP
                            </label>

                            <input
                                id="price"
                                type="number"
                                name="price"
                                min="0"
                                step="100"
                                value={
                                    data.price
                                }
                                onChange={
                                    handleChange
                                }
                                placeholder="119900"
                                required
                            />
                        </div>

                        <div className="vestidos-admin-field">
                            <label htmlFor="stock">
                                Stock
                            </label>

                            <input
                                id="stock"
                                type="number"
                                name="stock"
                                min="0"
                                step="1"
                                value={
                                    data.stock
                                }
                                onChange={
                                    handleChange
                                }
                                placeholder="10"
                                required
                            />
                        </div>
                    </div>

                    <div className="vestidos-admin-field">
                        <label htmlFor="imageUrl">
                            URL de imagen
                        </label>

                        <input
                            id="imageUrl"
                            type="url"
                            name="imageUrl"
                            value={
                                data.imageUrl
                            }
                            onChange={
                                handleChange
                            }
                            placeholder="https://..."
                            required
                        />
                    </div>

                    {data.imageUrl && (
                        <div className="vestidos-admin-preview">
                            <span>
                                Vista previa
                            </span>

                            <img
                                src={
                                    data.imageUrl
                                }
                                alt="Vista previa del producto"
                            />
                        </div>
                    )}

                    <label className="vestidos-admin-checkbox">
                        <input
                            type="checkbox"
                            name="featured"
                            checked={
                                data.featured
                            }
                            onChange={
                                handleChange
                            }
                        />

                        <span>
                            Marcar como
                            producto destacado
                        </span>
                    </label>

                    <div className="vestidos-admin-form-actions">
                        <Link
                            to="/VirtuosaCrud/edit-vestidos"
                            className="vestidos-admin-cancel"
                        >
                            Cancelar
                        </Link>

                        <button
                            type="submit"
                            className="vestidos-admin-save"
                            disabled={
                                loading
                            }
                        >
                            {loading
                                ? "Guardando..."
                                : "Guardar producto"}
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
}

export default FormVestido;