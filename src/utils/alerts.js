import Swal from "sweetalert2";

const COLORS = {
    primary: "#765f8e",
    danger: "#b0445d",
    cancel: "#77717b",
};

/* =========================================================
   TOAST
========================================================= */

const Toast =
    Swal.mixin({
        toast: true,

        position:
            "top-end",

        showConfirmButton:
            false,

        timer: 2600,

        timerProgressBar:
            true,

        didOpen: (
            toast
        ) => {
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

/*
  Los toast son feedback visual no bloqueante.
  No devolvemos la Promise de SweetAlert para evitar que
  un `await` mantenga modales abiertos durante los 2.6 s
  que permanece visible la notificación.
*/
const fireToast =
    (options) => {
        void Toast.fire(
            options
        );
    };

/* =========================================================
   GENERALES
========================================================= */

export const successToast =
    (
        title,
        text = ""
    ) =>
        fireToast({
            icon: "success",
            title,
            text,
        });


export const errorAlert =
    (
        title =
            "Ha ocurrido un error",

        text =
            "Inténtalo nuevamente."
    ) =>
        Swal.fire({
            icon: "error",

            title,
            text,

            confirmButtonText:
                "Entendido",

            confirmButtonColor:
                COLORS.primary,
        });


export const warningAlert =
    (
        title,
        text
    ) =>
        Swal.fire({
            icon: "warning",

            title,
            text,

            confirmButtonText:
                "Entendido",

            confirmButtonColor:
                COLORS.primary,
        });


export const infoAlert =
    (
        title,
        text
    ) =>
        Swal.fire({
            icon: "info",

            title,
            text,

            confirmButtonColor:
                COLORS.primary,
        });

/* =========================================================
   PRODUCTOS
========================================================= */

export const productCreatedAlert =
    (
        productName
    ) =>
        Swal.fire({
            icon: "success",

            title:
                "Producto creado",

            text:
                `${productName} fue guardado correctamente.`,

            confirmButtonText:
                "Continuar",

            confirmButtonColor:
                COLORS.primary,
        });


export const productUpdatedAlert =
    (
        productName
    ) =>
        fireToast({
            icon: "success",

            title:
                "Cambios guardados",

            text:
                `${productName} fue actualizado.`,
        });


export const confirmDelete =
    async (
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
            });

        return result
            .isConfirmed;
    };


export const productDeletedAlert =
    (
        productName
    ) =>
        fireToast({
            icon: "success",

            title:
                "Producto eliminado",

            text:
                `${productName} fue eliminado correctamente.`,
        });

/* =========================================================
   CARRITO
========================================================= */

export const cartAlert =
    (
        productName
    ) =>
        fireToast({
            icon: "success",

            title:
                "Agregado al carrito",

            text:
                `${productName} fue agregado correctamente.`,
        });


export const confirmCartRemove =
    async (
        productName
    ) => {
        const result =
            await Swal.fire({
                icon: "question",

                title:
                    "¿Quitar del carrito?",

                text:
                    `Se eliminará "${productName}" del carrito.`,

                showCancelButton:
                    true,

                confirmButtonText:
                    "Quitar",

                cancelButtonText:
                    "Cancelar",

                confirmButtonColor:
                    COLORS.danger,

                cancelButtonColor:
                    COLORS.cancel,

                reverseButtons:
                    true,
            });

        return result
            .isConfirmed;
    };


export const confirmClearCart =
    async () => {
        const result =
            await Swal.fire({
                icon: "warning",

                title:
                    "¿Vaciar carrito?",

                text:
                    "Se eliminarán todos los productos del carrito.",

                showCancelButton:
                    true,

                confirmButtonText:
                    "Sí, vaciar",

                cancelButtonText:
                    "Cancelar",

                confirmButtonColor:
                    COLORS.danger,

                cancelButtonColor:
                    COLORS.cancel,

                reverseButtons:
                    true,
            });

        return result
            .isConfirmed;
    };


export const checkoutInfo =
    () =>
        Swal.fire({
            icon: "info",

            title:
                "Checkout",

            text:
                "El carrito ya está funcionando. El siguiente paso será registrar pedidos y pagos desde el backend.",

            confirmButtonText:
                "Entendido",

            confirmButtonColor:
                COLORS.primary,
        });

/* =========================================================
   FAVORITOS
========================================================= */

export const favoriteAlert =
    (
        productName
    ) =>
        fireToast({
            icon: "success",

            title:
                "Agregado a favoritos",

            text:
                `${productName} fue agregado a favoritos.`,
        });

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

        return result
            .isConfirmed;
    };


export const showLoading =
    (
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


export const closeAlert =
    () => {
        Swal.close();
    };
