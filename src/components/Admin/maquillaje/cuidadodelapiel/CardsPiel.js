import React from "react";

import AdminProductsPage from "../../products/AdminProductsPage";

function CardsPiel() {
  return (
    <AdminProductsPage
      title="Cuidado de la piel"
      description="Administra los productos de skin care de Virtuosa."
      categorySlug="maquillaje"
      subcategory="piel"
      createPath="/VirtuosaCrud/form-cuidadodelapiel"
    />
  );
}

export default CardsPiel;