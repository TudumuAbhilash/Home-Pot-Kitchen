import { Navigate } from "react-router-dom";
import { useAdminAuth } from "../../context/AdminAuthContext";

function ProtectedRoute({ children }) {
  const { token } = useAdminAuth();
  const storedToken = localStorage.getItem("token");

  const isAuthenticated = !!(token || storedToken);

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}

export default ProtectedRoute;