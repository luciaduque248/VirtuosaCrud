import React from "react";

import AdminProductsPage from "../../products/AdminProductsPage";

function CardsLabios() {
    return (
        <AdminProductsPage
            title="Labios"
            description="Administra labiales, brillos y productos para labios."
            categorySlug="maquillaje"
            subcategory="labios"
            createPath="/VirtuosaCrud/form-labios"
        />
    );
}

export default CardsLabios;
