import { AxiosResponse } from "axios";
import { useAxiosApi } from "@/api/api";
import { ENDPOINTS } from "@/api/endpoints";
import { Shelves, ShelvesResponse } from "@/types/shelves";
import { ApiAuthModes } from "@/types/enums";

export type UploadResp = {
  message: string;
  shelf: string;
  id: string;
};

const shelvesService = () => {
  const authApi = useAxiosApi(ApiAuthModes.BearerToken);

  const searchBooks = async (query: string): Promise<Shelves[]> => {
    const res: AxiosResponse<Shelves[]> = await authApi.get(
      `${ENDPOINTS.BOOKS.SEARCH}?q=${encodeURIComponent(query)}`
    );
    return res.data ?? [];
  };

  const getBookDetails = async (id: string): Promise<Shelves> => {
    const res: AxiosResponse<Shelves> = await authApi.get(
      ENDPOINTS.BOOKS.DETAILS(id)
    );
    return res.data;
  };

  const getFeaturedBooks = async (): Promise<Shelves[]> => {
    const res: AxiosResponse<Shelves[]> = await authApi.get(
      ENDPOINTS.BOOKS.FEATURED
    );
    return res.data ?? [];
  };

  const uploadBook = async (formData: FormData): Promise<UploadResp> => {
    const res: AxiosResponse<UploadResp> = await authApi.post(
      ENDPOINTS.BOOKS.UPLOAD,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return res.data;
  };

  const addBookToShelf = async (isbn: string): Promise<UploadResp> => {
    const res: AxiosResponse<UploadResp> = await authApi.post(
      ENDPOINTS.USER_BOOKS.ADD,
      { bookId: isbn } 
    );
    return res.data;
  };

  const getAllShelves = async (): Promise<ShelvesResponse> => {
    const res: AxiosResponse<ShelvesResponse> = await authApi.get(ENDPOINTS.SHELVES.GET_ALL);
    return res.data;
  };

  const moveBookToShelf = async (isbn: string, newShelf: string): Promise<{ bookId: string; message: string; newShelf: string }> => {
    const res: AxiosResponse<{ bookId: string; message: string; newShelf: string }> = await authApi.put(
      ENDPOINTS.USER_BOOKS.MOVE_SHELF(isbn),
      { newShelf }
    );
    console.log("moveBookToShelf response:", res.data);
    return res.data;
  };

  return {
    searchBooks,
    getBookDetails,
    getFeaturedBooks,
    uploadBook,
    addBookToShelf,
    getAllShelves, 
    moveBookToShelf, 
  };
};

export default shelvesService;
