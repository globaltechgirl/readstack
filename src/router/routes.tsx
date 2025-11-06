import { createBrowserRouter, Navigate } from "react-router-dom";

import PrivateLayout from "@/component/layout/privateLayout";
import Register from "@/pages/auth/register";
import Login from "@/pages/auth/login";
import Overview from "@/pages/overview";
import Home from "@/pages/overview";
import Books from "@/pages/books";
import Shelves from "@/pages/shelves";
import Bookmark from "@/pages/bookmark";
import Profile from "@/pages/profile";
import Notification from "@/pages/notification";
import Settings from "@/pages/settings";
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
    path: ROUTES.OVERVIEW,
    element: <Overview />,
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
          { path: "books", element: <Books /> },
          { path: "shelves", element: <Shelves /> },
          { path: "Bookmark", element: <Bookmark /> },
          { path: "profile", element: <Profile /> },
          { path: "notification", element: <Notification /> },
          { path: "settings", element: <Settings /> },
          { path: "*", element: <Navigate to={ROUTES.AUTH.LOGIN} replace /> },
        ],
      },
    ],
  },
]);

export default router;