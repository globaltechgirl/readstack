import { type FC, type CSSProperties, useState, useEffect, useRef } from "react";
import { Box, Text, Image, Button, Flex, Stack, Center } from "@mantine/core";
import { useNavigate } from "react-router-dom";

import ArrowLeft from "@/assets/icons/arrowLeft";
import ArrowRight from "@/assets/icons/arrowRight";
import Info from "../layout/info";
import useShelves from "@/hooks/use-shelves";
import { Shelves } from "@/types/shelves";

const styles: Record<string, CSSProperties> = {
  allBody: {
    width: "100%",
    height: "100vh",
    padding: 2,
    paddingLeft: 0,
    backgroundColor: "var(--white)",
  },
  allMain: {
    backgroundColor: "var(--light-100)",
    border: "0.5px solid var(--border-200)",
    borderRadius: 8,
    padding: 3,
    flex: 1,            
    display: "flex",
    flexDirection: "column",
  },
  allWrapper: {
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
    paddingTop: 30,
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
  centerText: {
    fontSize: 10,
    fontWeight: 550,
    color: "var(--dark-200)",
  },
};

interface Book {
  id: string;
  image: string;
  title: string;
  author: string;
  tag: string;
}

const All: FC = () => {
  const navigate = useNavigate();
  const { searchForBooks, fetchFeaturedBooks, loading } = useShelves();

  const [hovered, setHovered] = useState<number | null>(null);
  const [books, setBooks] = useState<Book[]>([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const booksPerPage = 12;

  const booksGridRef = useRef<HTMLDivElement | null>(null);

  const totalPages = Math.max(1, Math.ceil(books.length / booksPerPage));
  const currentBooks = books.slice((page - 1) * booksPerPage, page * booksPerPage);

  const handlePrev = () => setPage(prev => Math.max(prev - 1, 1));
  const handleNext = () => setPage(prev => Math.min(prev + 1, totalPages));

  useEffect(() => {
    booksGridRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [page]);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const featured = await fetchFeaturedBooks();
        const featuredBooks: Book[] = featured.map(shelf => ({
          id: shelf.bookId || String(shelf.id || Math.random()),
          image: shelf.coverImageUrl || "/placeholder-book.png",
          title: shelf.title || "No title",
          author: Array.isArray(shelf.authors) ? shelf.authors.join(", ") : "Unknown",
          tag: shelf.categories?.[0] || "Unknown",
        }));
        setBooks(featuredBooks);
        setPage(1);
      } catch (error) {
        console.error("Failed to fetch featured books:", error);
        setBooks([]);
      }
    };

    if (!query.trim()) fetchFeatured();
  }, []); 

  useEffect(() => {
    const handler = setTimeout(async () => {
      if (!query.trim()) return;

      try {
        const results = await searchForBooks(query);
        const resultsArray: Shelves[] = Array.isArray(results) ? results : [results];

        const searchBooksArray: Book[] = resultsArray.map(shelf => ({
          id: shelf.bookId || String(shelf.id || Math.random()),
          image: shelf.coverImageUrl || "/placeholder-book.png",
          title: shelf.title || "No title",
          author: Array.isArray(shelf.authors) ? shelf.authors.join(", ") : "Unknown",
          tag: shelf.categories?.[0] || "Unknown",
        }));

        setBooks(searchBooksArray);
        setPage(1);
      } catch (error) {
        console.error("Search error:", error);
        setBooks([]);
        setPage(1);
      }
    }, 500);

    return () => clearTimeout(handler);
  }, [query, searchForBooks]);

  const trimChars = (text: string | undefined, maxChars: number) => {
    if (!text || text.trim() === "") return "N/A";
    return text.length > maxChars ? text.slice(0, maxChars) + "..." : text;
  };

  return (
    <Stack gap="10" style={styles.allBody}>
      <Info query={query} setQuery={setQuery} />

      <Box style={styles.allMain}>
        <Box style={styles.allWrapper}>
          {loading && books.length === 0 ? (
            <Center style={{ width: "100%", padding: 50 }}>
              <Text style={styles.centerText}>Loading all books...</Text>
            </Center>
          ) : currentBooks.length === 0 ? (
            <Center style={{ width: "100%", padding: 50 }}>
              <Text style={styles.centerText}>
                {query ? "No books found" : "No featured books available"}
              </Text>
            </Center>
          ) : (
            <Box style={styles.booksGrid} ref={booksGridRef}>
              {currentBooks.map((book, idx) => (
                <Box
                  key={book.id}
                  style={styles.bookCard}
                  onMouseEnter={() => setHovered(idx)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <Box style={styles.bookWrapper}>
                    <Box style={styles.bookMain}>
                      <Image
                        src={book.image}
                        alt={book.title}
                        style={{
                          ...styles.bookImage,
                          cursor: query.trim() ? "pointer" : "default",
                        }}
                        onClick={() => {
                          if (query.trim()) {
                            navigate(`/search/${book.id}`, { state: { book } });
                          }
                        }}
                      />
                    </Box>
                    <Box style={styles.genreRibbon}>{trimChars(book.tag, 8)}</Box>
                    <Box
                      onClick={() => {
                        if (query.trim()) {
                          navigate(`/search/${book.id}`, { state: { book } });
                        }
                      }}
                      style={{
                        ...styles.overlay,
                        ...(hovered === idx ? styles.overlayVisible : {}),
                        cursor: query.trim() ? "pointer" : "default",
                        pointerEvents: query.trim() ? "auto" : "none",
                      }}
                    ></Box>
                  </Box>
                  <Box style={styles.bookTexts}>
                    <Text style={styles.bookTitle}>{book.title}</Text>
                    <Text style={styles.bookAuthor}>{book.author}</Text>
                  </Box>
                </Box>
              ))}

              {books.length > 0 && (
                <Flex style={{ ...styles.paginationContainer, gridColumn: "1 / -1" }}>
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
              )}
            </Box>
          )}
        </Box>
      </Box>
    </Stack>
  );
};

export default All;
