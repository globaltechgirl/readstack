import { AxiosResponse } from "axios";
import { ApiAuthModes } from "@/types/enums";
import { useAxiosApi } from "@/api/api";
import { ENDPOINTS } from "@/api/endpoints";

export interface ReviewPayload {
  bookId: string;
  reviewText: string;
  rating: number;
  newShelf?: string;
}

export interface ReviewResponse {
  message: string;
  bookId: string;
  reviewId?: string;
}

const reviewsService = () => {
  const authApi = useAxiosApi(ApiAuthModes.BearerToken);

  const addReview = async (payload: ReviewPayload): Promise<ReviewResponse> => {
    const res: AxiosResponse<ReviewResponse> = await authApi.post(
      ENDPOINTS.REVIEWS.ADD,
      payload
    );
    return res.data;
  };

  const updateReview = async (
    bookId: string,
    payload: Partial<Omit<ReviewPayload, "bookId">>
  ): Promise<ReviewResponse> => {
    const res: AxiosResponse<ReviewResponse> = await authApi.put(
      ENDPOINTS.REVIEWS.UPDATE(bookId),
      payload
    );
    return res.data;
  };

  const deleteReview = async (bookId: string): Promise<ReviewResponse> => {
    const res: AxiosResponse<ReviewResponse> = await authApi.delete(
      ENDPOINTS.REVIEWS.DELETE(bookId)
    );
    return res.data;
  };

  return {
    addReview,
    updateReview,
    deleteReview,
  };
};

export default reviewsService;
