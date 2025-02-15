import { Outlet, Navigate } from "react-router"
import { useContext } from "react"
import { AuthContext } from "@/context/AuthContext"

const ProtectedRoutes = () => {
    const { loggedIn } = useContext(AuthContext)
  return loggedIn ? <Outlet /> : <Navigate to="/auth" />
}

export default ProtectedRoutes