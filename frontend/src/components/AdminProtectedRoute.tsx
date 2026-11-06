import { Navigate, Outlet } from "react-router-dom";

function AdminProtectedRoute() {
  const token = sessionStorage.getItem("admin_token");

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
}

export default AdminProtectedRoute;