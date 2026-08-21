import React from "react";

import AdminProductForm from "../../products/AdminProductForm";

function FormRostro() {
    return (
        <AdminProductForm
            title="Nuevo producto para rostro"
            categorySlug="maquillaje"
            subcategory="rostro"
            backPath="/VirtuosaCrud/edit-rostro"
        />
    );
}

export default FormRostro;