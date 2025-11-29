import { type FC, type CSSProperties, useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Box, Text, Image, Stack, Center, Anchor } from "@mantine/core";

import Info from "../layout/info";
import useShelves from "@/hooks/use-shelves";
import { Link, Shelves } from "@/types/shelves"; 

import BookmarkFill from "@/assets/icons/bookmarkFill";
import BookmarkFull from "@/assets/icons/bookmarkFull";
import Toast from "../layout/toast";

const styles: Record<string, CSSProperties> = {
  viewBody: {
    width: "100%",
    height: "100vh",
    padding: 2,
    paddingLeft: 0,
    backgroundColor: "var(--white)",
  },
  viewMain: {
    backgroundColor: "var(--light-100)",
    border: "0.5px solid var(--border-200)",
    borderRadius: 8,
    padding: 3,
    flex: 1,            
    display: "flex",
    flexDirection: "column",
  },
  viewWrapper: {
    backgroundColor: "var(--light-200)",
    borderRadius: 6,
    display: "flex",
    flexDirection: "column",
    padding: "40px 20px 20px 20px",
    width: "100%",
  },
  viewSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
  },
  topSection: {
    display: "flex",
    gap: 50,
    alignItems: "flex-start",
    height: "100%"
  },
  bookImage: {
    width: 180,
    height: 260,
    objectFit: "cover",
    border: "0.5px solid var(--border-200)",
    backgroundColor: "var(--light-100)",
    borderRadius: 8,
    padding: 2,
    transform: "rotateY(-2deg)",
    cursor: "pointer",
    zIndex: 2,
    marginLeft: 70,
  },
  bookInfo: {
    display: "flex",
    flexDirection: "column",
    gap: 15,
    paddingTop: 40,
    alignItems: "flex-start",
  },
  bookTitle: {
    fontSize: 30,
    fontWeight: 600,
    color: "var(--dark-100)",
    width: 300,
    outline: "none",
    userSelect: "text",
  },
  bookAuthor: {
    fontSize: 13,
    fontWeight: 550,
    color: "var(--dark-100)",
    outline: "none",
    userSelect: "text",
  },
  bookGenre: {
    fontSize: 11,
    fontWeight: 500,
    color: "var(--dark-200)",
    fontStyle: "italic",
    marginBottom: 20,
    outline: "none",
    userSelect: "text",
  },
  bottomSection: {
    width: "90%",
    backgroundColor: "var(--light-200)",
    border: "0.5px solid var(--border-200)",
    borderRadius: 8,
    padding: 3,
    display: "flex",
    flexDirection: "column",
    position: "relative",
    zIndex: 1,
    marginTop: "-80px",
  },
  bottomWrapper: {
    backgroundColor: "var(--light-100)",
    borderRadius: 6,
    display: "flex",
    flexDirection: "column",
    gap: 15,
    padding: 40,
    width: "100%",
  },
  actionWrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    gap: 20,
    width: "50%",
    marginLeft: "auto",
  },
  actionRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  continueBox: {
    width: "fit-content",
    padding: 2,
    backgroundColor: "var(--light-100)",
    border: "0.5px solid var(--border-200)",
    borderRadius: 6,
    cursor: "pointer",
    textDecoration: "none"
  },
  continueText: {
    fontSize: 9,
    fontWeight: 500,
    color: "var(--dark-200)",
    padding: "2px 6px",
    borderRadius: 5,
    backgroundColor: "var(--light-200)",
  },
  iconWrappers: {
    display: "flex",
    gap: 10,
  },
  iconWrapper: {
    padding: 2,
    borderRadius: "50%",
    backgroundColor: "var(--light-200)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  iconBox: {
    padding: 4.5,
    borderRadius: "50%",
    backgroundColor: "var(--light-100)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  },
  iconInner: {
    width: 11,
    height: 11,
  },
  bookmarkMain: {
    position: "absolute",
    top: 75,
    right: 40,
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
  actionHr: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  hrLine: {
    width: "100%",
    border: "0.5px solid var(--border-200)",
  },
  bottomContent: {
    display: "flex",
    justifyContent: "space-between",
    gap: 50,
    marginTop: 30,
  },
  descriptionBox: {
    flex: 1.5,
  },
  detailsWrapper: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: 30,
  },
  detailsBox: {
    display: "flex",
    flexDirection: "column",
    gap: 15,
    textAlign: "justify",
  },
  detailLabel: {
    fontSize: 11,
    fontWeight: 600,
    color: "var(--dark-100)",
  },
  detailValue: {
    fontSize: 10,
    fontWeight: 550,
    color: "var(--dark-200)",
    lineHeight: 1.6,
    outline: "none",
    userSelect: "text",
  },
  centerText: {
    fontSize: 10,
    fontWeight: 550,
    color: "var(--dark-200)",
  },
};

