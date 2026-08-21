import React from "react";

import AdminProductsPage from "./products/AdminProductsPage";

function AdmVS() {
    return (
        <AdminProductsPage
            title="Vestidos"
            description="Administra los vestidos y productos de moda de Virtuosa."
            categorySlug="moda"
            subcategory="vestidos"
            createPath="/VirtuosaCrud/form-vestidos"
        />
    );
}

export default AdmVS;
