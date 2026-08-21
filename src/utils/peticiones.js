const API_BASE_URL =
    process.env.REACT_APP_API_URL ||
    "http://localhost:4000/api";

/* =========================================================
   PRODUCTS
========================================================= */

export const api =
    `${API_BASE_URL}/products?subcategory=vestidos`;

export const apidiscount =
    `${API_BASE_URL}/products?subcategory=descuentos`;

export const apilabios =
    `${API_BASE_URL}/products?subcategory=labios`;

export const apipiel =
    `${API_BASE_URL}/products?subcategory=piel`;

export const apirostro =
    `${API_BASE_URL}/products?subcategory=rostro`;

export const apiojos =
    `${API_BASE_URL}/products?subcategory=ojos`;

/* =========================================================
   BASE PRODUCTS ENDPOINT
========================================================= */

export const productsApi =
    `${API_BASE_URL}/products`;

export default API_BASE_URL;