interface BookActionsProps {
  bookmarked: boolean;
  genre?: string;
  googleLink?: string;
  onBookmark: () => void;
  bookIsbn: string;
  handleAddToShelf: () => Promise<boolean>; 
}

const BookActions: FC<BookActionsProps> = ({
  bookmarked,
  onBookmark,
  googleLink,
  handleAddToShelf,
}) => (
  <Box style={styles.actionWrapper}>
    <Box style={styles.actionRow}>
      {googleLink && (
        <Box
          style={styles.continueBox}
          onClick={(e) => {
            e.preventDefault();  
            e.stopPropagation(); 
            window.open(googleLink, "_blank"); 
          }}
        >
          <Text style={styles.continueText}>View on Google</Text>
        </Box>
      )}

      <Box style={styles.iconWrappers}>
        <Box style={styles.iconWrapper}>
          <Box
            style={styles.iconBox}
            onClick={async (e) => {
              e.preventDefault();   
              e.stopPropagation(); 
              const success = await handleAddToShelf();
              if (success) onBookmark();
            }}
          >
            {bookmarked ? (
              <BookmarkFull style={styles.iconInner} />
            ) : (
              <BookmarkFill style={styles.iconInner} />
            )}
          </Box>
        </Box>
      </Box>
    </Box>
    <Box style={styles.actionHr}><hr style={styles.hrLine} /></Box>
  </Box>
);

const formatDate = (dateString?: string) => {
  if (!dateString) return "-";
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric" }).format(date);
  } catch {
    return dateString;
  }
};

