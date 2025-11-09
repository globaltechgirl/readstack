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
import BookView from "@/component/books/view";

import Shelves from "@/pages/shelves";
import FictionShelves from "@/component/shelves/fiction";
import NonFictionShelves from "@/component/shelves/nonFiction";
import AudiobooksShelves from "@/component/shelves/audiobooks";
import ShelfView from "@/component/shelves/view";

import Bookmarks from "@/pages/bookmarks";
import AdditionBookmarks from "@/component/bookmark/addition";
import QuotesBookmarks from "@/component/bookmark/addition";
import ScheduleBookmarks from "@/component/bookmark/addition";

import Profile from "@/pages/profile";
import Notification from "@/pages/notification";
import Settings from "@/pages/settings";

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
          { path: "", element: <Navigate to={ROUTES.OVERVIEW} replace /> },
          { path: "overview", element: <Overview /> },

          { path: "books", element: <Books /> },
          { path: "books/view-all", element: <AllBooks /> },
          { path: "books/view-all/:id", element: <BookView /> },

          { path: "books/recent", element: <RecentBooks /> },
          { path: "books/recent/:id", element: <BookView /> },

          { path: "books/completed", element: <CompletedBooks /> },
          { path: "books/completed/:id", element: <BookView /> },

          { path: "books/wishlist", element: <WishlistBooks /> },
          { path: "books/wishlist/:id", element: <BookView /> },

          { path: "books/favorites", element: <FavoritesBooks /> },
          { path: "books/favorites/:id", element: <BookView /> },

          { path: "shelves", element: <Shelves /> },
          { path: "shelves/fiction", element: <FictionShelves /> },
          { path: "shelves/fiction/:id", element: <ShelfView /> },

          { path: "shelves/non-fiction", element: <NonFictionShelves /> },
          { path: "shelves/non-fiction/:id", element: <ShelfView /> },

          { path: "shelves/audiobooks", element: <AudiobooksShelves /> },
          { path: "shelves/audiobooks/:id", element: <ShelfView /> },

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
