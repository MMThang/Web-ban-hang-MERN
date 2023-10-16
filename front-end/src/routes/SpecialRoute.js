import { Outlet, Navigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

export const PrivateRoute = () => {
  let auth = localStorage.getItem("access_token");
  return auth ? <Outlet /> : <Navigate to="/" />;
};

export const AdminRoute = () => {
  let auth = localStorage.getItem("access_token");
  const decoded = auth ? jwtDecode(auth) : null;
  return decoded?.isAdmin ? <Outlet /> : <Navigate to="/" />;
};
