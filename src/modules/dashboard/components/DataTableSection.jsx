import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { ModalCreateInciden } from "./ModalCreateInciden";

export function DataTableSection({
    title,
    description,
    titleTable,
    descriptionTable,
    buttonText,
    loading,
    error,
    data,
    columns,
    renderRow,
}) {
    return (
        <section className="space-y-6">
            {/* 🔹 Header section */}
            <div className="flex items-center justify-between mb-4">
                <div>
                    {loading ? (
                        <>
                            <Skeleton width={200} height={28} />
                            <Skeleton width={300} height={18} />
                        </>
                    ) : (
                        <>
                            <h1 className="text-2xl font-bold">{title}</h1>
                            <p className="text-md text-gray-600">{description}</p>
                        </>
                    )}
                </div>

                <div>
                    {!loading && (
                        <ModalCreateInciden
                            buttonText={buttonText}
                        />
                    )}
                </div>
            </div>

            {/* 🔹 Table section */}
            <div className="md:w-full mx-auto p-4 rounded-2xl shadow-lg space-y-6 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                <div className="title flex flex-col">
                    {loading ? (
                        <>
                            <Skeleton width={150} height={22} />
                            <Skeleton width={250} height={16} />
                        </>
                    ) : (
                        <>
                            <p className="text-lg font-semibold text-gray-800 dark:text-gray-100 m-0">
                                {titleTable}
                            </p>
                            <p className="text-md text-gray-600">{descriptionTable}</p>
                        </>
                    )}
                </div>

                {error ? (
                    <div className="flex items-center justify-center bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 text-red-600 dark:text-red-400 rounded-xl p-4 mt-6 shadow-sm">
                        <p className="text-sm font-medium">
                            {error || "No se pudieron cargar los datos. Inténtalo nuevamente."}
                        </p>
                    </div>
                ) : loading ? (
                    <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-md dark:border-gray-700 p-4">
                        <table className="min-w-full">
                            <thead className="bg-gray-100 dark:bg-gray-700 h-16">
                                <tr>
                                    {columns.map((_, i) => (
                                        <th key={i}>
                                            <Skeleton width={100} />
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {[...Array(5)].map((_, i) => (
                                    <tr key={i}>
                                        {columns.map((_, j) => (
                                            <td key={j}>
                                                <Skeleton width={100} />
                                            </td>
                                        ))}
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
                                    {columns.map((col) => (
                                        <th
                                            key={col}
                                            className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-600 dark:text-gray-300"
                                        >
                                            {col}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                                {data.map((item) => renderRow(item))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </section>
    );
}
