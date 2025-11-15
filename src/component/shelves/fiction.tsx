import { type FC, type CSSProperties, useState, useEffect } from "react";
import { Box, Text, Image, Button, Flex, Stack, Loader } from "@mantine/core";
import { useNavigate } from "react-router-dom";

import ArrowLeft from "@/assets/icons/arrowLeft";
import ArrowRight from "@/assets/icons/arrowRight";
import BookmarkFill from "@/assets/icons/bookmarkFill";
import BookmarkFull from "@/assets/icons/bookmarkFull";

import Info from "../layout/info";
import useShelves from "@/hooks/useShelves";

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
  },
  fictionWrapper: {
    backgroundColor: "var(--light-200)",
    borderRadius: 6,
    display: "flex",
    flexDirection: "column",
    gap: 45,
    padding: 20,
    width: "100%",
  },
  filterBar: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: -20,
  },
  filterBox: {
    backgroundColor: "var(--light-100)",
    border: "0.5px solid var(--border-200)",
    borderRadius: 8,
    padding: 2,
  },
  filterButton: {
    fontSize: 8.5,
    fontWeight: 550,
    padding: "3px 10px",
    backgroundColor: "var(--light-200)",
    borderRadius: 6,
    cursor: "pointer",
    color: "var(--dark-200)",
    transition: "all 0.25s ease",
  },
  filterButtonActive: {
    backgroundColor: "var(--dark-300)",
    color: "var(--dark-100)",
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
    height: "auto",
    padding: 2,
    borderRadius: 8,
    border: "0.5px solid var(--border-200)",
    backgroundColor: "var(--light-100)",
    objectFit: "cover",
    cursor: "pointer",
  },
  overlay: {
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
  overlayVisible: {
    opacity: 1,
    pointerEvents: "auto",
  },
  overlayIcon: {
    width: 14,
    height: 14,
    cursor: "pointer",
    color: "var(--border-100)",
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
    padding: "2px 35px 2px 40px",
    textAlign: "center",
    textTransform: "capitalize",
    transform: "rotate(45deg)",
    pointerEvents: "none",
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
  },
  paginationButton: {
    backgroundColor: "var(--light-100)",
    border: "0.5px solid var(--border-100)",
    borderRadius: 5,
    color: "var(--dark-100)",
    padding: "0 3.5px",
    width: "fit-content"
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
};

const genres = [
  "All", "Romance", "Fantasy", "Sci-Fi", "Mystery", "Thriller", "Horror", "Adventure", "Historical Fiction", "Dystopian", "Drama"
];

const Fiction: FC = () => {
  const navigate = useNavigate();
  const { startSearchGoogleBooks, loading } = useShelves();

  const [page, setPage] = useState(1);
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [hovered, setHovered] = useState<number | null>(null);
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [books, setBooks] = useState<{ fiction: any[]; nonFiction: any[] }>({ fiction: [], nonFiction: [] });

  useEffect(() => {
    const fetchBooks = async () => {
      const result = await startSearchGoogleBooks("bestsellers"); // Default query
      if (result) setBooks(result);
    };
    fetchBooks();
  }, [startSearchGoogleBooks]);

  const toggleBookmark = (bookId: string) => 
    setBookmarks((prev) =>
      prev.includes(bookId) ? prev.filter((id) => id !== bookId) : [...prev, bookId]
    );

  // Merge fiction and non-fiction based on selectedGenre
  let allBooks: any[] = [];
  if (selectedGenre === "All") allBooks = [...books.fiction, ...books.nonFiction];
  else allBooks = books.fiction
    .concat(books.nonFiction)
    .filter((book) =>
      (book.categories || []).some((c: string) => c.toLowerCase() === selectedGenre.toLowerCase())
    );

  const booksPerPage = 12;
  const totalPages = Math.ceil(allBooks.length / booksPerPage);
  const currentBooks = allBooks.slice((page - 1) * booksPerPage, page * booksPerPage);

  const handlePrev = () => setPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <Stack gap="10" style={styles.fictionBody}>
      <Info />

      <Box style={styles.fictionMain}>
        <Box style={styles.fictionWrapper}>
          <Flex style={styles.filterBar}>
            {genres.map((genre) => (
              <Box style={styles.filterBox} key={genre}>
                <Box
                  style={{
                    ...styles.filterButton,
                    ...(selectedGenre === genre ? styles.filterButtonActive : {}),
                  }}
                  onClick={() => { setSelectedGenre(genre); setPage(1); }}
                >
                  {genre}
                </Box>
              </Box>
            ))}
          </Flex>

          {loading ? (
            <Flex justify="center" align="center" style={{ height: "300px" }}>
              <Loader />
            </Flex>
          ) : (
            <Box style={styles.booksGrid}>
              {currentBooks.map((book, idx) => (
                <Box
                  key={book.googleBooksId || idx}
                  style={styles.bookCard}
                  onMouseEnter={() => setHovered(idx)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <Box style={styles.bookWrapper}>
                    <Box style={styles.bookMain}>
                      <Image
                        src={book.coverImageUrl || "/placeholder-book.jpg"}
                        alt={book.title}
                        style={styles.bookImage}
                      />
                    </Box>

                    <Box style={styles.genreRibbon}>{book.categories?.[0] || "Unknown"}</Box>

                    <Box
                      style={{
                        ...styles.overlay,
                        ...(hovered === idx ? styles.overlayVisible : {}),
                      }}
                      onClick={() => navigate(`/shelves/fiction/${idx}`, { state: book })}
                    >
                      <Box onClick={(e) => { e.stopPropagation(); toggleBookmark(book.googleBooksId || idx.toString()); }}>
                        {bookmarks.includes(book.googleBooksId || idx.toString()) ? (
                          <BookmarkFull style={styles.overlayIcon} />
                        ) : (
                          <BookmarkFill style={styles.overlayIcon} />
                        )}
                      </Box>
                    </Box>
                  </Box>

                  <Box style={styles.bookTexts}>
                    <Text style={styles.bookTitle}>{book.title}</Text>
                    <Text style={styles.bookAuthor}>{book.author}</Text>
                  </Box>
                </Box>
              ))}
            </Box>
          )}

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
      </Box>
    </Stack>
  );
};

export default Fiction;
