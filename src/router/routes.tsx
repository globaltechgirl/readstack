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
import BookView from "@/component/books/view";

import Shelves from "@/pages/shelves";
import FictionShelves from "@/component/shelves/fiction";
import NonFictionShelves from "@/component/shelves/nonFiction";
import AudiobooksShelves from "@/component/shelves/audiobooks";

import Bookmarks from "@/pages/bookmarks";
import AdditionBookmarks from "@/component/bookmark/addition";

import AuthGuard from "@/router/authGuard";
import { ROUTES } from "@/utils/constants";

const router = createBrowserRouter([
  { path: ROUTES.AUTH.LOGIN, element: <Login /> },
  { path: ROUTES.AUTH.REGISTER, element: <Register /> },

  { path: ROUTES.HOME, element: <Home /> },

  {
    path: "/",
    element: <AuthGuard />,
    children: [
      {
        element: <PrivateLayout />,
        children: [
          { path: "", element: <Navigate to={ROUTES.HOME} replace /> },
          { path: "overview", element: <Overview /> },

          { path: "books", element: <Books /> },
          { path: "books/all", element: <AllBooks /> },
          { path: "books/recent", element: <RecentBooks /> },
          { path: "books/completed", element: <CompletedBooks /> },
          { path: "books/wishlist", element: <WishlistBooks /> },
          { path: "books/:id", element: <BookView /> },

          { path: "shelves", element: <Shelves /> },
          { path: "shelves/fiction", element: <FictionShelves /> },
          { path: "shelves/non-fiction", element: <NonFictionShelves /> },
          { path: "shelves/audiobooks", element: <AudiobooksShelves /> },

          { path: "bookmarks", element: <Bookmarks /> },
          { path: "bookmarks/addition", element: <AdditionBookmarks /> },
          
          { path: "*", element: <Navigate to={ROUTES.AUTH.LOGIN} replace /> },
        ],
      },
    ],
  },
]);

export default router;
