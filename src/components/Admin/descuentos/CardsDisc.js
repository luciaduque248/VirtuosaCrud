import React from "react";

import AdminProductsPage from "../products/AdminProductsPage";

function CardsDisc() {
  return (
    <AdminProductsPage
      title="Descuentos"
      description="Administra los productos y promociones de Virtuosa."
      categorySlug="moda"
      subcategory="descuentos"
      createPath="/VirtuosaCrud/form-descuentos"
    />
  );
}

export default CardsDisc;