const SearchView: FC = () => {
  const location = useLocation();
  const { bookId } = useParams<{ bookId: string }>();
  const { fetchBookDetails, addToShelf } = useShelves();

  const [book, setBook] = useState<Shelves | null>(null);
  const [isFetchingBook, setIsFetchingBook] = useState(true);
  const [addShelfStatus, setAddShelfStatus] = useState<"idle" | "adding" | "added" | "error">("idle");
  const [addShelfMessage, setAddShelfMessage] = useState<string | null>(null);
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchBook = async () => {
      setIsFetchingBook(true);
      try {
        let data: Shelves | null = null;

        if (bookId) {
          try {
            data = await fetchBookDetails(bookId);
          } catch (err: any) {
            console.error("Fetch error:", err);

            if (err?.response?.status === 404) {
              if (isMounted) setBook(null);
              return;
            }
          }
        }

        if (!data && location.state) {
          const fallback = location.state as Shelves;
          if (fallback?.title) data = fallback;
        }

        if (isMounted) setBook(data);
      } catch (err) {
        console.error("Unexpected error:", err);
      } finally {
        if (isMounted) setIsFetchingBook(false);
      }
    };

    fetchBook();

    return () => {
      isMounted = false;
    };
  }, [bookId, location.state]);

  const googleLink = book?.readLinks?.find((link) =>
    link.platform.toLowerCase().includes("google")
  )?.url;

  const firstLinks: Link[] = [];
  if (book?.readLinks) {
    const otherLinks = book.readLinks.filter(
      (link) => !link.platform.toLowerCase().includes("google")
    );
    firstLinks.push(...otherLinks.slice(0, 3));
  }

  const handleAddToShelf = async (): Promise<boolean> => {
    if (!book?.bookId) {
      setAddShelfStatus("error");
      setAddShelfMessage("Book ID not found");
      setTimeout(() => setAddShelfMessage(null), 3000);
      return false;
    }

    setAddShelfStatus("adding");
    setAddShelfMessage(null);

    try {
      const res = await addToShelf(book.bookId);
      if (res?.message) {
        setAddShelfStatus("added");
        setAddShelfMessage("Book added successfully");
        setBookmarked(true);
        setTimeout(() => setAddShelfMessage(null), 3000);
        return true;
      } else {
        setAddShelfStatus("error");
        setAddShelfMessage("Failed to add to shelf");
        setTimeout(() => setAddShelfMessage(null), 3000);
        return false;
      }
    } catch (err: any) {
      console.error("addToShelf error:", err);
      setAddShelfStatus("error");
      setAddShelfMessage(err?.message ?? "Failed to add to shelf");
      setTimeout(() => setAddShelfMessage(null), 3000);
      return false;
    }
  };

  return (
    <Stack gap="10" style={styles.viewBody}>
      <Info query={""} setQuery={() => {}} />

      <Box style={styles.viewMain}>
        <Box style={styles.viewWrapper}>
          <Box style={styles.viewSection}>
            {isFetchingBook ? (
              <Center style={{ width: "100%", padding: 50 }}>
                <Text style={styles.centerText}>Loading book details...</Text>
              </Center>
            ) : !book && !location.state ? (
              <Center style={{ width: "100%", padding: 50 }}>
                <Text style={styles.centerText}>No book details available.</Text>
              </Center>
            ) : (
              book && (
                <>
                  <Box style={styles.topSection}>
                    <Image
                      src={book.coverImageUrl || "/placeholder-book.png"}
                      alt={book.title}
                      style={styles.bookImage}
                    />
                    <Box style={styles.bookInfo}>
                      <Text style={styles.bookTitle}>{book.title || "-"}</Text>
                      <Text style={styles.bookAuthor}>
                        {Array.isArray(book.authors)
                          ? book.authors.join(", ")
                          : book.authors || "-"}
                      </Text>
                    </Box>
                  </Box>

                  <Box style={styles.bottomSection}>
                    <Box style={styles.bottomWrapper}>
                      <BookActions
                        bookmarked={bookmarked}
                        genre={book.categories?.[0]}
                        googleLink={googleLink}
                        onBookmark={() => setBookmarked(true)}
                        handleAddToShelf={handleAddToShelf}
                        bookIsbn={book?.isbn || ""}
                      />

                      <Box style={styles.bottomContent}>
                        <Box style={{ ...styles.descriptionBox, ...styles.detailsBox }}>
                          <Text style={styles.detailLabel}>Description</Text>
                          <Box
                            style={styles.detailValue}
                            dangerouslySetInnerHTML={{ __html: book.description || "-" }}
                          />
                        </Box>

                        <Box style={styles.detailsWrapper}>
                          <Box style={styles.detailsBox}>
                            <Text style={styles.detailLabel}>Genres</Text>
                            <Text style={styles.detailValue}>
                              {book.categories?.length ? book.categories.join(", ") : "-"}
                            </Text>
                          </Box>

                          <Box style={styles.detailsBox}>
                            <Text style={styles.detailLabel}>Publication</Text>
                            <Text style={styles.detailValue}>
                              {formatDate(book.publishedDate || "-")}
                            </Text>
                          </Box>

                          <Box style={styles.detailsBox}>
                            <Text style={styles.detailLabel}>Format</Text>
                            <Text style={styles.detailValue}>{book.pageCount || "-"} Pages</Text>
                          </Box>

                          {firstLinks.length > 0 && (
                            <Box style={styles.detailsBox}>
                              <Text style={styles.detailLabel}>Other Links</Text>
                              {firstLinks.map((link: Link, idx: number) => (
                                <Anchor
                                  key={idx}
                                  href={link.url}
                                  target="_blank"
                                  style={{ ...styles.detailValue, textDecoration: "none" }}
                                >
                                  {link.platform || link.url}
                                </Anchor>
                              ))}
                            </Box>
                          )}
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </>
              )
            )}

            {addShelfMessage && (
              <Toast message={addShelfMessage} status={addShelfStatus === "added" ? "success" : "error"}/>
            )}
          </Box>
        </Box>
      </Box>
    </Stack>
  );
};


export default SearchView;
