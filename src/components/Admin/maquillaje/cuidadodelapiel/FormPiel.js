import React from "react";

import AdminProductForm from "../../products/AdminProductForm";

function FormPiel() {
  return (
    <AdminProductForm
      title="Nuevo producto de skin care"
      categorySlug="maquillaje"
      subcategory="piel"
      backPath="/VirtuosaCrud/edit-cuidadodelapiel"
    />
  );
}

export default FormPiel;