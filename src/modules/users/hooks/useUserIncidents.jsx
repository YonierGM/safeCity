import { useEffect, useState } from "react";
import { showErrorToast } from "../../shared/toast";

export function useUserIncidents(userId, isAdmin) {
    const [incidents, setIncidents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!userId) {
            setLoading(false);
            return;
        }

        const fetchIncidents = async () => {
            try {
                const token = localStorage.getItem("token");
                const endpoint = isAdmin
                    ? `/api/v1/incidents`
                    : `/api/v1/users/${userId}/incidents`;

                const response = await fetch(endpoint, {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data?.message || "Error al obtener los incidentes");
                }

                setIncidents(data?.data || []);
            } catch (err) {
                showErrorToast(err.message);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchIncidents();
    }, [userId, isAdmin]);

    return { incidents, loading, error };
}

