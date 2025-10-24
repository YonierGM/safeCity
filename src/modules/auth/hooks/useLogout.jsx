import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { showErrorToast } from "../../shared/toast";

export function useLogout() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const logout = async () => {
        setLoading(true);

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                // showErrorToast("No hay sesión activa.");
                navigate("/login");
                return;
            }

            const response = await fetch("/api/v1/auth/logout", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            // Intenta parsear el JSON solo si hay cuerpo
            let result = null;
            const text = await response.text();
            if (text) {
                result = JSON.parse(text);
            }

            console.log("token enviando:", token, "resultado:", result);

            if (!response.ok) {
                throw new Error(result?.message || "Error al cerrar sesión.");
            }

            // Elimina el token aunque haya error al parsear
            localStorage.removeItem("token");

            showErrorToast("Sesión cerrada correctamente.");
            navigate("/login");
        } catch (error) {
            console.error("Error en logout:", error);
            showErrorToast(error.message || "Error al cerrar sesión.");
            // Aun si hay error, elimina el token para forzar logout local
            localStorage.removeItem("token");
            navigate("/login");
        } finally {
            setLoading(false);
        }
    };

    return { logout, loading };
}
