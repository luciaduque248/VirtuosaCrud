import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import Logo from "../components/assets/img/logo 1.svg";
import { useAuth } from "../context/AuthContext";
import { errorAlert } from "../utils/alerts";

import "../components/assets/css/Login.css";

function Login() {
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!email.trim() || !password) {
            await errorAlert("Datos incompletos", "Ingresa correo y contraseña.");
            return;
        }

        try {
            setLoading(true);
            await login(email.trim(), password);
            const destination = location.state?.from?.pathname || "/VirtuosaCrud/admin";
            navigate(destination, { replace: true });
        } catch (error) {
            console.error("Login error:", error);
            await errorAlert(
                "No pudimos iniciar sesión",
                error?.response?.data?.message || "Verifica tus credenciales."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="login-page">
            <section className="login-story" aria-label="Universo Virtuosa">
                <Link className="login-back" to="/VirtuosaCrud/">
                    <i className="fa-solid fa-arrow-left" aria-hidden="true" />
                    Volver a la tienda
                </Link>
                <div className="login-story-copy">
                    <span>Virtuosa Studio</span>
                    <h1>Gestiona una experiencia tan única como tu marca.</h1>
                    <p>Productos, pedidos y clientes en un solo lugar.</p>
                </div>
                <span className="login-story-index" aria-hidden="true">V / 26</span>
            </section>

            <section className="login-access" aria-labelledby="login-title">
                <form className="login-form" onSubmit={handleSubmit}>
                    <img className="login-logo" src={Logo} alt="Virtuosa" />
                    <div className="login-heading">
                        <span>Acceso privado</span>
                        <h2 id="login-title">Bienvenida de nuevo</h2>
                        <p>Ingresa tus datos para continuar al panel administrativo.</p>
                    </div>

                    <div className="login-field">
                        <label htmlFor="email">Correo electrónico</label>
                        <div className="login-input">
                            <i className="fa-regular fa-envelope" aria-hidden="true" />
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                placeholder="nombre@virtuosa.com"
                                autoComplete="username"
                                inputMode="email"
                                autoFocus
                                required
                            />
                        </div>
                    </div>

                    <div className="login-field">
                        <label htmlFor="password">Contraseña</label>
                        <div className="login-input">
                            <i className="fa-solid fa-lock" aria-hidden="true" />
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                placeholder="Ingresa tu contraseña"
                                autoComplete="current-password"
                                required
                            />
                            <button
                                className="login-password-toggle"
                                type="button"
                                onClick={() => setShowPassword((visible) => !visible)}
                                aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                                aria-pressed={showPassword}
                            >
                                <i className={`fa-regular ${showPassword ? "fa-eye-slash" : "fa-eye"}`} aria-hidden="true" />
                            </button>
                        </div>
                    </div>

                    <button className="login-submit" type="submit" disabled={loading}>
                        <span>{loading ? "Verificando acceso..." : "Ingresar al panel"}</span>
                        {loading ? null : <i className="fa-solid fa-arrow-right" aria-hidden="true" />}
                    </button>

                    <p className="login-security">
                        <i className="fa-solid fa-shield-halved" aria-hidden="true" />
                        Conexión protegida. Solo personal autorizado.
                    </p>
                    <span className="sr-only" role="status" aria-live="polite">
                        {loading ? "Verificando tus credenciales" : ""}
                    </span>
                </form>
            </section>
        </main>
    );
}

export default Login;
