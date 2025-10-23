import { useState } from "react";
import { showErrorToast } from "../../shared/toast";

export function useAuth() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token") || null);

    const loginHook = async (email, password) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch("/api/v1/login", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                // Obtener mensaje de error del backend
                let errorMsg =
                    data.errors?.email?.[0] ||
                    data.message ||
                    "Error al iniciar sesión";

                // Traducción de errores comunes
                if (errorMsg === "The provided credentials are incorrect.") {
                    errorMsg = "Las credenciales proporcionadas son incorrectas.";
                }

                throw new Error(errorMsg);
            }

            const accessToken = data?.data?.attributes?.access_token;
            if (!accessToken) throw new Error("Token no recibido.");

            localStorage.setItem("token", accessToken);
            setToken(accessToken);
            return accessToken;
        } catch (err) {
            setError(err.message);
            showErrorToast(err.message);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return {
        loginHook,
        token,
        loading,
        error,
    };
}
