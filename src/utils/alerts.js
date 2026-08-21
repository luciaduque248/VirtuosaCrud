import Swal from "sweetalert2";

/* =========================================================
   VIRTUOSA ALERT SYSTEM
========================================================= */

const COLORS = {
    primary: "#765f8e",
    dark: "#29242d",
    danger: "#b0445d",
    success: "#527b61",
    cancel: "#7b7480",
};

/* =========================================================
   TOAST BASE
========================================================= */

const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2600,
    timerProgressBar: true,

    didOpen: (toast) => {
        toast.addEventListener(
            "mouseenter",
            Swal.stopTimer
        );

        toast.addEventListener(
            "mouseleave",
            Swal.resumeTimer
        );
    },
});

/* =========================================================
   SUCCESS
========================================================= */

export const successToast = (
    title,
    text = ""
) => {
    return Toast.fire({
        icon: "success",
        title,
        text,
    });
};

/* =========================================================
   ERROR
========================================================= */

export const errorAlert = (
    title = "Ha ocurrido un error",
    text = "Inténtalo nuevamente."
) => {
    return Swal.fire({
        icon: "error",
        title,
        text,

        confirmButtonText:
            "Entendido",

        confirmButtonColor:
            COLORS.primary,
    });
};

/* =========================================================
   WARNING
========================================================= */

export const warningAlert = (
    title,
    text
) => {
    return Swal.fire({
        icon: "warning",
        title,
        text,

        confirmButtonText:
            "Entendido",

        confirmButtonColor:
            COLORS.primary,
    });
};

/* =========================================================
   INFORMATION
========================================================= */

export const infoAlert = (
    title,
    text
) => {
    return Swal.fire({
        icon: "info",
        title,
        text,

        confirmButtonText:
            "Aceptar",

        confirmButtonColor:
            COLORS.primary,
    });
};

/* =========================================================
   DELETE CONFIRMATION
========================================================= */

export const confirmDelete = async (
    productName
) => {
    const result =
        await Swal.fire({
            icon: "warning",

            title:
                "¿Eliminar producto?",

            text:
                `Vas a eliminar "${productName}". Esta acción no se puede deshacer.`,

            showCancelButton:
                true,

            confirmButtonText:
                "Sí, eliminar",

            cancelButtonText:
                "Cancelar",

            confirmButtonColor:
                COLORS.danger,

            cancelButtonColor:
                COLORS.cancel,

            reverseButtons:
                true,

            focusCancel:
                true,
        });

    return result.isConfirmed;
};

/* =========================================================
   CREATED
========================================================= */

export const productCreatedAlert = (
    productName
) => {
    return Swal.fire({
        icon: "success",

        title:
            "Producto creado",

        text:
            `${productName} fue guardado correctamente en Virtuosa.`,

        confirmButtonText:
            "Continuar",

        confirmButtonColor:
            COLORS.primary,
    });
};

/* =========================================================
   UPDATED
========================================================= */

export const productUpdatedAlert = (
    productName
) => {
    return Toast.fire({
        icon: "success",

        title:
            "Cambios guardados",

        text:
            `${productName} fue actualizado correctamente.`,
    });
};

/* =========================================================
   DELETED
========================================================= */

export const productDeletedAlert = (
    productName
) => {
    return Toast.fire({
        icon: "success",

        title:
            "Producto eliminado",

        text:
            `${productName} fue eliminado correctamente.`,
    });
};

/* =========================================================
   CART
========================================================= */

export const cartAlert = (
    productName
) => {
    return Toast.fire({
        icon: "success",

        title:
            "Agregado al carrito",

        text:
            `${productName} fue agregado correctamente.`,
    });
};

/* =========================================================
   FAVORITES
========================================================= */

export const favoriteAlert = (
    productName
) => {
    return Toast.fire({
        icon: "success",

        title:
            "Agregado a favoritos",

        text:
            `${productName} fue agregado a tus favoritos.`,
    });
};

/* =========================================================
   LOGOUT
========================================================= */

export const confirmLogout =
    async () => {
        const result =
            await Swal.fire({
                icon: "question",

                title:
                    "¿Salir del panel?",

                text:
                    "Volverás a la pantalla de acceso.",

                showCancelButton:
                    true,

                confirmButtonText:
                    "Sí, salir",

                cancelButtonText:
                    "Cancelar",

                confirmButtonColor:
                    COLORS.primary,

                cancelButtonColor:
                    COLORS.cancel,

                reverseButtons:
                    true,
            });

        return result.isConfirmed;
    };

/* =========================================================
   LOADING
========================================================= */

export const showLoading = (
    title =
        "Procesando..."
) => {
    Swal.fire({
        title,

        allowOutsideClick:
            false,

        allowEscapeKey:
            false,

        showConfirmButton:
            false,

        didOpen: () => {
            Swal.showLoading();
        },
    });
};

/* =========================================================
   CLOSE CURRENT ALERT
========================================================= */

export const closeAlert =
    () => {
        Swal.close();
    };