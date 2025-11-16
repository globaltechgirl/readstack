import { useState } from "react";
import { notifications } from "@mantine/notifications";
import { getErrorMessage } from "@/api/error";
import shelvesService from "@/services/shelves";
import { Shelves } from "@/types/shelves";

const useShelves = () => {
  const {
    getAllBooks,
    getBookById,
    searchExternalBooks,
  } = shelvesService();

  const [loading, setLoading] = useState(false);

  const startGetAllBooks = async (page = 0, size = 20) => {
    setLoading(true);
    try {
      return await getAllBooks(page, size);
    } catch (error) {
      notifications.show({
        title: "Error",
        message: getErrorMessage(error),
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };

  const startGetBook = async (id: number | string) => {
    setLoading(true);
    try {
      return await getBookById(id);
    } catch (error) {
      notifications.show({
        title: "Error",
        message: getErrorMessage(error),
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };

  const startSearchExternalBooks = async (query: string) => {
    setLoading(true);
    try {
      const books = await searchExternalBooks(query);

      const fiction: Shelves[] = [];
      const nonFiction: Shelves[] = [];

      books.forEach((book) => {
        const categories = book.categories?.map((c) => c.toLowerCase()) || [];
        if (categories.some((c) => c.includes("fiction"))) fiction.push(book);
        else nonFiction.push(book);
      });

      return { fiction, nonFiction };
    } catch (error) {
      notifications.show({
        title: "Error",
        message: getErrorMessage(error),
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    startGetAllBooks,
    startGetBook,
    startSearchExternalBooks,
    loading,
  };
};

export default useShelves;
