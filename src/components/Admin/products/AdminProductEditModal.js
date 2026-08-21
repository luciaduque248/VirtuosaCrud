import React, {
    useEffect,
    useState,
} from "react";

import apiClient from "../../../services/apiClient";

import {
    errorAlert,
    productUpdatedAlert,
    warningAlert,
} from "../../../utils/alerts";

import "./AdminProducts.css";

function AdminProductEditModal({
    product,
    categorySlug,
    subcategory,
    onClose,
    onUpdated,
}) {
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

    useEffect(() => {
        setForm({
            name:
                product.name ||
                "",

            description:
                product.description ||
                "",

            price:
                product.price ||
                "",

            imageUrl:
                product.image_url ||
                "",

            stock:
                product.stock ??
                "",

            featured:
                Boolean(
                    product.featured
                ),
        });
    }, [product]);

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
                !form.name.trim() ||
                !form.imageUrl.trim()
            ) {
                warningAlert(
                    "Datos incompletos",
                    "Nombre e imagen son obligatorios."
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
                    "Ingresa un stock válido."
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

                await apiClient.put(
                    `/products/${product.id}`,
                    payload
                );

                /*
                  Primero retiramos el modal de edición.
                  El toast se dispara en la siguiente tarea para que
                  visualmente aparezca después del cierre del modal.
                */
                onClose();

                window.setTimeout(
                    () => {
                        productUpdatedAlert(
                            form.name
                        );
                    },
                    0
                );

                await onUpdated();
            } catch (err) {
                console.error(
                    err
                );

                errorAlert(
                    "No se pudo actualizar",
                    err?.response?.data
                        ?.message ||
                    "Ocurrió un error al guardar los cambios."
                );
            } finally {
                setLoading(false);
            }
        };

    return (
        <div
            className="admin-product-modal-overlay"
            onClick={
                onClose
            }
            role="presentation"
        >
            <section
                className="admin-product-modal"
                role="dialog"
                aria-modal="true"
                onClick={(
                    event
                ) =>
                    event.stopPropagation()
                }
            >
                <button
                    type="button"
                    className="admin-product-modal-close"
                    onClick={
                        onClose
                    }
                >
                    ×
                </button>

                <div className="admin-product-modal-heading">
                    <span>
                        Editar producto
                    </span>

                    <h2>
                        {
                            product.name
                        }
                    </h2>
                </div>

                <form
                    onSubmit={
                        handleSubmit
                    }
                >
                    <div className="admin-product-field">
                        <label>
                            Nombre
                        </label>

                        <input
                            name="name"
                            value={
                                form.name
                            }
                            onChange={
                                handleChange
                            }
                        />
                    </div>

                    <div className="admin-product-field">
                        <label>
                            Descripción
                        </label>

                        <textarea
                            name="description"
                            rows="4"
                            value={
                                form.description
                            }
                            onChange={
                                handleChange
                            }
                        />
                    </div>

                    <div className="admin-product-form-row">
                        <div className="admin-product-field">
                            <label>
                                Precio
                            </label>

                            <input
                                type="number"
                                name="price"
                                min="0"
                                value={
                                    form.price
                                }
                                onChange={
                                    handleChange
                                }
                            />
                        </div>

                        <div className="admin-product-field">
                            <label>
                                Stock
                            </label>

                            <input
                                type="number"
                                name="stock"
                                min="0"
                                value={
                                    form.stock
                                }
                                onChange={
                                    handleChange
                                }
                            />
                        </div>
                    </div>

                    <div className="admin-product-field">
                        <label>
                            URL de imagen
                        </label>

                        <input
                            type="url"
                            name="imageUrl"
                            value={
                                form.imageUrl
                            }
                            onChange={
                                handleChange
                            }
                        />
                    </div>

                    {form.imageUrl && (
                        <div className="admin-product-edit-preview">
                            <img
                                src={
                                    form.imageUrl
                                }
                                alt={
                                    form.name
                                }
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

                        Producto destacado
                    </label>

                    <div className="admin-product-modal-actions">
                        <button
                            type="button"
                            className="admin-product-cancel-button"
                            onClick={
                                onClose
                            }
                        >
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            className="admin-product-save-button"
                            disabled={
                                loading
                            }
                        >
                            {loading
                                ? "Guardando..."
                                : "Guardar cambios"}
                        </button>
                    </div>
                </form>
            </section>
        </div>
    );
}

export default AdminProductEditModal;