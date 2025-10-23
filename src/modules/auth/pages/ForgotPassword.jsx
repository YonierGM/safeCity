import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForgotPassword } from "../hooks/useForgotPassword";

import { Link } from "react-router-dom";
import { Aside } from "../components/Aside";

import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { useEffect } from "react";
import { forgotPasswordSchema } from "../schemas/forgotPasswordSchema";
import { useAuthContext } from "../../context/AuthProvider";
export function ForgotPassword() {

    const { forgotPasswordHook, loading, error } = useForgotPassword();
    const { logout } = useAuthContext();

    const token = localStorage.getItem("token");

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(forgotPasswordSchema),
    });

    useEffect(() => {
        if (loading) {
            Loading.circle("", {
                svgColor: "#000000",
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                clickToClose: false,
            });
        } else {
            Loading.remove();
        }
    }, [loading]);

    const onSubmit = async (data) => {
        const result = await forgotPasswordHook(data.email);
        if (result) {
            reset();
        }
    };

    const asideContent = {
        title: "Recupera tu acceso y mantente conectado",
        description: "En SafeCity, sabemos que la seguridad también está en tu cuenta. Restablece tu contraseña y vuelve a reportar, validar y mantenerte informado en tiempo real.",
        phrase: "Tu seguridad digital también cuenta",
        urlImage: "/image-forgot-password.webp",
    };

    return (
        <div>
            <section className="bg-gray-50 dark:bg-gray-900 h-dvh">
                <div className="mx-auto grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                    <Aside {...asideContent} />
                    <div>
                        <div className="w-full mx-auto lg:max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow-xl dark:bg-gray-800">
                            <div className="header-login gap-2 flex flex-col">
                                <div className="logo mx-auto w-8">
                                    <img src="/logo-login.webp" alt="" />
                                </div>
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white text-center">
                                    Restablecer contraseña
                                </h2>
                                <p className="text-base font-normal text-gray-400 dark:text-white text-center">Ingresa tu correo electrónico para restablecer tu contraseña, se le enviará un enlace de restablecimiento.</p>

                            </div>

                            <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Correo electrónico</label>
                                    <input type="email" {...register("email")} name="email" id="email" className="bg-gray-50 border px-3 py-1 text-base border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="tucorreo@ejemplo.com" required />

                                    {errors.email && <p className="text-shadow-amber-800 text-red-400 text-xs">{errors.email.message}</p>}
                                </div>

                                <div className="flex flex-col gap-2">

                                    <button type="submit" disabled={loading} className="w-full px-5 py-2 m-0 text-base font-medium text-center text-white bg-black rounded-lg hover:opacity-95 focus:ring-4 focus:ring-black sm:w-full dark:bg-black dark:hover:bg-black dark:focus:ring-black cursor-pointer">
                                        {loading ? "Enviando..." : "Enviar enlace de restablecimiento"}
                                    </button>
                                    <div className="w-full flex text-center">
                                        <button type="submit" onClick={logout} className="w-full py-2 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-black focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 cursor-pointer">{token ? "Cerrar sesión" : "Iniciar sesión"}</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}