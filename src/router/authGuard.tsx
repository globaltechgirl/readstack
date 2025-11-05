import { Navigate, Outlet } from "react-router-dom";

const AuthGuard = () => {
  const isAuthenticated = true; 

  if (!isAuthenticated) {
    return <Navigate to="/register" replace />;
  }

  return <Outlet />; 
};

export default AuthGuard;
