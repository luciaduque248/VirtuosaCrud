import React, {
    useEffect,
    useState,
} from "react";

import axios from "axios";

import {
    productsApi,
} from "../../../utils/peticiones";

import {
    errorAlert,
    productUpdatedAlert,
    warningAlert,
} from "../../../utils/alerts";

import "./VestidosAdmin.css";

function EditVestido({
    vestido,
    close,
    onUpdated,
}) {
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
        active: true,
    });

    useEffect(() => {
        if (!vestido) {
            return;
        }

        setData({
            name:
                vestido.name ||
                "",

            description:
                vestido.description ||
                "",

            price:
                vestido.price ||
                "",

            imageUrl:
                vestido.image_url ||
                "",

            stock:
                vestido.stock ??
                "",

            featured:
                Boolean(
                    vestido.featured
                ),

            active:
                vestido.active ??
                true,
        });
    }, [vestido]);

    /* =========================================================
       CHANGE
    ========================================================= */

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
       CLOSE
    ========================================================= */

    const handleClose =
        () => {
            if (!loading) {
                close(false);
            }
        };

    /* =========================================================
       SUBMIT
    ========================================================= */

    const handleSubmit =
        async (
            event
        ) => {
            event.preventDefault();

            const precio =
                Number(
                    data.price
                );

            const stock =
                Number(
                    data.stock
                );

            if (
                !data.name.trim() ||
                !data.imageUrl.trim()
            ) {
                warningAlert(
                    "Datos incompletos",
                    "Nombre e imagen son obligatorios."
                );

                return;
            }

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
                    Number(
                        vestido.category_id
                    ) || 1,

                subcategory:
                    "vestidos",

                imageUrl:
                    data.imageUrl.trim(),

                stock,

                featured:
                    data.featured,

                active:
                    data.active,
            };

            try {
                setLoading(true);

                await axios.put(
                    `${productsApi}/${vestido.id}`,
                    payload
                );

                await productUpdatedAlert(
                    data.name
                );

                if (
                    onUpdated
                ) {
                    await onUpdated();
                }

                close(false);
            } catch (err) {
                console.error(
                    "Error actualizando producto:",
                    err
                );

                errorAlert(
                    "No se pudo actualizar",
                    err?.response
                        ?.data
                        ?.message ||
                    "Ocurrió un error al guardar los cambios."
                );
            } finally {
                setLoading(false);
            }
        };

    return (
        <div
            className="vestidos-admin-modal-overlay"
            onClick={
                handleClose
            }
            role="presentation"
        >
            <section
                className="vestidos-admin-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="edit-vestido-title"
                onClick={(
                    event
                ) =>
                    event.stopPropagation()
                }
            >
                <button
                    type="button"
                    className="vestidos-admin-modal-close"
                    onClick={
                        handleClose
                    }
                    aria-label="Cerrar"
                >
                    ×
                </button>

                <div className="vestidos-admin-modal-header">
                    <span>
                        Editar producto
                    </span>

                    <h2 id="edit-vestido-title">
                        {
                            vestido.name
                        }
                    </h2>
                </div>

                <form
                    className="vestidos-admin-edit-form"
                    onSubmit={
                        handleSubmit
                    }
                >
                    <div className="vestidos-admin-field">
                        <label htmlFor="edit-name">
                            Nombre
                        </label>

                        <input
                            id="edit-name"
                            type="text"
                            name="name"
                            value={
                                data.name
                            }
                            onChange={
                                handleChange
                            }
                            required
                        />
                    </div>

                    <div className="vestidos-admin-field">
                        <label htmlFor="edit-description">
                            Descripción
                        </label>

                        <textarea
                            id="edit-description"
                            name="description"
                            rows="4"
                            value={
                                data.description
                            }
                            onChange={
                                handleChange
                            }
                        />
                    </div>

                    <div className="vestidos-admin-form-row">
                        <div className="vestidos-admin-field">
                            <label htmlFor="edit-price">
                                Precio
                            </label>

                            <input
                                id="edit-price"
                                type="number"
                                name="price"
                                min="0"
                                value={
                                    data.price
                                }
                                onChange={
                                    handleChange
                                }
                                required
                            />
                        </div>

                        <div className="vestidos-admin-field">
                            <label htmlFor="edit-stock">
                                Stock
                            </label>

                            <input
                                id="edit-stock"
                                type="number"
                                name="stock"
                                min="0"
                                value={
                                    data.stock
                                }
                                onChange={
                                    handleChange
                                }
                                required
                            />
                        </div>
                    </div>

                    <div className="vestidos-admin-field">
                        <label htmlFor="edit-image">
                            URL de imagen
                        </label>

                        <input
                            id="edit-image"
                            type="url"
                            name="imageUrl"
                            value={
                                data.imageUrl
                            }
                            onChange={
                                handleChange
                            }
                            required
                        />
                    </div>

                    {data.imageUrl && (
                        <div className="vestidos-admin-edit-preview">
                            <img
                                src={
                                    data.imageUrl
                                }
                                alt={
                                    data.name
                                }
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
                            Producto destacado
                        </span>
                    </label>

                    <label className="vestidos-admin-checkbox">
                        <input
                            type="checkbox"
                            name="active"
                            checked={
                                data.active
                            }
                            onChange={
                                handleChange
                            }
                        />

                        <span>
                            Producto activo
                        </span>
                    </label>

                    <div className="vestidos-admin-modal-actions">
                        <button
                            type="button"
                            className="vestidos-admin-cancel-button"
                            onClick={
                                handleClose
                            }
                            disabled={
                                loading
                            }
                        >
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            className="vestidos-admin-save-button"
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

export default EditVestido;