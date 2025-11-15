import { useState } from "react";
import { notifications } from "@mantine/notifications";
import { getErrorMessage } from "@/api/error";
import shelvesService from "@/services/shelves";
import { Shelves } from "@/types/shelves";

const useShelves = () => {
  const { getAllBooks, getBookById, searchGoogleBooks } = shelvesService();
  const [loading, setLoading] = useState(false);

  const startGetAllBooks = async (): Promise<Shelves[] | undefined> => {
    setLoading(true);
    try {
      return await getAllBooks();
    } catch (error) {
      notifications.show({ title: "Error", message: getErrorMessage(error), color: "red" });
    } finally {
      setLoading(false);
    }
  };

  const startGetBook = async (id: string | number): Promise<Shelves | undefined> => {
    setLoading(true);
    try {
      return await getBookById(id);
    } catch (error) {
      notifications.show({ title: "Error", message: getErrorMessage(error), color: "red" });
    } finally {
      setLoading(false);
    }
  };

  const startSearchGoogleBooks = async (query: string): Promise<{ fiction: Shelves[]; nonFiction: Shelves[] } | undefined> => {
    setLoading(true);
    try {
      const books = await searchGoogleBooks(query);
      const fiction: Shelves[] = [];
      const nonFiction: Shelves[] = [];

      books.forEach((book: Shelves) => {
        const categories = book.categories?.map((c: string) => c.toLowerCase()) || [];
        if (categories.some((c) => c.includes("fiction"))) fiction.push(book);
        else nonFiction.push(book);
      });

      return { fiction, nonFiction };
    } catch (error) {
      notifications.show({ title: "Error", message: getErrorMessage(error), color: "red" });
    } finally {
      setLoading(false);
    }
  };

  return { startGetAllBooks, startGetBook, startSearchGoogleBooks, loading };
};

export default useShelves;
