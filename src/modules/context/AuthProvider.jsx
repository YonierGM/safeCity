import { createContext, useContext, useState } from "react";
import { useLogout } from "../auth/hooks/useLogout";
import { useAuth } from "../auth/hooks/useAuth";

import { Confirm } from 'notiflix/build/notiflix-confirm-aio';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [loading, setLoading] = useState(false);
    const isAuthenticated = !!token;

    const { loginHook } = useAuth();
    const { logout: logoutUser } = useLogout();

    // Iniciar sesión
    const login = async (email, password) => {
        setLoading(true);
        try {
            const accessToken = await loginHook(email, password);
            if (accessToken) {
                setToken(accessToken);
                localStorage.setItem("token", accessToken);
            }
            return accessToken;
        } finally {
            setLoading(false);
        }
    };

    // Cerrar sesión
    const logout = async () => {
        try {
            setLoading(true);

            await logoutUser();
            setToken(null);
            setLoading(false);

            // Confirm.show(
            //     'Cerrar sesión',
            //     '¿Estás seguro que deseas cerrar sesión?',
            //     'Si',
            //     'No',
            //     async () => {
            //         setLoading(true);

            //         await logoutUser();
            //         setToken(null);
            //         setLoading(false);
            //     },
            //     () => {

            //     },
            //     {
            //         titleColor: '#000000',

            //     },
            // );
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthContext.Provider value={{ token, isAuthenticated, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => useContext(AuthContext);
