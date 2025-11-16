export const ENDPOINTS = {
  AUTH: {
    REGISTER: "auth/register",
    LOGIN: "auth/login",
    ME: "auth/me",
  },
  SHELVES: {
    GET_ALL: "books",
    GET_BY_ID: (id: number | string) => `books/${id}`,
    SEARCH_DB: "books/search",
    SEARCH_EXTERNAL: "books/search/external",
    IMPORT_BOOK: (googleBooksId: string) => `books/import/${googleBooksId}`,
  },
};
