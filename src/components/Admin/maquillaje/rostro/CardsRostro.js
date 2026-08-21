import React from "react";

import AdminProductsPage from "../../products/AdminProductsPage";

function CardsRostro() {
    return (
        <AdminProductsPage
            title="Rostro"
            description="Administra bases, rubores y productos para el rostro."
            categorySlug="maquillaje"
            subcategory="rostro"
            createPath="/VirtuosaCrud/form-rostro"
        />
    );
}

export default CardsRostro;