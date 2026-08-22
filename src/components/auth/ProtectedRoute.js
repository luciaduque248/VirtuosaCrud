import React from "react";

import {
    Navigate,
    Outlet,
    useLocation,
} from "react-router-dom";

import {
    useAuth,
} from "../../context/AuthContext";


function ProtectedRoute({ allowedRoles }) {
    const {
        loading,
        isAuthenticated,
        user,
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

    if (allowedRoles?.length && !allowedRoles.includes(user?.role)) {
        return (
            <Navigate
                to={user?.role === "admin" ? "/VirtuosaCrud/admin" : "/VirtuosaCrud/mi-cuenta"}
                replace
            />
        );
    }


    return <Outlet />;
}


export default ProtectedRoute;
