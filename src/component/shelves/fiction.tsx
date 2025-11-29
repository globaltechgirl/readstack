import { type FC, type CSSProperties, useState, useEffect } from "react";
import { Box, Text, Image, Button, Flex, Stack, Center } from "@mantine/core";

import ArrowLeft from "@/assets/icons/arrowLeft";
import ArrowRight from "@/assets/icons/arrowRight";
import useShelves from "@/hooks/use-shelves";
import Info from "../layout/info";
import { ApiBook, ShelvesResponse } from "@/types/shelves";

const styles: Record<string, CSSProperties> = {
  fictionBody: {
    width: "100%",
    height: "100vh",
    padding: 2,
    paddingLeft: 0,
    backgroundColor: "var(--white)",
  },
  fictionMain: {
    backgroundColor: "var(--light-100)",
    border: "0.5px solid var(--border-200)",
    borderRadius: 8,
    padding: 3,
    flex: 1,            
    display: "flex",
    flexDirection: "column",
  },
  fictionWrapper: {
    backgroundColor: "var(--light-200)",
    borderRadius: 6,
    display: "flex",
    flexDirection: "column",
    gap: 45,
    padding: 20,
    width: "100%",
    height: "100%",   
  },
  booksGrid: {
    display: "grid",
    gap: 10,
    gridTemplateColumns: "repeat(6, 1fr)",
    width: "100%",
  },
  bookCard: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 10,
    textAlign: "center",
    marginBottom: 30,
  },
  bookWrapper: {
    position: "relative",
    width: "100%",
    backgroundColor: "var(--light-100)",
    border: "0.5px solid var(--border-200)",
    borderRadius: 8,
    padding: 3,
    overflow: "hidden",
    transition: "transform 0.2s ease",
  },
  bookMain: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "var(--light-200)",
    borderRadius: 6,
    width: "100%",
    height: "100%",
    padding: 10,
  },
  bookImage: {
    width: "100%",
    height: 190,
    padding: 2,
    borderRadius: 8,
    border: "0.5px solid var(--border-200)",
    backgroundColor: "var(--light-100)",
    objectFit: "cover",
    cursor: "pointer",
  },
  bookmark: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    borderRadius: 6,
    padding: 8,
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    backgroundColor: "rgba(128, 128, 128, 0.35)",
    opacity: 0,
    transition: "opacity 0.25s ease",
    cursor: "pointer",
    pointerEvents: "none",
  },
  bookmarkVisible: {
    opacity: 1,
    pointerEvents: "auto",
  },
  bookmarkIcon: {
    width: 14,
    height: 14,
    cursor: "pointer",
    color: "var(--border-100)",
  },
  bookmarkMain: {
    position: "absolute",
    top: 28,
    left: 10,
    width: "fit-content",
    padding: 2,
    backgroundColor: "var(--light-100)",
    border: "0.5px solid var(--border-200)",
    borderRadius: 6,
    zIndex: 10,
  },
  bookmarkDropdown: {
    padding: 2,
    borderRadius: 5,
    backgroundColor: "var(--light-200)",
    overflow: "hidden",
  },
  bookmarkOption: {
    padding: "4px 12px",
    cursor: "pointer",
    fontSize: 9,
    fontWeight: 550,
    color: "var(--dark-200)",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-start"
  },
  genreRibbon: {
    position: "absolute",
    top: 12,
    right: -35,
    backgroundColor: "var(--light-200)",
    border: "0.5px solid var(--border-200)",
    color: "var(--dark-200)",
    fontSize: 8.5,
    fontWeight: 550,
    padding: "2px 0", 
    width: 110,        
    textAlign: "center",
    textTransform: "capitalize",
    transform: "rotate(45deg)",
    pointerEvents: "none",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  bookTexts: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 3,
    marginBottom: 15,
  },
  bookTitle: {
    color: "var(--dark-100)",
    fontSize: 11,
    fontWeight: 600,
  },
  bookAuthor: {
    color: "var(--dark-200)",
    fontSize: 9.5,
    fontWeight: 500,
  },
  paginationContainer: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "-30px",
    marginRight: 10,
  },
  paginationButton: {
    backgroundColor: "var(--light-100)",
    border: "0.5px solid var(--border-100)",
    borderRadius: 5,
    color: "var(--dark-100)",
    padding: "0 3.5px",
    width: "fit-content",
  },
  paginationText: {
    backgroundColor: "var(--light-100)",
    border: "0.5px solid var(--border-100)",
    borderRadius: 5,
    color: "var(--dark-100)",
    fontSize: 8,
    fontWeight: 550,
    padding: "2px 7px 2px 6px",
  },
  centerText: {
    fontSize: 10,
    fontWeight: 550,
    color: "var(--dark-200)",
  },
};

interface BookDisplay {
  isbn: string;
  id?: string | number | null;
  title: string;
  author: string;
  image: string;
  genre: string;
  rating: number;
  progress: number;
}

const TOP_FICTION_GENRES = [
  "Fantasy",
  "Science Fiction",
  "Mystery",
  "Thriller",
  "Romance",
  "Historical Fiction",
  "Horror",
  "Young Adult",
  "Adventure",
  "Dystopian",
];

