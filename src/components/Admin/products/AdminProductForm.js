import React, {
    useState,
} from "react";

import {
    Link,
    useNavigate,
} from "react-router-dom";

import NavbarAdmin from "../navbar/NavbarAdmin";

import apiClient from "../../../services/apiClient";

import {
    errorAlert,
    productCreatedAlert,
    warningAlert,
} from "../../../utils/alerts";

import "./AdminProducts.css";

function AdminProductForm({
    title,
    categorySlug,
    subcategory,
    backPath,
}) {
    const navigate =
        useNavigate();

    const [
        loading,
        setLoading,
    ] = useState(false);

    const [
        form,
        setForm,
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

        setForm(
            (
                current
            ) => ({
                ...current,

                [name]:
                    type ===
                        "checkbox"
                        ? checked
                        : value,
            })
        );
    };

    const handleSubmit =
        async (
            event
        ) => {
            event.preventDefault();

            const price =
                Number(
                    form.price
                );

            const stock =
                Number(
                    form.stock
                );

            if (
                !form.name.trim()
            ) {
                warningAlert(
                    "Nombre requerido",
                    "Ingresa el nombre del producto."
                );

                return;
            }

            if (
                !form.imageUrl.trim()
            ) {
                warningAlert(
                    "Imagen requerida",
                    "Ingresa una URL de imagen."
                );

                return;
            }

            if (
                Number.isNaN(
                    price
                ) ||
                price < 0
            ) {
                warningAlert(
                    "Precio inválido",
                    "Ingresa un precio válido."
                );

                return;
            }

            if (
                !Number.isInteger(
                    stock
                ) ||
                stock < 0
            ) {
                warningAlert(
                    "Stock inválido",
                    "El stock debe ser un número entero mayor o igual a cero."
                );

                return;
            }

            const payload = {
                name:
                    form.name.trim(),

                description:
                    form.description.trim(),

                price,

                categorySlug,

                subcategory,

                imageUrl:
                    form.imageUrl.trim(),

                stock,

                featured:
                    form.featured,
            };

            try {
                setLoading(true);

                const response =
                    await apiClient.post(
                        "/products",
                        payload
                    );

                await productCreatedAlert(
                    response?.data?.data
                        ?.name ||
                    form.name
                );

                navigate(
                    backPath
                );
            } catch (err) {
                console.error(
                    err
                );

                errorAlert(
                    "No se pudo crear",
                    err?.response?.data
                        ?.message ||
                    "Ocurrió un error al crear el producto."
                );
            } finally {
                setLoading(false);
            }
        };

    return (
        <div className="admin-products-page">
            <NavbarAdmin />

            <main className="admin-product-form-page">
                <div className="admin-product-form-heading">
                    <span>
                        Administración
                    </span>

                    <h1>
                        {title}
                    </h1>

                    <p>
                        El producto será
                        almacenado en PostgreSQL
                        mediante la API REST de
                        Virtuosa.
                    </p>
                </div>

                <form
                    className="admin-product-form"
                    onSubmit={
                        handleSubmit
                    }
                >
                    <div className="admin-product-field">
                        <label htmlFor="name">
                            Nombre
                        </label>

                        <input
                            id="name"
                            name="name"
                            type="text"
                            value={
                                form.name
                            }
                            onChange={
                                handleChange
                            }
                            placeholder="Nombre del producto"
                            required
                        />
                    </div>

                    <div className="admin-product-field">
                        <label htmlFor="description">
                            Descripción
                        </label>

                        <textarea
                            id="description"
                            name="description"
                            rows="5"
                            value={
                                form.description
                            }
                            onChange={
                                handleChange
                            }
                            placeholder="Describe el producto..."
                        />
                    </div>

                    <div className="admin-product-form-row">
                        <div className="admin-product-field">
                            <label htmlFor="price">
                                Precio COP
                            </label>

                            <input
                                id="price"
                                name="price"
                                type="number"
                                min="0"
                                step="100"
                                value={
                                    form.price
                                }
                                onChange={
                                    handleChange
                                }
                                required
                            />
                        </div>

                        <div className="admin-product-field">
                            <label htmlFor="stock">
                                Stock
                            </label>

                            <input
                                id="stock"
                                name="stock"
                                type="number"
                                min="0"
                                step="1"
                                value={
                                    form.stock
                                }
                                onChange={
                                    handleChange
                                }
                                required
                            />
                        </div>
                    </div>

                    <div className="admin-product-field">
                        <label htmlFor="imageUrl">
                            URL de imagen
                        </label>

                        <input
                            id="imageUrl"
                            name="imageUrl"
                            type="url"
                            value={
                                form.imageUrl
                            }
                            onChange={
                                handleChange
                            }
                            placeholder="https://..."
                            required
                        />
                    </div>

                    {form.imageUrl && (
                        <div className="admin-product-preview">
                            <span>
                                Vista previa
                            </span>

                            <img
                                src={
                                    form.imageUrl
                                }
                                alt="Vista previa"
                            />
                        </div>
                    )}

                    <label className="admin-product-checkbox">
                        <input
                            type="checkbox"
                            name="featured"
                            checked={
                                form.featured
                            }
                            onChange={
                                handleChange
                            }
                        />

                        <span>
                            Producto destacado
                        </span>
                    </label>

                    <div className="admin-product-form-actions">
                        <Link
                            to={
                                backPath
                            }
                            className="admin-product-cancel"
                        >
                            Cancelar
                        </Link>

                        <button
                            type="submit"
                            className="admin-product-save"
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

export default AdminProductForm;