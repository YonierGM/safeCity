import { Routes, Route, Navigate } from "react-router-dom";
import AuthRoutes from "./modules/auth/routes/AuthRoutes";
import ProtectedRoute from "./modules/core/utils/ProtectedRoute";
import { useAuthContext } from './modules/context/AuthProvider';
import { Toaster } from 'react-hot-toast';
import { ResetPassword } from "./modules/auth/pages/ResetPassword";
import { ForgotPassword } from "./modules/auth/pages/ForgotPassword";
import DashboardRoutes from "./modules/dashboard/routes/DashboardRoutes";

function App() {
  const { isAuthenticated } = useAuthContext();

  return (
    <>
      <Toaster position="top-center" />
      <Routes>
        {/* Redirección raíz */}
        <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />} />

        {/* Ruta pública para reset-password */}
        <Route path="/reset-password" element={<ResetPassword />} />
        {/* Ruta pública para forgot-password */}
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Rutas de autenticación */}
        <Route
          path="/*"
          element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <AuthRoutes />}
        />

        {/* Rutas protegidas */}
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <DashboardRoutes />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
      </Routes>
    </>
  );
}

export default App;
