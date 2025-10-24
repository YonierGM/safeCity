import { useIncidents } from "../hook/useIncidents";
import { IoAdd } from "react-icons/io5";
import { DataTableSection } from "../components/DataTableSection";
import { SlOptionsVertical } from "react-icons/sl";

export function Incidents() {
    const { incidents, loading, error } = useIncidents();

    return (
        <DataTableSection
            title="Gestión de incidentes"
            description="Esta es la página de gestión de incidentes"
            titleTable="Gestión de incidentes"
            descriptionTable="Esta es la lista todos los incidentes"
            buttonText={<><IoAdd /> Crear incidente</>}
            onButtonClick={() => console.log("Crear incidente")}
            loading={loading}
            error={error}
            data={incidents}
            columns={[
                "ID",
                "Reporte",
                "Categoría",
                "Estado",
                "Fecha del reporte",
                "Acciones",
            ]}
            renderRow={(inc) => (
                <tr key={inc.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="px-6 py-4 text-sm">{inc.id}</td>
                    <td className="px-6 py-4">{inc.description}</td>
                    <td className="px-6 py-4">{inc.categoryName}</td>
                    <td className="px-6 py-4">
                        <span>
                            <span className={`inline-block px-3 rounded-full ${inc.status === "Abierto" ? "bg-green-500 text-green-900" : inc.status === "reported" ? "bg-violet-400 text-violet-900" : inc.status === "En progreso" ? "bg-yellow-500 text-yellow-900" : "bg-gray-500 text-gray-900"}`}>

                                {inc.status}
                            </span>
                        </span>
                    </td>
                    <td className="px-6 py-4">
                        {new Date(inc.reportedAt).toLocaleString("es-CO", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                        })}
                    </td>
                    <td className="px-6 py-4 text-center">
                        <button className="text-black hover:text-gray-700"><SlOptionsVertical /></button>
                    </td>
                </tr>
            )}
        />
    );
}
