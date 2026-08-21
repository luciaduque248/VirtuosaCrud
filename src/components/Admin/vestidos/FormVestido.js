import React from "react";

import AdminProductForm from "../products/AdminProductForm";

function FormVestido() {
    return (
        <AdminProductForm
            title="Nuevo vestido"
            categorySlug="moda"
            subcategory="vestidos"
            backPath="/VirtuosaCrud/edit-vestidos"
        />
    );
}

export default FormVestido;
