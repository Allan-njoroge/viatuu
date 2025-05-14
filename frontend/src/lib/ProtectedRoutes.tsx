import { Outlet, Navigate } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const ProtectedRoutes = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.user);
  return isAuthenticated ? <Outlet /> : <Navigate to="/auth" />;
};

export default ProtectedRoutes;
