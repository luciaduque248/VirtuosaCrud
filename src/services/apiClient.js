import axios from "axios";

import API_BASE_URL from "../utils/peticiones";


export const AUTH_TOKEN_KEY =
    "virtuosa_admin_token";


export const getStoredToken =
    () =>
        localStorage.getItem(
            AUTH_TOKEN_KEY
        );


export const setStoredToken =
    (token) => {
        if (token) {
            localStorage.setItem(
                AUTH_TOKEN_KEY,
                token
            );
        } else {
            localStorage.removeItem(
                AUTH_TOKEN_KEY
            );
        }
    };


/* =========================================================
   API INSTANCE
========================================================= */

const apiClient =
    axios.create({
        baseURL:
            API_BASE_URL,

        timeout:
            10000,

        headers: {
            "Content-Type":
                "application/json",
        },
    });


apiClient.interceptors.request.use(
    (config) => {
        const token =
            getStoredToken();

        if (token) {
            config.headers.Authorization =
                `Bearer ${token}`;
        }

        return config;
    }
);


/* =========================================================
   SUPPORT EXISTING RAW AXIOS CALLS
========================================================= */

/*
  Esto mantiene compatibles los
  componentes de Vestidos que ya
  construimos y que todavía usan
  axios directamente.
*/

axios.interceptors.request.use(
    (config) => {
        const token =
            getStoredToken();

        const url =
            String(
                config.url || ""
            );

        if (
            token &&
            url.startsWith(
                API_BASE_URL
            )
        ) {
            config.headers =
                config.headers ||
                {};

            config.headers.Authorization =
                `Bearer ${token}`;
        }

        return config;
    }
);


/* =========================================================
   SESSION EXPIRATION
========================================================= */

apiClient.interceptors.response.use(
    (response) =>
        response,

    (error) => {
        const status =
            error?.response
                ?.status;

        const url =
            String(
                error?.config
                    ?.url || ""
            );

        if (
            status === 401 &&
            !url.includes(
                "/auth/login"
            ) &&
            getStoredToken()
        ) {
            setStoredToken(
                null
            );

            window.dispatchEvent(
                new Event(
                    "virtuosa:auth-expired"
                )
            );
        }

        return Promise.reject(
            error
        );
    }
);


export default apiClient;