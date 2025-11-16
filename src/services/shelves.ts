import { AxiosResponse } from "axios";
import { useAxiosApi } from "@/api/api";
import { ENDPOINTS } from "@/api/endpoints";
import { Shelves } from "@/types/shelves";
import { ApiAuthModes } from "@/types/enums";

const shelvesService = () => {
  const authApi = useAxiosApi(ApiAuthModes.BearerToken);

  const getAllBooks = async (
    page = 0,
    size = 20
  ): Promise<{ content: Shelves[]; totalPages: number; totalElements: number }> => {
    const res: AxiosResponse<any> = await authApi.get(
      `${ENDPOINTS.SHELVES.GET_ALL}?page=${page}&size=${size}`
    );

    return res.data; 
  };

  const getBookById = async (id: number | string): Promise<Shelves> => {
    const res: AxiosResponse<Shelves> = await authApi.get(
      ENDPOINTS.SHELVES.GET_BY_ID(id)
    );
    return res.data;
  };

  const searchDatabaseBooks = async (
    query: string,
    page = 0,
    size = 20
  ): Promise<any> => {
    const res = await authApi.get(
      `${ENDPOINTS.SHELVES.SEARCH_DB}?query=${encodeURIComponent(
        query
      )}&page=${page}&size=${size}`
    );
    return res.data;
  };

  const searchExternalBooks = async (query: string): Promise<Shelves[]> => {
    const res = await authApi.get(
      `${ENDPOINTS.SHELVES.SEARCH_EXTERNAL}?query=${encodeURIComponent(query)}`
    );
    return res.data;
  };

  const importBook = async (googleBooksId: string): Promise<Shelves> => {
    const res = await authApi.post(ENDPOINTS.SHELVES.IMPORT_BOOK(googleBooksId));
    return res.data;
  };

  return {
    getAllBooks,
    getBookById,
    searchDatabaseBooks,
    searchExternalBooks,
    importBook,
  };
};

export default shelvesService;
