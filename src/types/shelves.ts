export interface Link {
  platform: string;
  url: string;
}

export interface Shelves {
  id: string | number | null;
  title: string;
  author?: string; 
  authors: string[];
  description?: string;
  categories?: string[];
  bookId?: string;
  subtitle?: string | null;
  pageCount?: number | null;
  publishedDate?: string | null;
  coverUrl?: string;
  coverImageUrl?: string;
  smallCoverImageUrl?: string;
  language?: string;
  format?: string;
  readLinks?: Link[];
  isbn?: string;
  publisher?: string;
  progress?: number;
  genre?: number;
  openLibraryId?: string | null;
  averageRating?: number | null;
  ratingsCount?: number | null;
  currentlyReading?: Shelves[];
  wantToRead?: Shelves[];
  read?: Shelves[];
}

export interface ApiBook {
  book: Partial<Shelves>;
  userBook: Partial<Shelves>;
}

export interface ShelvesResponse {
  currentlyReading: ApiBook[];
  wantToRead: ApiBook[];
  read: ApiBook[];
}
