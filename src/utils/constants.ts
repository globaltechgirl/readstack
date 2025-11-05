export const BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const ROUTES = {
  AUTH: {
    LOGIN: "/login",
    REGISTER: "/register",
  },
  HOME: "/home",
};

export const NavLinks = [
  {
    label: "Home",
    link: ROUTES.HOME,
  },
];
