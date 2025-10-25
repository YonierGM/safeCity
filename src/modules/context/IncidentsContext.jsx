import { createContext, useContext, useEffect, useState } from "react";
import { useAuthUser } from "../users/hooks/useAuthUser";

// ✅ Crear el contexto
const IncidentsContext = createContext();

// ✅ Hook personalizado para usar el contexto
export function useIncidents() {
    const context = useContext(IncidentsContext);
    if (!context) {
        throw new Error("useIncidents debe usarse dentro de un IncidentsProvider");
    }
    return context;
}

// ✅ Componente Provider
export function IncidentsProvider({ children }) {
    const { user, isAdmin, loadingUser } = useAuthUser(); // 👈 obtenemos usuario e isAdmin desde el hook global

    const [incidents, setIncidents] = useState([]);
    const [loadingIncidents, setLoadingIncidents] = useState(true);
    const [incidentsCategory, setIncidentsCategory] = useState([]);
    const [loadingCategories, setLoadingCategories] = useState(true);
    const [error, setError] = useState(null);

    // 🔹 Cargar incidentes automáticamente
    useEffect(() => {
        if (loadingUser) return; // espera a que termine de cargar el usuario
        if (!user?.id) {
            setLoadingIncidents(false);
            return;
        }

        const fetchIncidents = async () => {
            try {
                setLoadingIncidents(true);
                const token = localStorage.getItem("token");
                const endpoint = isAdmin
                    ? `/api/v1/incidents`
                    : `/api/v1/users/${user.id}/incidents`;

                const response = await fetch(endpoint, {
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data = await response.json();
                if (!response.ok)
                    throw new Error(data?.message || "Error al obtener incidentes");

                setIncidents(data?.data || []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoadingIncidents(false);
            }
        };

        fetchIncidents();
    }, [user?.id, isAdmin, loadingUser]);

    // 🔹 Obtener categorías de incidentes
    const getIncidentsCategory = async () => {
        try {
            setLoadingCategories(true);
            const token = localStorage.getItem("token");
            const response = await fetch(`/api/v1/incidentCategories`, {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.json();
            if (!response.ok)
                throw new Error(data?.message || "Error al obtener categorías");

            setIncidentsCategory(data?.data || []);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoadingCategories(false);
        }
    };

    const createIncident = async (incidentData) => {
        try {
            setLoadingIncidents(true);
            const token = localStorage.getItem("token");

            // 🔹 Crear incidente
            const response = await fetch(`/api/v1/incidents`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(incidentData),
            });

            const data = await response.json();
            if (!response.ok)
                throw new Error(data?.message || "Error al crear incidente");

            // 🔹 Reconsultar incidente con relaciones (categoría incluida)
            const fetchFullIncident = await fetch(`/api/v1/incidents/${data.data.id}`, {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const fullIncident = await fetchFullIncident.json();

            // 🔹 Actualizar lista local con el incidente completo
            setIncidents((prev) => [...prev, fullIncident.data]);

            return fullIncident;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoadingIncidents(false);
        }
    };


    return (
        <IncidentsContext.Provider
            value={{
                user,
                isAdmin,
                incidents,
                setIncidents,
                loadingIncidents,
                incidentsCategory,
                loadingCategories,
                getIncidentsCategory,
                createIncident,
                error,
            }}
        >
            {children}
        </IncidentsContext.Provider>
    );
}
