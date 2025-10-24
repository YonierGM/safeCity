import { useCategories } from "../hook/useCategories";
import { SlOptionsVertical } from "react-icons/sl";
import { IoAdd } from "react-icons/io5";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";


export function Categories() {
    const { categories, loading, error } = useCategories();

    return (
        <section className="space-y-6">
            <div className="flex items-center justify-between mb-4">

                <div className="">
                    <h1 className="text-2xl font-bold">Gestión de categorías</h1>
                    <p className="text-md text-gray-600">Esta es la pagina de gestión de categorías</p>
                </div>
                <div className="">
                    <button type="button" className="flex items-center justify-between gap-2 text-white bg-black hover:bg-black focus:ring-4 focus:ring-black font-medium rounded-lg text-sm px-3 py-2.5 dark:bg-black dark:hover:bg-black focus:outline-none dark:focus:ring-black cursor-pointer">
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

                {error ? (
                    <div className="flex items-center justify-center bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 text-red-600 dark:text-red-400 rounded-xl p-4 mt-6 shadow-sm">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5 mr-2 text-red-500 dark:text-red-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01M5.93 19h12.14a2 2 0 001.73-3l-6.07-10a2 2 0 00-3.46 0L4.2 16a2 2 0 001.73 3z" />
                        </svg>
                        <p className="text-sm font-medium">
                            {error || "No se pudieron cargar las categorías. Inténtalo nuevamente."}
                        </p>
                    </div>
                ) : loading ? (
                    <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-md dark:border-gray-700 p-4">
                        <table className="min-w-full">
                            <thead className="bg-gray-100 dark:bg-gray-700 h-16">
                                <tr>
                                    <th><Skeleton width={30} /></th>
                                    <th><Skeleton width={150} /></th>
                                    <th><Skeleton width={100} /></th>
                                </tr>
                            </thead>
                            <tbody>
                                {[...Array(5)].map((_, i) => (
                                    <tr key={i}>
                                        <td><Skeleton width={30} /></td>
                                        <td><Skeleton width={150} /></td>
                                        <td><Skeleton width={100} /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-md dark:border-gray-700">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-100 dark:bg-gray-700 h-16">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-600 dark:text-gray-300">Id</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-600 dark:text-gray-300">Nombre</th>
                                    <th className="px-6 py-3 text-center text-xs font-medium tracking-wider text-gray-600 dark:text-gray-300">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                                {categories.map((cat) => (
                                    <tr key={cat.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                                        <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">{cat.id}</td>
                                        <td className="px-6 py-4 text-lg font-normal text-gray-900 dark:text-gray-100">{cat.attributes.name}</td>
                                        <td className="px-6 py-4 text-center flex items-center justify-center gap-6">
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
        </section >
    );
};
