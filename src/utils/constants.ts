import HomeIcon from "@/assets/icons/home";
import BooksIcon from "@/assets/icons/books";
import ShelvesIcon from "@/assets/icons/shelves";
import BookmarksIcon from "@/assets/icons/bookmarks";
import NotificationIcon from "@/assets/icons/notification";
import SettingsIcon from "@/assets/icons/settings";

export const BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const ROUTES = {
  AUTH: {
    LOGIN: "/login",
    REGISTER: "/register",
  },
  HOME: "/home",
  OVERVIEW: "/overview",

  BOOKS: {
    ROOT: "/books",
    VIEW_ALL: "/books/view-all",
    RECENT: "/books/recent",
    COMPLETED: "/books/completed",
    WISHLIST: "/books/wishlist",
    FAVORITES: "/books/favorites",

    VIEW_ALL_ID: "/books/view-all/:id",
    VIEW_RECENT_ID: "/books/recent/:id",
    VIEW_COMPLETED_ID: "/books/completed/:id",
    VIEW_WISHLIST_ID: "/books/wishlist/:id",
    VIEW_FAVORITES_ID: "/books/favorites/:id",
  },

  SHELVES: {
    ROOT: "/shelves",
    FICTION: "/shelves/fiction",
    NON_FICTION: "/shelves/non-fiction",
    AUDIOBOOKS: "/shelves/audiobooks",

    VIEW_FICTION_ID: "/shelves/fiction/:id",
    VIEW_NON_FICTION_ID: "/shelves/non-fiction/:id",
    VIEW_AUDIOBOOKS_ID: "/shelves/audiobooks/:id",
  },

  BOOKMARKS: {
    ROOT: "/bookmarks",
    ADDITION: "/bookmarks/addition",
    SCHEDULE: "/bookmarks/schedule",
  },

  NOTIFICATION: "/notification",
  SETTINGS: "/settings",
};

export const NavLinks = [
  {
    label: "Overview",
    link: ROUTES.OVERVIEW,
    icon: HomeIcon,
  },
  {
    label: "Books",
    link: ROUTES.BOOKS.ROOT,
    icon: BooksIcon,
    subNav: [
      { label: "View All", link: ROUTES.BOOKS.VIEW_ALL },
      { label: "Recent", link: ROUTES.BOOKS.RECENT },
      { label: "Completed", link: ROUTES.BOOKS.COMPLETED },
      { label: "Wishlist", link: ROUTES.BOOKS.WISHLIST },
      { label: "Favorites", link: ROUTES.BOOKS.FAVORITES },
    ],
  },
  {
    label: "Shelves",
    link: ROUTES.SHELVES.ROOT,
    icon: ShelvesIcon,
    subNav: [
      { label: "Fiction", link: ROUTES.SHELVES.FICTION },
      { label: "Non Fiction", link: ROUTES.SHELVES.NON_FICTION },
      { label: "Audiobooks", link: ROUTES.SHELVES.AUDIOBOOKS },
    ],
  },
  {
    label: "Bookmarks",
    link: ROUTES.BOOKMARKS.ROOT,
    icon: BookmarksIcon,
    subNav: [
      { label: "Addition", link: ROUTES.BOOKMARKS.ADDITION },
      { label: "Schedule", link: ROUTES.BOOKMARKS.SCHEDULE },
    ],
  },
  {
    label: "Notification",
    link: ROUTES.NOTIFICATION,
    icon: NotificationIcon,
  },
  {
    label: "Settings",
    link: ROUTES.SETTINGS,
    icon: SettingsIcon,
  },
];
