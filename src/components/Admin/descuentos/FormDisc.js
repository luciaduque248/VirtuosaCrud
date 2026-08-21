import React from "react";

import AdminProductForm from "../products/AdminProductForm";

function FormDisc() {
  return (
    <AdminProductForm
      title="Nuevo producto en descuento"
      categorySlug="moda"
      subcategory="descuentos"
      backPath="/VirtuosaCrud/edit-descuentos"
    />
  );
}

export default FormDisc;