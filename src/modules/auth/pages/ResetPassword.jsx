import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Aside } from "../components/Aside";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Loading } from "notiflix/build/notiflix-loading-aio";
import { useEffect } from "react";
import { useResetPassword } from "../hooks/useResetPassword";
import { useAuthUser } from "../../users/hooks/useAuthUser";
import { resetPasswordSchema } from "../schemas/resetPasswordSchema";
import { PasswordInput } from "../components/PasswordInput";
import { useAuthContext } from "../../context/AuthProvider";

export function ResetPassword() {
    const navigate = useNavigate();
    const { resetPasswordHook, loading } = useResetPassword();
    const { user, loadingUser } = useAuthUser();

    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const email = searchParams.get("email");

    const { logout } = useAuthContext();

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(resetPasswordSchema),
    });

    // Cargar el email cuando se obtenga el usuario
    useEffect(() => {
        if (email) {
            setValue("email", email);
        }
    }, [email, setValue]);

    useEffect(() => {
        if (loading || loadingUser) {
            Loading.circle("Cargando...", {
                svgColor: "#000000",
                backgroundColor: "rgba(255, 255, 255, 0.8)",
            });
        } else {
            Loading.remove();
        }
    }, [loading, loadingUser]);

    const onSubmit = async (data) => {
        // Agregar token y email provenientes de la URL
        const payload = {
            ...data,
            token,
            email,
        };
        await resetPasswordHook(payload);
        reset({
            email, // mantener email
            password: '',
            password_confirmation: '',
        });
    };

    const asideContent = {
        title: "¿Olvidaste tu contraseña?",
        description:
            "No te preocupes, te ayudamos a recuperarla. Ingresa tu nueva contraseña para proteger tu cuenta en SafeCity.",
        phrase: "Tu seguridad también es nuestra prioridad.",
        urlImage: "/image-reset-password.webp",
    };

    return (
        <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center">
            <div className="mx-auto grid lg:grid-cols-2 gap-8 lg:gap-16 items-center w-full">
                <Aside {...asideContent} />

                <div className="w-full mx-auto lg:max-w-xl sm:px-8 bg-white rounded-lg p-6 shadow-xl dark:bg-gray-800">
                    <div className="mb-8 flex flex-col gap-2 text-center">
                        <img src="/logo-login.webp" alt="logo safe city" className="mx-auto w-10" />
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                            Actualizar contraseña
                        </h2>
                        <p className="text-base text-gray-400">
                            Asegura tu cuenta con una nueva contraseña fuerte y única.
                        </p>
                    </div>

                    <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Correo electrónico
                            </label>
                            <input
                                type="email"
                                {...register("email")}
                                disabled
                                className="bg-gray-50 border px-3 py-1 text-base border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <PasswordInput
                                label="Nueva contraseña"
                                name="password"
                                register={register}
                                errors={errors}
                            />
                        </div>

                        <div>
                            <PasswordInput
                                label="confirmar Contraseña"
                                name="password_confirmation"
                                register={register}
                                errors={errors}
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full px-5 py-2 text-base font-medium text-white bg-black rounded-lg hover:opacity-95"
                            >
                                {loading ? "Actualizando..." : "Actualizar contraseña"}
                            </button>
                            <Link
                                onClick={logout}
                                className="text-center w-full py-2 px-5 text-sm font-medium text-gray-700 border rounded-lg hover:bg-gray-100 cursor-pointer"
                            >
                                Volver al inicio de sesión
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}
