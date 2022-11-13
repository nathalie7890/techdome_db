import { Navigate, Outlet } from "react-router-dom";
import { checkAuth } from "../api/users";

export default function AdminRoutes() {
    const { isAuth, isAdmin } = checkAuth();
    return isAuth && isAdmin ? <Outlet /> : <Navigate to="/" />;
}
