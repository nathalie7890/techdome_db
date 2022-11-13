import { Navigate, Outlet } from "react-router-dom";
import { checkAuth } from "../api/users";

export default function GuestRoutes() {
  const { isAuth } = checkAuth();
  return !isAuth ? <Outlet /> : <Navigate to="/" />;
}
