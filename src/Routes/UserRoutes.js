import { Navigate, Outlet } from "react-router-dom";
import { checkAuth } from "../api/users";

export default function UserRoutes() {
  const { isAuth, user } = checkAuth();
  return isAuth && user ? <Outlet /> : <Navigate to="/" />;
}
