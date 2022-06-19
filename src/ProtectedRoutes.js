import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { UserContext } from "./App";

const ProtectedRoutes = () => {
  const { auth } = useContext(UserContext);
  const location = useLocation();

  return auth ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};

export default ProtectedRoutes;
