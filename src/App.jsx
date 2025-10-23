import { Routes, Route, Navigate } from "react-router-dom";
import AuthRoutes from "./modules/auth/routes/AuthRoutes";
import EmployeeRoutes from "./modules/users/routes/EmployeeRoutes";
import ProtectedRoute from "./modules/core/utils/ProtectedRoute";
import { useAuthContext } from './modules/context/AuthProvider';
import { Toaster } from 'react-hot-toast';
import HomeRoutes from "./modules/home/routes/HomeRoutes";
import { ResetPassword } from "./modules/auth/pages/ResetPassword"; // 👈 importa directamente

function App() {
  const { isAuthenticated } = useAuthContext();

  return (
    <>
      <Toaster position="top-center" />
      <Routes>
        {/* Redirección raíz */}
        <Route path="/" element={<Navigate to={isAuthenticated ? "/home" : "/login"} replace />} />

        {/* ✅ Ruta pública para reset-password */}
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Rutas de autenticación */}
        <Route
          path="/*"
          element={isAuthenticated ? <Navigate to="/home" replace /> : <AuthRoutes />}
        />

        {/* Rutas protegidas */}
        <Route
          path="/home/*"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <HomeRoutes />
            </ProtectedRoute>
          }
        />

        <Route
          path="/employees/*"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <EmployeeRoutes />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
      </Routes>
    </>
  );
}

export default App;
