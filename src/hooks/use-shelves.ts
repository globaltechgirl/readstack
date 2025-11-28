import { useState, useCallback } from "react";
import { notifications } from "@mantine/notifications";
import { getErrorMessage } from "@/api/error";
import shelvesService from "@/services/shelves";
import { Shelves, ShelvesResponse } from "@/types/shelves";

const useShelves = () => {
  const { searchBooks, getBookDetails, getFeaturedBooks, uploadBook, addBookToShelf, getAllShelves, moveBookToShelf } = shelvesService();
  const [loading, setLoading] = useState(false);

  const searchForBooks = useCallback(async (query: string): Promise<Shelves[]> => {
    if (!query.trim()) return [];
    setLoading(true);
    try {
      return await searchBooks(query);
    } catch (error) {
      notifications.show({ title: "Error", message: getErrorMessage(error), color: "red" });
      return [];
    } finally {
      setLoading(false);
    }
  }, [searchBooks]);

  const fetchBookDetails = useCallback(async (id: string): Promise<Shelves | null> => {
    setLoading(true);
    try {
      return await getBookDetails(id);
    } catch (error) {
      notifications.show({ title: "Error", message: getErrorMessage(error), color: "red" });
      return null;
    } finally {
      setLoading(false);
    }
  }, [getBookDetails]);

  const fetchFeaturedBooks = useCallback(async (): Promise<Shelves[]> => { 
    setLoading(true);
    try {
      return await getFeaturedBooks();
    } catch (error) {
      notifications.show({ title: "Error", message: getErrorMessage(error), color: "red" });
      return [];
    } finally {
      setLoading(false);
    }
  }, [getFeaturedBooks]);

  const uploadNewBook = useCallback(async (formData: FormData) => {
    setLoading(true);
    try {
      const res = await uploadBook(formData);
      return res;
    } catch (error) {
      return null;
    } finally {
      setLoading(false);
    }
  }, [uploadBook]);

  const addToShelf = useCallback(async (isbn: string) => {
    setLoading(true);
    try {
      const res = await addBookToShelf(isbn);
      return res;
    } catch (error) {
      return null;
    } finally {
      setLoading(false);
    }
  }, [addBookToShelf]);

  const fetchAllShelves = useCallback(async (): Promise<ShelvesResponse | null> => {
    setLoading(true);
    try {
      const res = await getAllShelves();

      if (!res) return null;

      const shelvesResponse: ShelvesResponse = {
        currentlyReading: res.currentlyReading ?? [],
        wantToRead: res.wantToRead ?? [],
        read: res.read ?? [],
      };

      return shelvesResponse;
    } catch (error) {
      notifications.show({ title: "Error", message: getErrorMessage(error), color: "red" });
      return null;
    } finally {
      setLoading(false);
    }
  }, [getAllShelves]);

  const moveShelf = useCallback(async (isbn: string, newShelf: string) => {
    setLoading(true);
    try {
      const res = await moveBookToShelf(isbn, newShelf);
      return res;
    } catch (error) {
      return null;
    } finally {
      setLoading(false);
    }
  }, [moveBookToShelf]);

  return { 
    searchForBooks, 
    fetchBookDetails, 
    fetchFeaturedBooks, 
    uploadNewBook, 
    addToShelf,
    fetchAllShelves,
    moveShelf,
    loading 
  };
};

export default useShelves;
