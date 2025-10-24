import { useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthProvider";

export const useIncidents = () => {
    const { token } = useAuthContext();
    const [incidents, setIncidents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!token) return;

        const fetchIncidents = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await fetch("/api/v1/incidents", {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!res.ok) throw new Error("Error al obtener los incidentes");

                const data = await res.json();
                console.log("Datos de incidentes obtenidos:", data);

                // Mapeamos los datos para tener un formato más sencillo
                const mappedIncidents = data?.data?.map((item) => ({
                    id: item.id,
                    title: item.attributes.title,
                    description: item.attributes.description,
                    status: item.attributes.status,
                    location: item.attributes.location,
                    reportedAt: item.attributes.reported_at,
                    categoryName: item.relationships?.category?.attributes?.name || "Sin categoría",
                    reporterName: `${item.relationships?.reporter?.attributes?.name || ""} ${item.relationships?.reporter?.attributes?.last_name || ""
                        }`.trim(),
                    reporterEmail: item.relationships?.reporter?.attributes?.email || "Desconocido",
                })) || [];

                setIncidents(mappedIncidents);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchIncidents();
    }, [token]);

    return { incidents, loading, error };
};
