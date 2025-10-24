// src/modules/auth/hooks/useAuthUser.js
import { useEffect, useState } from "react";
import { showErrorToast } from "../../shared/toast";

export function useAuthUser() {
    const [user, setUser] = useState(null);
    const [loadingUser, setLoadingUser] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            setLoadingUser(false);
            return;
        }

        const fetchUser = async () => {
            try {
                const response = await fetch("/api/v1/auth/me", {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data = await response.json();
                const email = data?.data?.attributes?.email;

                if (!response.ok) {
                    throw new Error("No se pudo obtener la información del usuario.");
                }

                setUser(email ? { email } : null);
            } catch (error) {
                showErrorToast(error.message);
                setError(error.message);
            } finally {
                setLoadingUser(false);
            }
        };

        fetchUser();
    }, []);

    return { user, loadingUser, error };
}
