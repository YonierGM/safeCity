import { useCategories } from "../hook/useCategories";
import { Loading } from "notiflix/build/notiflix-loading-aio";
import { useEffect } from "react";
import { SlOptionsVertical } from "react-icons/sl";
import { IoAdd } from "react-icons/io5";


export function Categories() {
    const { categories, loading, error } = useCategories();

    useEffect(() => {
        if (loading) {
            Loading.circle("", {
                svgColor: "#000",
                backgroundColor: "rgba(255, 255, 255, 0.7)",
            });
        } else {
            Loading.remove();
        }
    }, [loading]);

    if (error)
        return (
            <p className="text-center text-red-500 mt-6">
                Error: {error || "No se pudieron cargar las categorías."}
            </p>
        );

    return (
        <section className="space-y-6">
            <div className="flex items-center justify-between mb-4">

                <div className="">
                    <h1 className="text-2xl font-bold">Gestión de categorías</h1>
                    <p className="text-md text-gray-600">Esta es la pagina de gestión de categorías</p>
                </div>
                <div className="">
                    <button type="button" className="flex items-center justify-between gap-2 text-white bg-black hover:bg-black focus:ring-4 focus:ring-black font-medium rounded-lg text-sm px-3 py-2.5 me-2 mb-2 dark:bg-black dark:hover:bg-black focus:outline-none dark:focus:ring-black cursor-pointer">
                        <IoAdd className="text-white text-xl" />
                        <p>Crear categoría</p>
                    </button>
                </div>
            </div>
            <div className="md:w-full mx-auto p-4 rounded-2xl shadow-lg space-y-6 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                <div className="title flex flex-col">
                    <p className="text-lg font-semibold text-gray-800 dark:text-gray-100 m-0">
                        Listado de categorías
                    </p>
                    <p className="text-md text-gray-600">Esta es la lista de todas las categorías de incidentes</p>
                </div>

                {categories.length === 0 ? (
                    <p className="text-gray-500 text-center">No hay categorías registradas.</p>
                ) : (
                    <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-md dark:border-gray-700">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-100 dark:bg-gray-700 h-16">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-600 dark:text-gray-300">
                                        Id
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-600 dark:text-gray-300">
                                        Nombre
                                    </th>
                                    <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-600 dark:text-gray-300">
                                        Acciones
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                                {categories.map((cat) => (
                                    <tr key={cat.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                                        <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                                            {cat.id}
                                        </td>
                                        <td className="px-6 py-4 text-lg font-normal text-gray-900 dark:text-gray-100">
                                            {cat.attributes.name}
                                        </td>
                                        <td className="px-6 py-4 text-center flex justify-center gap-6">
                                            <button
                                                title="Ver detalles"
                                                className="text-black hover:text-black dark:hover:text-black cursor-pointer"
                                            >
                                                <SlOptionsVertical />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </section>
    );
};
