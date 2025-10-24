import { useCategories } from "../hook/useCategories";
import { SlOptionsVertical } from "react-icons/sl";
import { IoAdd } from "react-icons/io5";
import { DataTableSection } from "../components/DataTableSection";

export function Categories() {
    const { categories, loading, error } = useCategories();

    return (
        <DataTableSection
            title="Gestión de categorías"
            description="Esta es la página de gestión de categorías"
            titleTable="Gestión de categorías"
            descriptionTable="Esta es la lista de todas las categorías"
            buttonText={<><IoAdd /> Crear categoría</>}
            onButtonClick={() => console.log("Crear categoría")}
            loading={loading}
            error={error}
            data={categories}
            columns={["Id", "Nombre", "Acciones"]}
            renderRow={(cat) => (
                <tr key={cat.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                        {cat.id}
                    </td>
                    <td className="px-6 py-4 text-lg font-normal text-gray-900 dark:text-gray-100">
                        {cat.attributes.name}
                    </td>
                    <td className="px-6 py-4 flex items-center justify-start gap-6">
                        <button
                            title="Ver detalles"
                            className="text-black hover:text-black dark:hover:text-black cursor-pointer"
                        >
                            <SlOptionsVertical />
                        </button>
                    </td>
                </tr>
            )}
        />
    );
}
