import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import apiClient from "../services/apiClient";
import Logo from "../components/assets/img/logo 1.svg";
import "../components/assets/css/PasswordRecovery.css";

function PasswordRecovery() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token") || "";
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmation, setConfirmation] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(""); setMessage("");
        if (token && password !== confirmation) { setError("Las contraseñas no coinciden."); return; }
        try {
            setLoading(true);
            const response = token ? await apiClient.post("/auth/reset-password", { token, password }) : await apiClient.post("/auth/forgot-password", { email });
            setMessage(response?.data?.message || "Solicitud procesada.");
        } catch (requestError) { setError(requestError?.response?.data?.message || "No fue posible procesar la solicitud."); }
        finally { setLoading(false); }
    };

    return <main className="recovery-page"><section className="recovery-card"><img src={Logo} alt="Virtuosa" /><span>Acceso administrativo</span><h1>{token ? "Crea una nueva contraseña" : "Recupera tu acceso"}</h1><p>{token ? "Usa al menos 10 caracteres." : "Te enviaremos un enlace seguro si el correo está registrado."}</p><form onSubmit={handleSubmit}>{token ? <><label>Nueva contraseña<input type="password" minLength="10" value={password} onChange={(event) => setPassword(event.target.value)} required /></label><label>Confirmar contraseña<input type="password" minLength="10" value={confirmation} onChange={(event) => setConfirmation(event.target.value)} required /></label></> : <label>Correo electrónico<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required autoFocus /></label>} {error ? <div className="recovery-message error" role="alert">{error}</div> : null}{message ? <div className="recovery-message success" role="status">{message}</div> : null}<button disabled={loading}>{loading ? "Procesando…" : token ? "Actualizar contraseña" : "Enviar enlace"}</button></form><Link to="/VirtuosaCrud/login">← Volver al inicio de sesión</Link></section></main>;
}

export default PasswordRecovery;
