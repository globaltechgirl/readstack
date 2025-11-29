export const ENDPOINTS = {
  AUTH: {
    REGISTER: "auth/register",
    LOGIN: "auth/login",
    ME: "auth/me",
  },
  BOOKS: {
    SEARCH: "books/search",
    DETAILS: (id: string) => `books/${id}`,
    FEATURED: "books/featured", 
    UPLOAD: "books/upload", 
  },
  USER_BOOKS: {
    ADD: "user-books/add",
    MOVE_SHELF: (isbn: string) => `user-books/move-shelf/${isbn}`,
  },
  SHELVES: {
    GET_ALL: "shelves",
  },
  REVIEWS: {
    ADD: "reviews",
    UPDATE: (bookId: string) => `reviews/${bookId}`,
    DELETE: (bookId: string) => `reviews/${bookId}`,
  },
};
