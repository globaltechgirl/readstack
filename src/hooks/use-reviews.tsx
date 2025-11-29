import { useState, useCallback } from "react";
import { notifications } from "@mantine/notifications";
import { getErrorMessage } from "@/api/error";
import reviewsService, { ReviewPayload } from "@/services/reviews";

const useReviews = () => {
  const { addReview, updateReview, deleteReview } = reviewsService();
  const [loading, setLoading] = useState(false);

  const createReview = useCallback(async (payload: ReviewPayload) => {
    setLoading(true);
    try {
      return await addReview(payload);
    } catch (err) {
      notifications.show({ title: "Error", message: getErrorMessage(err), color: "red" });
      return null;
    } finally {
      setLoading(false);
    }
  }, [addReview]);

  const editReview = useCallback(async (bookId: string, payload: Partial<Omit<ReviewPayload, "bookId">>) => {
    setLoading(true);
    try {
      return await updateReview(bookId, payload);
    } catch (err) {
      notifications.show({ title: "Error", message: getErrorMessage(err), color: "red" });
      return null;
    } finally {
      setLoading(false);
    }
  }, [updateReview]);

  const removeReview = useCallback(async (bookId: string) => {
    setLoading(true);
    try {
      return await deleteReview(bookId);
    } catch (err) {
      notifications.show({ title: "Error", message: getErrorMessage(err), color: "red" });
      return null;
    } finally {
      setLoading(false);
    }
  }, [deleteReview]);

  return { createReview, editReview, removeReview, loading };
};

export default useReviews;
