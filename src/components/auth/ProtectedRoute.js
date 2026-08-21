import React from "react";

import {
    Navigate,
    Outlet,
    useLocation,
} from "react-router-dom";

import {
    useAuth,
} from "../../context/AuthContext";


function ProtectedRoute() {
    const {
        loading,
        isAuthenticated,
    } = useAuth();

    const location =
        useLocation();


    if (loading) {
        return (
            <div
                style={{
                    minHeight:
                        "100vh",

                    display:
                        "grid",

                    placeItems:
                        "center",
                }}
            >
                Verificando sesión...
            </div>
        );
    }


    if (
        !isAuthenticated
    ) {
        return (
            <Navigate
                to="/VirtuosaCrud/login"
                replace
                state={{
                    from:
                        location,
                }}
            />
        );
    }


    return <Outlet />;
}


export default ProtectedRoute;