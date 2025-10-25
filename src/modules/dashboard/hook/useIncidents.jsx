import { useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthProvider";
import { get } from "flowbite-react/helpers/get";

export const useIncidents = () => {
    const { token } = useAuthContext();
    const [incidents, setIncidents] = useState([]);
    const [incidentsCategory, setIncidentsCategory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Obtener todos los incidentes
    const getIncidents = async () => {
        if (!token) return;
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
            console.log("incidentes: ", data);

            const mappedIncidents =
                data?.data?.map((item) => ({
                    id: item.id,
                    title: item.attributes.title,
                    description: item.attributes.description,
                    status: item.attributes.status,
                    location: item.attributes.location,
                    reportedAt: item.attributes.reported_at,
                    categoryName:
                        item.relationships?.category?.attributes?.name || "Sin categoría",
                    reporterName: `${item.relationships?.reporter?.attributes?.name || ""} ${item.relationships?.reporter?.attributes?.last_name || ""
                        }`.trim(),
                    reporterEmail:
                        item.relationships?.reporter?.attributes?.email || "Desconocido",
                })) || [];

            setIncidents(mappedIncidents);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Obtener las categorias de incidentes
    const getIncidentsCategory = async () => {
        if (!token) return;
        setLoading(true);
        setError(null);
        try {
            const res = await fetch("/api/v1/incidentCategories", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!res.ok) throw new Error("Error al obtener las categproas de incidentes");

            const data = await res.json();
            console.log("categorias: ", data);

            const mappedIncidentsCategory =
                data?.data?.map((item) => ({
                    id: item.id,
                    name: item.attributes.name,
                })) || [];

            setIncidentsCategory(mappedIncidentsCategory);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Crear un nuevo incidente
    const createIncident = async (incidentData) => {
        if (!token) throw new Error("Token no disponible");

        try {
            const res = await fetch("/api/v1/incidents", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(incidentData),
            });

            if (!res.ok) throw new Error("Error al crear el incidente");

            const newIncident = await res.json();
            console.log("Nuevo incidente creado: ", newIncident);

            // Opcional: refrescar la lista
            await getIncidents();

            return newIncident;
        } catch (err) {
            setError(err.message);
            throw err;
        }
    };

    // Cargar incidentes al inicio
    useEffect(() => {
        getIncidents();
    }, [token]);

    return {
        incidents,
        incidentsCategory,
        loading,
        error,
        getIncidents,
        getIncidentsCategory,
        createIncident,
    };
};
