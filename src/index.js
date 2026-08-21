import React from "react";

import ReactDOM from "react-dom/client";

import "./index.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import AppRoutes from "./routes/AppRoutes";

import {
    CartProvider,
} from "./context/CartContext";

const root =
    ReactDOM.createRoot(
        document.getElementById(
            "root"
        )
    );

root.render(
    <CartProvider>
        <AppRoutes />
    </CartProvider>
);