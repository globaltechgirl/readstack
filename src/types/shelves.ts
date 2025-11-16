export interface Shelves {
  id: number | string | null; 
  title: string;
  author: string;
  isbn?: string;
  description?: string;
  publisher?: string;
  publishedDate?: string;
  pageCount?: number;
  coverImageUrl?: string;
  categories?: string[];
  language?: string;
  googleBooksId?: string;
  openLibraryId?: string | null; 
  averageRating?: number;
  ratingsCount?: number;
}
