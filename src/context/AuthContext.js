import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";

import apiClient, {
    getStoredToken,
    setStoredToken,
} from "../services/apiClient";


const AuthContext =
    createContext(null);


export function AuthProvider({
    children,
}) {
    const [
        user,
        setUser,
    ] = useState(null);

    const [
        loading,
        setLoading,
    ] = useState(true);


    /* =======================================================
       LOGOUT
    ======================================================= */

    const logout =
        useCallback(() => {
            setStoredToken(
                null
            );

            setUser(null);
        }, []);


    /* =======================================================
       RESTORE SESSION
    ======================================================= */

    useEffect(() => {
        const restoreSession =
            async () => {
                const token =
                    getStoredToken();

                if (!token) {
                    setLoading(false);
                    return;
                }

                try {
                    const response =
                        await apiClient.get(
                            "/auth/me"
                        );

                    setUser(
                        response.data.user
                    );
                } catch (error) {
                    logout();
                } finally {
                    setLoading(false);
                }
            };

        restoreSession();
    }, [logout]);


    /* =======================================================
       EXPIRED EVENT
    ======================================================= */

    useEffect(() => {
        const handleExpired =
            () => {
                setUser(null);
            };

        window.addEventListener(
            "virtuosa:auth-expired",
            handleExpired
        );

        return () =>
            window.removeEventListener(
                "virtuosa:auth-expired",
                handleExpired
            );
    }, []);


    /* =======================================================
       LOGIN
    ======================================================= */

    const login =
        useCallback(
            async (
                email,
                password
            ) => {
                const response =
                    await apiClient.post(
                        "/auth/login",
                        {
                            email,
                            password,
                        }
                    );

                const {
                    token,
                    user:
                    loggedUser,
                } =
                    response.data;

                setStoredToken(
                    token
                );

                setUser(
                    loggedUser
                );

                return loggedUser;
            },
            []
        );


    const value =
        useMemo(
            () => ({
                user,

                loading,

                isAuthenticated:
                    Boolean(user),

                login,

                logout,
            }),
            [
                user,
                loading,
                login,
                logout,
            ]
        );


    return (
        <AuthContext.Provider
            value={value}
        >
            {children}
        </AuthContext.Provider>
    );
}


export function useAuth() {
    const context =
        useContext(
            AuthContext
        );

    if (!context) {
        throw new Error(
            "useAuth debe utilizarse dentro de AuthProvider."
        );
    }

    return context;
}