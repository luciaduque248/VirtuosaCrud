import React from "react";

import {
    BrowserRouter,
    Navigate,
    Route,
    Routes,
} from "react-router-dom";

import Inicio from "../pages/Inicio";
import Maquillaje from "../pages/Maquillaje";
import Moda from "../pages/Moda";
import Nosotros from "../pages/Nosotros";
import Tips from "../pages/Tips";
import Contacto from "../pages/Contacto";
import Catalog from "../pages/Catalog";
import ProductDetail from "../pages/ProductDetail";
import Favorites from "../pages/Favorites";

import Descuentos from "../pages/ropa/DescuentosRS";
import Tendencias from "../pages/ropa/TendenciasRS";
import Vestidos from "../pages/ropa/VestidosRS";

import Ojos from "../pages/maquillaje/ojos/Ojos";
import Labios from "../pages/maquillaje/labios/Labios";
import Piel from "../pages/maquillaje/cuidadoPiel/Piel";
import Rostro from "../pages/maquillaje/rostro/Rostro";

import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";

import TipsM from "../pages/TipsM";
import TipsR from "../pages/TipsR";

import Login from "../pages/Login";

import ProtectedRoute from "../components/auth/ProtectedRoute";
import ScrollManager from "../components/navigation/ScrollManager";

import InicioAdmin from "../components/Admin/InicioAdmin";
import AdmVS from "../components/Admin/AdmVS";
import AdminOrdersPage from "../components/Admin/orders/AdminOrdersPage";

import FormVestido from "../components/Admin/vestidos/FormVestido";

import CardsDisc from "../components/Admin/descuentos/CardsDisc";
import FormDisc from "../components/Admin/descuentos/FormDisc";

import EditMaquillaje from "../components/Admin/maquillaje/EditMaquillaje";

import CardsOjos from "../components/Admin/maquillaje/ojos/CardsOjos";
import FormOjos from "../components/Admin/maquillaje/ojos/FormOjos";

import CardsRostro from "../components/Admin/maquillaje/rostro/CardsRostro";
import FormRostro from "../components/Admin/maquillaje/rostro/FormRostro";

import CardsLabios from "../components/Admin/maquillaje/labios/CardsLabios";
import FormLabios from "../components/Admin/maquillaje/labios/FormLabios";

import CardsPiel from "../components/Admin/maquillaje/cuidadodelapiel/CardsPiel";
import FormPiel from "../components/Admin/maquillaje/cuidadodelapiel/FormPiel";


function AppRoutes() {
    return (
        <BrowserRouter>
            <ScrollManager />
            <Routes>
                {/* =================================================
            PUBLIC
        ================================================= */}

                <Route
                    path="/VirtuosaCrud/"
                    element={<Inicio />}
                />

                <Route
                    path="/VirtuosaCrud/home"
                    element={
                        <Navigate
                            to="/VirtuosaCrud/"
                            replace
                        />
                    }
                />

                <Route
                    path="/VirtuosaCrud/maquillaje"
                    element={<Maquillaje />}
                />

                <Route
                    path="/VirtuosaCrud/moda"
                    element={<Moda />}
                />

                <Route
                    path="/VirtuosaCrud/tips"
                    element={<Tips />}
                />

                <Route
                    path="/VirtuosaCrud/productos"
                    element={<Catalog />}
                />

                <Route
                    path="/VirtuosaCrud/producto/:id"
                    element={<ProductDetail />}
                />

                <Route
                    path="/VirtuosaCrud/favoritos"
                    element={<Favorites />}
                />

                <Route
                    path="/VirtuosaCrud/tips/maquillaje"
                    element={<TipsM />}
                />

                <Route
                    path="/VirtuosaCrud/tips/ropa"
                    element={<TipsR />}
                />

                <Route
                    path="/VirtuosaCrud/nosotros"
                    element={<Nosotros />}
                />

                <Route
                    path="/VirtuosaCrud/contacto"
                    element={<Contacto />}
                />

                <Route
                    path="/VirtuosaCrud/moda-vestidos"
                    element={<Vestidos />}
                />

                <Route
                    path="/VirtuosaCrud/moda-descuentos"
                    element={<Descuentos />}
                />

                <Route
                    path="/VirtuosaCrud/moda-tendencias"
                    element={<Tendencias />}
                />

                <Route
                    path="/VirtuosaCrud/ojos"
                    element={<Ojos />}
                />

                <Route
                    path="/VirtuosaCrud/labios"
                    element={<Labios />}
                />

                <Route
                    path="/VirtuosaCrud/piel"
                    element={<Piel />}
                />

                <Route
                    path="/VirtuosaCrud/rostro"
                    element={<Rostro />}
                />

                <Route
                    path="/VirtuosaCrud/carrito"
                    element={<Cart />}
                />

                <Route
                    path="/VirtuosaCrud/checkout"
                    element={<Checkout />}
                />

                <Route
                    path="/VirtuosaCrud/login"
                    element={<Login />}
                />

                {/* =================================================
            PROTECTED ADMIN
        ================================================= */}

                <Route
                    element={<ProtectedRoute />}
                >
                    <Route
                        path="/VirtuosaCrud/admin"
                        element={<InicioAdmin />}
                    />

                    <Route
                        path="/VirtuosaCrud/admin/pedidos"
                        element={<AdminOrdersPage />}
                    />

                    <Route
                        path="/VirtuosaCrud/edit-vestidos"
                        element={<AdmVS />}
                    />

                    <Route
                        path="/VirtuosaCrud/form-vestidos"
                        element={<FormVestido />}
                    />

                    <Route
                        path="/VirtuosaCrud/edit-descuentos"
                        element={<CardsDisc />}
                    />

                    <Route
                        path="/VirtuosaCrud/form-descuentos"
                        element={<FormDisc />}
                    />

                    <Route
                        path="/VirtuosaCrud/edit-maquillaje"
                        element={<EditMaquillaje />}
                    />

                    <Route
                        path="/VirtuosaCrud/edit-ojos"
                        element={<CardsOjos />}
                    />

                    <Route
                        path="/VirtuosaCrud/form-ojos"
                        element={<FormOjos />}
                    />

                    <Route
                        path="/VirtuosaCrud/edit-rostro"
                        element={<CardsRostro />}
                    />

                    <Route
                        path="/VirtuosaCrud/form-rostro"
                        element={<FormRostro />}
                    />

                    <Route
                        path="/VirtuosaCrud/edit-labios"
                        element={<CardsLabios />}
                    />

                    <Route
                        path="/VirtuosaCrud/form-labios"
                        element={<FormLabios />}
                    />

                    <Route
                        path="/VirtuosaCrud/edit-cuidadodelapiel"
                        element={<CardsPiel />}
                    />

                    <Route
                        path="/VirtuosaCrud/form-cuidadodelapiel"
                        element={<FormPiel />}
                    />
                </Route>

                {/* =================================================
            404
        ================================================= */}

                <Route
                    path="/VirtuosaCrud/*"
                    element={
                        <Navigate
                            to="/VirtuosaCrud/"
                            replace
                        />
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}


export default AppRoutes;
