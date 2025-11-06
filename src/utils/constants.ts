import HomeIcon from "@/assets/icons/home.tsx";
import BooksIcon from "@/assets/icons/books.tsx";
import ShelvesIcon from "@/assets/icons/shelves.tsx";
import BookmarksIcon from "@/assets/icons/bookmarks.tsx";
import ProfileIcon from "@/assets/icons/profile.tsx";
import NotificationIcon from "@/assets/icons/notification.tsx";
import SettingsIcon from "@/assets/icons/settings.tsx";

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
    FAVORITES: "/books/favorites",
    SHARED: "/books/shared",
  },
  SHELVES: {
    ROOT: "/shelves",
    FICTION: "/shelves/fiction",
    NON_FICTION: "/shelves/non-fiction",
    AUDIOBOOKS: "/shelves/audiobooks",
  },
  BOOKMARKS: {
    ROOT: "/bookmarks",
    ADDITION: "/bookmarks/addition",
    QUOTES: "/bookmarks/quotes",
    SCHEDULE: "/bookmarks/schedule",
  },
  PROFILE: "/profile",
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
      { label: "Favorites", link: ROUTES.BOOKS.FAVORITES },
      { label: "Shared", link: ROUTES.BOOKS.SHARED },
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
    label: "Bookmark",
    link: ROUTES.BOOKMARKS.ROOT,
    icon: BookmarksIcon,
    subNav: [
      { label: "Addition", link: ROUTES.BOOKMARKS.ADDITION },
      { label: "Quotes", link: ROUTES.BOOKMARKS.QUOTES },
      { label: "Schedule", link: ROUTES.BOOKMARKS.SCHEDULE },
    ],
  },
  {
    label: "Profile",
    link: ROUTES.PROFILE,
    icon: ProfileIcon,
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
