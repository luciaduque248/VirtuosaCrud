import React from "react";

import AdminProductForm from "../../products/AdminProductForm";

function FormOjos() {
  return (
    <AdminProductForm
      title="Nuevo producto para ojos"
      categorySlug="maquillaje"
      subcategory="ojos"
      backPath="/VirtuosaCrud/edit-ojos"
    />
  );
}

export default FormOjos;