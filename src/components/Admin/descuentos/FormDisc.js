import React from "react";

import AdminProductForm from "../products/AdminProductForm";

function FormDisc() {
  return (
    <AdminProductForm
      title="Nuevo producto en descuento"
      categorySlug="moda"
      subcategory="vestidos"
      initialOnSale
      allowTaxonomy
      backPath="/VirtuosaCrud/edit-descuentos"
    />
  );
}

export default FormDisc;
