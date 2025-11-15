export const ENDPOINTS = {
  AUTH: {
    REGISTER: "auth/register",
    LOGIN: "auth/login",
    LOGOUT: "auth/logout",
  },
  SHELVES: {
    GET_ALL: "books",
    GET_BY_ID: (id: number | string) => `books/${id}`,
    SEARCH_GOOGLE: "books/google/search",
  },
};
