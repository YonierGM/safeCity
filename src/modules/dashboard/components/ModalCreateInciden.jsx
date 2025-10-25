import { useEffect, useState } from "react";
import { useIncidents } from "../../context/IncidentsContext";

import { LocationPicker } from "./LocationInput";
import { FaLocationDot } from "react-icons/fa6";
import { registerIncidentSchema } from "../schemas/registerIncidentSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export function ModalCreateInciden({ buttonText }) {
    const { incidentsCategory, getIncidentsCategory, createIncident, loading } = useIncidents();
    const [location, setLocation] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    console.log("categorias desde component: ", incidentsCategory)

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(registerIncidentSchema),
    });

    // useEffect(() => {
    //     getIncidentsCategory();
    // }, []);

    useEffect(() => {
        if (location) setValue("location", location);
    }, [location, setValue]);

    const onSubmit = async (data) => {
        const incidentData = {
            category_id: data.category_id,
            description: data.description,
            location: data.location,
        };

        await createIncident(incidentData);

        reset();
        setIsOpen(false);
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-2 text-white bg-black hover:bg-black focus:ring-4 focus:ring-black font-medium rounded-lg text-sm px-3 py-2.5 dark:bg-black dark:hover:bg-black focus:outline-none dark:focus:ring-black cursor-pointer"
                type="button"
            >
                {buttonText}
            </button>

            {isOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
                    onClick={(e) => { if (e.target === e.currentTarget) setIsOpen(false); }}
                >
                    <div className="relative p-4 w-full max-w-2xl bg-white rounded-lg shadow-sm dark:bg-gray-700 max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between p-4 md:p-5 border-b border-gray-200 dark:border-gray-600 rounded-t">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                Crear nuevo incidente
                            </h3>
                            <button type="button" onClick={() => setIsOpen(false)}
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                                ✕
                            </button>
                        </div>

                        <div className="p-4 md:p-5 space-y-4">
                            <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
                                <label htmlFor="category_id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Categoría
                                </label>
                                <select
                                    id="category_id"
                                    {...register("category_id", { valueAsNumber: true })}
                                    className="block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
                                >
                                    {loading ? (
                                        <option>Cargando categorías...</option>
                                    ) : (
                                        incidentsCategory.map((cat) => (
                                            <option key={cat.id} value={cat.id}>{cat?.attributes?.name}</option>
                                        ))
                                    )}
                                </select>
                                {errors.category_id && <p className="text-red-400 text-xs">{errors.category_id.message}</p>}

                                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Descripción
                                </label>
                                <textarea
                                    id="description"
                                    {...register("description")}
                                    rows="4"
                                    className="block p-2.5 w-full mb-6 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
                                    placeholder="Tu descripción"
                                />
                                {errors.description && <p className="text-red-400 text-xs">{errors.description.message}</p>}

                                <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Ubicación
                                </p>
                                <LocationPicker onChange={setLocation} />
                                {location && (
                                    <div className="text-sm text-gray-700 flex items-center gap-2 mt-2 bg-gray-100 rounded-lg p-2">
                                        <FaLocationDot />
                                        <div>
                                            <p>Ubicación seleccionada</p>
                                            {location.coordinates[1].toFixed(5)}, {location.coordinates[0].toFixed(5)}
                                        </div>
                                    </div>
                                )}
                                {errors.location && <p className="text-red-400 text-xs">{errors.location.message}</p>}

                                <div className="flex items-center justify-end pt-4 border-t mt-4">
                                    <button type="button" onClick={() => setIsOpen(false)}
                                        className="py-2.5 px-5 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100">
                                        Cancelar
                                    </button>
                                    <button type="submit"
                                        className="ms-3 text-white bg-black hover:bg-black focus:ring-4 focus:ring-black font-medium rounded-lg text-sm px-8 py-2.5">
                                        Crear
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
