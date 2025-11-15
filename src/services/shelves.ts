import { AxiosResponse } from "axios";
import { useAxiosApi } from "@/api/api";
import { ENDPOINTS } from "@/api/endpoints";
import { ApiResponse } from "@/types/api";
import { Shelves } from "@/types/shelves";
import { ApiAuthModes } from "@/types/enums";

const shelvesService = () => {
  const authApi = useAxiosApi(ApiAuthModes.BearerToken);

  const getAllBooks = async (): Promise<Shelves[]> => {
    const res: AxiosResponse<ApiResponse<{ books: Shelves[] }>> = await authApi.get(ENDPOINTS.SHELVES.GET_ALL);
    return res.data.data.books;
  };

  const getBookById = async (id: string | number): Promise<Shelves> => {
    const res: AxiosResponse<ApiResponse<{ book: Shelves }>> = await authApi.get(ENDPOINTS.SHELVES.GET_BY_ID(id));
    return res.data.data.book;
  };

  const searchGoogleBooks = async (query: string): Promise<Shelves[]> => {
    const res: AxiosResponse<ApiResponse<{ books: Shelves[] }>> = await authApi.get(
      `${ENDPOINTS.SHELVES.SEARCH_GOOGLE}?q=${encodeURIComponent(query)}`
    );
    return res.data.data.books;
  };

  return { getAllBooks, getBookById, searchGoogleBooks };
};

export default shelvesService;
