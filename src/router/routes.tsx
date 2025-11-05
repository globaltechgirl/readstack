import { createBrowserRouter, Navigate } from "react-router-dom";

import PrivateLayout from "@/component/layout/privateLayout";
import Register from "@/pages/auth/register";
import Login from "@/pages/auth/login";
import Home from "@/pages/home";
import AuthGuard from "@/router/authGuard";
import { ROUTES } from "@/utils/constants";

const router = createBrowserRouter([
  {
    path: ROUTES.AUTH.LOGIN,
    element: <Login />,
  },
  {
    path: ROUTES.AUTH.REGISTER,
    element: <Register />,
  },
  {
    path: "/",
    element: <AuthGuard />,
    children: [
      {
        element: <PrivateLayout />,
        children: [
          { path: "", element: <Navigate to="home" replace /> },
          { path: "home", element: <Home /> },
          { path: "*", element: <Navigate to={ROUTES.AUTH.LOGIN} replace /> },
        ],
      },
    ],
  },
]);

export default router;