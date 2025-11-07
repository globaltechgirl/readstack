import { createBrowserRouter, Navigate } from "react-router-dom";

import PrivateLayout from "@/component/layout/privateLayout";
import Register from "@/pages/auth/register";
import Login from "@/pages/auth/login";
import Home from "@/pages/home";
import Overview from "@/pages/overview";

import Books from "@/pages/books";
import AllBooks from "@/component/books/all";
import RecentBooks from "@/component/books/recent";
import CompletedBooks from "@/component/books/completed";
import WishlistBooks from "@/component/books/wishlist";
import FavoritesBooks from "@/component/books/favorites";

import Shelves from "@/pages/shelves";
import FictionShelves from "@/component/books/all";
import NonFictionShelves from "@/component/books/all";
import AudiobooksShelves from "@/component/books/all";

import Bookmarks from "@/pages/bookmarks";
import AdditionBookmarks from "@/component/books/all";
import QuotesBookmarks from "@/component/books/all";
import ScheduleBookmarks from "@/component/books/all";

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
    path: ROUTES.HOME,
    element: <Home />,
  },

  {
    path: "/",
    element: <AuthGuard />,
    children: [
      {
        element: <PrivateLayout />,
        children: [
          { path: "", element: <Navigate to="overview" replace /> },
          { path: "overview", element: <Overview /> },

          { path: "books", element: <Books /> },
          { path: "books/view-all", element: <AllBooks /> },
          { path: "books/recent", element: <RecentBooks /> },
          { path: "books/completed", element: <CompletedBooks /> },
          { path: "books/wishlist", element: <WishlistBooks /> },
          { path: "books/favorites", element: <FavoritesBooks /> },

          { path: "shelves", element: <Shelves /> },
          { path: "shelves/fiction", element: <FictionShelves /> },
          { path: "shelves/non-fiction", element: <NonFictionShelves /> },
          { path: "shelves/audiobooks", element: <AudiobooksShelves /> },

          { path: "bookmarks", element: <Bookmarks /> },
          { path: "bookmarks/addition", element: <AdditionBookmarks /> },
          { path: "bookmarks/quotes", element: <QuotesBookmarks /> },
          { path: "bookmarks/schedule", element: <ScheduleBookmarks /> },

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
