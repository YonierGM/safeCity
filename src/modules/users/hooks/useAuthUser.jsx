import { useEffect, useState } from "react";
import { showErrorToast } from "../../shared/toast";

export function useAuthUser() {
    const [user, setUser] = useState(null);
    const [loadingUser, setLoadingUser] = useState(true);
    const [error, setError] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);

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

                if (!response.ok) {
                    throw new Error("No se pudo obtener la información del usuario.");
                }

                const userData = data?.data;
                const attributes = userData?.attributes;
                const roles = userData?.relationships?.roles || [];

                // Verifica si alguno de los roles tiene name === "admin"
                const isAdminUser = roles.some(
                    (role) => role?.attributes?.name?.toLowerCase() === "admin"
                );

                setUser({
                    id: userData?.id,
                    name: attributes?.name,
                    lastName: attributes?.last_name,
                    email: attributes?.email,
                    roles: roles.map((r) => r.attributes?.name),
                });

                setIsAdmin(isAdminUser);
            } catch (error) {
                showErrorToast(error.message);
                setError(error.message);
            } finally {
                setLoadingUser(false);
            }
        };

        fetchUser();
    }, []);

    return { user, isAdmin, loadingUser, error };
}
