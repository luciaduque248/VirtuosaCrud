import React, {
    useState,
} from "react";

import {
    Link,
    useLocation,
    useNavigate,
} from "react-router-dom";

import Logo from "../components/assets/img/logo 1.svg";

import {
    useAuth,
} from "../context/AuthContext";

import {
    errorAlert,
} from "../utils/alerts";

import "../components/assets/css/Login.css";


function Login() {
    const navigate =
        useNavigate();

    const location =
        useLocation();

    const {
        login,
    } = useAuth();

    const [
        email,
        setEmail,
    ] = useState("");

    const [
        password,
        setPassword,
    ] = useState("");

    const [
        loading,
        setLoading,
    ] = useState(false);


    const handleSubmit =
        async (
            event
        ) => {
            event.preventDefault();

            if (
                !email.trim() ||
                !password
            ) {
                await errorAlert(
                    "Datos incompletos",
                    "Ingresa correo y contraseña."
                );

                return;
            }

            try {
                setLoading(true);

                await login(
                    email.trim(),
                    password
                );

                const destination =
                    location.state
                        ?.from
                        ?.pathname ||
                    "/VirtuosaCrud/admin";

                navigate(
                    destination,
                    {
                        replace:
                            true,
                    }
                );
            } catch (error) {
                console.error(
                    "Login error:",
                    error
                );

                await errorAlert(
                    "No pudimos iniciar sesión",
                    error?.response
                        ?.data
                        ?.message ||
                    "Verifica tus credenciales."
                );
            } finally {
                setLoading(false);
            }
        };


    return (
        <div className="bg-login">
            <form
                className="formulario-login"
                onSubmit={
                    handleSubmit
                }
            >
                <img
                    src={Logo}
                    alt="Virtuosa"
                />

                <h1>
                    Inicia sesión
                </h1>

                <p>
                    Acceso al panel
                    administrativo de
                    Virtuosa
                </p>

                <div className="form-login-group">
                    <label htmlFor="email">
                        Email
                    </label>

                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={
                            email
                        }
                        onChange={(
                            event
                        ) =>
                            setEmail(
                                event.target
                                    .value
                            )
                        }
                        placeholder="admin@virtuosa.com"
                        autoComplete="email"
                        required
                    />
                </div>

                <div className="form-login-group">
                    <label htmlFor="password">
                        Contraseña
                    </label>

                    <input
                        id="password"
                        name="password"
                        type="password"
                        value={
                            password
                        }
                        onChange={(
                            event
                        ) =>
                            setPassword(
                                event.target
                                    .value
                            )
                        }
                        placeholder="Ingresa tu contraseña"
                        autoComplete="current-password"
                        required
                    />
                </div>

                <div className="botones-login">
                    <button
                        type="submit"
                        disabled={
                            loading
                        }
                    >
                        {loading
                            ? "Ingresando..."
                            : "Iniciar sesión"}
                    </button>

                    <div className="volver-login">
                        <Link to="/VirtuosaCrud/">
                            Volver al inicio
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    );
}


export default Login;