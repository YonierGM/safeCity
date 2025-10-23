import { useState } from "react";
import { showErrorToast } from "../../shared/toast";

export function useResetPassword() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    const resetPasswordHook = async (data) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch("/api/v1/reset-password", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: data.email,
                    token: data.token,
                    password: data.password,
                    password_confirmation: data.password_confirmation,
                }),
            });
            console.log("data enviada desde hook:", data);

            const result = await response.json();

            if (!response.ok) {
                const errorMsg =
                    result?.message ||
                    result?.error ||
                    "Error al restablecer la contraseña.";
                throw new Error(errorMsg);
            }

            showErrorToast("✅ Contraseña actualizada correctamente.");
            return result;
        } catch (err) {
            setError(err.message);
            showErrorToast(err.message);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { resetPasswordHook, loading, error };
}