const Fiction: FC = () => {
  const { fetchAllShelves, loading } = useShelves();

  const [allBooks, setAllBooks] = useState<BookDisplay[]>([]);
  const [initialLoadDone, setInitialLoadDone] = useState(false);
  const [page, setPage] = useState(1);

  const booksPerPage = 12;

  useEffect(() => {
    const loadFictionBooks = async () => {
      if (initialLoadDone) return;

      try {
        const shelvesResponse: ShelvesResponse | null = await fetchAllShelves();

        if (!shelvesResponse?.wantToRead || shelvesResponse.wantToRead.length === 0) {
          setAllBooks([]);
          setInitialLoadDone(true);
          return;
        }
        const combinedBooks = [
          ...(shelvesResponse.currentlyReading ?? []),
          ...(shelvesResponse.wantToRead ?? []),
          ...(shelvesResponse.read ?? []),
        ];

        const formatted: BookDisplay[] = combinedBooks
          .map((item: ApiBook) => ({
            id: String(item.book?.isbn ?? item.userBook?.bookId ?? ""),
            isbn: item.book?.isbn ?? item.userBook?.bookId ?? "",
            title: item.book?.title ?? item.userBook?.title ?? "Unknown Title",
            author:
              item.book?.author ??
              item.book?.authors?.[0] ??
              item.userBook?.author ??
              item.userBook?.authors?.[0] ??
              "Unknown Author",
            image:
              item.book?.coverUrl ??
              item.book?.coverImageUrl ??
              item.userBook?.coverUrl ??
              item.userBook?.coverImageUrl ??
              "",
            genre: String(
              item.book?.genre ??
                item.book?.categories?.[0] ??
                item.userBook?.categories?.[0] ??
                "Unknown"
            ),
            rating: item.userBook?.averageRating ?? 0,
            progress: item.userBook?.progress ?? 0,
          }))

          .filter((book) => {
            const normalizedGenre = book.genre.toLowerCase().replace(/[-\s]/g, "");
            return TOP_FICTION_GENRES.some(
              (genre) => normalizedGenre.includes(genre.toLowerCase().replace(/[-\s]/g, ""))
            );
          });

        setAllBooks(formatted);
        setInitialLoadDone(true);
      } catch (err) {
        console.error("Failed to load shelves:", err);
        setAllBooks([]);
        setInitialLoadDone(true);
      }
    };

    loadFictionBooks();
  }, [fetchAllShelves, initialLoadDone]);

  const totalPages = Math.ceil(allBooks.length / booksPerPage);
  const currentBooks = allBooks.slice((page - 1) * booksPerPage, page * booksPerPage);

  const handlePrev = () => setPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setPage((prev) => Math.min(prev + 1, totalPages));

  const trimChars = (text: string | undefined, maxChars: number) => {
    if (!text || text.trim() === "") return "N/A";
    return text.length > maxChars ? text.slice(0, maxChars) + "..." : text;
  };

  return (
    <Stack gap="10" style={styles.fictionBody}>
      <Info query={""} setQuery={() => {}} />

      <Box style={styles.fictionMain}>
        <Box style={styles.fictionWrapper}>
          {loading && !initialLoadDone ? (
            <Center style={{ width: "100%", padding: 50 }}>
              <Text style={styles.centerText}>Loading fiction books...</Text>
            </Center>
          ) : allBooks.length === 0 ? (
            <Center style={{ width: "100%", padding: 50 }}>
              <Text style={styles.centerText}>No fiction books found.</Text>
            </Center>
          ) : (
            <Box style={styles.booksGrid}>
              {currentBooks.map((book, idx) => (
                <Box
                  key={book.id || idx} 
                  style={styles.bookCard}
                >
                  <Box style={styles.bookWrapper}>
                    <Box style={styles.bookMain}>
                      <Image src={book.image} alt={book.title} style={styles.bookImage} />
                    </Box>

                    <Box style={styles.genreRibbon}>{trimChars(book.genre, 8)}</Box>
                  </Box>

                  <Box style={styles.bookTexts}>
                    <Text style={styles.bookTitle}>{book.title}</Text>
                    <Text style={styles.bookAuthor}>{book.author}</Text>
                  </Box>
                </Box>
              ))}
            </Box>
          )}
        </Box>

        <Flex style={styles.paginationContainer}>
          <Flex gap={4} align="center">
            <Button
              size="17.5"
              variant="outline"
              disabled={page === 1}
              onClick={handlePrev}
              styles={{ root: styles.paginationButton }}
            >
              <ArrowLeft width={10} height={10} />
            </Button>

            <Text style={styles.paginationText}>{page}</Text>

            <Button
              size="17.5"
              variant="outline"
              disabled={page === totalPages}
              onClick={handleNext}
              styles={{ root: styles.paginationButton }}
            >
              <ArrowRight width={10} height={10} />
            </Button>
          </Flex>
        </Flex>
      </Box>
    </Stack>
  );
};

export default Fiction;
