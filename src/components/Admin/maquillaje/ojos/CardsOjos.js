import React from "react";

import AdminProductsPage from "../../products/AdminProductsPage";

function CardsOjos() {
    return (
        <AdminProductsPage
            title="Ojos"
            description="Administra sombras, máscaras y productos para ojos."
            categorySlug="maquillaje"
            subcategory="ojos"
            createPath="/VirtuosaCrud/form-ojos"
        />
    );
}

export default CardsOjos;