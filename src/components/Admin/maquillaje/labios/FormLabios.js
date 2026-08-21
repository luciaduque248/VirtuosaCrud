import React from "react";

import AdminProductForm from "../../products/AdminProductForm";

function FormLabios() {
  return (
    <AdminProductForm
      title="Nuevo producto para labios"
      categorySlug="maquillaje"
      subcategory="labios"
      backPath="/VirtuosaCrud/edit-labios"
    />
  );
}

export default FormLabios;