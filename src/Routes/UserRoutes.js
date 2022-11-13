import { Navigate, Outlet } from "react-router-dom";
import { checkAuth } from "../api/users";

export default function UserRoutes() {
  const { isAuth } = checkAuth();
  return isAuth ? <Outlet /> : <Navigate to="/" />;
}
