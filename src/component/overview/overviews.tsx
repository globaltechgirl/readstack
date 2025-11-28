import type { FC, CSSProperties } from "react";
import { useEffect, useState } from "react";
import { Box, Text, Image } from "@mantine/core";

import BookmarkFill from "@/assets/icons/bookmarkFill";
import useShelves from "@/hooks/use-shelves";
import { useNavigate } from "react-router-dom";
import Toast from "../layout/toast";
import BookmarkFull from "@/assets/icons/bookmarkFull";

const styles: Record<string, CSSProperties> = {
  overviewsMain: {
    padding: 3,
    backgroundColor: "var(--light-100)",
    border: "0.5px solid var(--border-200)",
    borderRadius: 8,
  },
  overviewsWrapper: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    padding: 20,
    backgroundColor: "var(--light-200)",
    borderRadius: 6,
    gap: 45,
  },
  topSection: {
    display: "flex",
    gap: 20,
    alignItems: "flex-start",
  },
  topLeft: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  topLeftBox: {
    display: "flex",
    gap: 25,
    marginTop: 10,
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
    transition: "transform 0.3s, box-shadow 0.3s",
    cursor: "pointer",
  },
  bookInfo: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
    paddingTop: 20,
  },
  topInfo: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  bookTitle: {
    fontSize: 15,
    fontWeight: 600,
    color: "var(--dark-100)",
  },
  bookAuthor: {
    fontSize: 10,
    fontWeight: 500,
    color: "var(--dark-200)",
  },
  bottomInfo: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  bookSummary: {
    fontSize: 10,
    fontWeight: 500,
    color: "var(--dark-200)",
    lineHeight: 1.6,
    marginTop: 5,
    maxWidth: 380,
    textAlign: "justify",
  },
  continueBox: {
    width: "fit-content",
    backgroundColor: "var(--light-100)",
    border: "0.5px solid var(--border-200)",
    borderRadius: 6,
    padding: "2px 6px",
    cursor: "pointer",
  },
  continueText: {
    fontSize: 9,
    fontWeight: 500,
    color: "var(--dark-200)",
  },
  topPicksHeading: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  topPicksHeader: {
    fontSize: 12,
    fontWeight: 600,
    color: "var(--dark-100)",
  },
  topPicksText: {
    fontSize: 10,
    fontWeight: 500,
    color: "var(--dark-200)",
    textDecoration: "underline",
    textUnderlineOffset: 2,
    textDecorationStyle: "dotted",
    cursor: "pointer"
  },
  bookList: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    width: "100%",
  },
  recommendationCard: {
    width: "100%",
    padding: 3,
    backgroundColor: "var(--light-100)",
    border: "0.5px solid var(--border-200)",
    borderRadius: 8,
  },
  recommendationBox: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    padding: 5,
    backgroundColor: "var(--light-200)",
    height: "100%",
    borderRadius: 6,
    gap: 10,
  },
  recommendationImage: {
    width: 60,
    height: 90,
    borderRadius: 6,
    objectFit: "cover",
  },
  recommendationInfo: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    flex: 1,
    height: "100%",
    padding: "10px 0",
  },
  infoRow: {
    display: "flex",
    flexDirection: "column",
    gap: 5,
  },
  recommendationHeader: {
    fontSize: 11,
    fontWeight: 600,
    color: "var(--dark-100)",
  },
  recommendationText: {
    fontSize: 9.5,
    fontWeight: 500,
    color: "var(--dark-200)",
    cursor: "pointer",
  },
  starRow: {
    display: "flex",
    alignItems: "center",
    gap: 1,
  },
  actionRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bookmarkIcon: {
    width: 14,
    height: 14,
    cursor: "pointer",
    color: "var(--border-100)",
  },
  bookmarkMain: {
    position: "absolute",
    bottom: 20,
    left: -60,
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
  scheduleMain: {
    padding: 3,
    backgroundColor: "var(--light-100)",
    border: "0.5px solid var(--border-200)",
    borderRadius: 8,
  },
  scheduleWrapper: {
    width: "100%",
    padding: 20,
    backgroundColor: "var(--light-200)",
    borderRadius: 6,
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  scheduleHeading: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  scheduleHeader: {
    fontSize: 11,
    fontWeight: 600,
    color: "var(--dark-100)",
  },
  scheduleArrow: {
    display: "flex",
    alignItems: "center",
    gap: 5,
  },
  arrowButton: {
    cursor: "pointer",
    width: 12,
  },
  dayBox: {
    padding: "4px 6px",
    borderRadius: 6,
    cursor: "pointer",
    textAlign: "center",
    minWidth: 30,
  },
  dayRow: {
    display: "flex",
    gap: 5,
    overflowX: "auto",
    width: "100%",
    justifyContent: "space-between"
  },
  dayText: {
    fontSize: 9.5,
    fontWeight: 500,
    color: "var(--dark-200)",
  },
  dateText: {
    fontSize: 10,
    fontWeight: 500,
    color: "var(--dark-100)",
  },
  activeDay: {
    backgroundColor: "var(--light-100)",
    border: "0.5px solid var(--border-200)",
  },
  readingList: {
    display: "flex",
    flexDirection: "column",
    gap: 30,
    marginTop: 10,
    position: "relative",
  },
  readingRow: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    position: "relative",
  },
  bookBox: {
    width: 35,
    height: 50,
    objectFit: "cover",
    borderRadius: 5,
    padding: 2,
    border: "0.5px solid var(--border-200)",
    backgroundColor: "var(--light-100)",
  },
  readingBookRow: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  bookName: {
    fontSize: 10,
    fontWeight: 500,
    color: "var(--dark-100)",
  },
  bookComment: {
    fontSize: 9.5,
    fontWeight: 500,
    color: "var(--dark-200)",
    fontFamily: "'Pangolin', cursive",
  },
  connector: {
    position: "absolute",
    width: 1,
    borderLeft: "1px dashed var(--border-200)",
    left: 17,
    top: 50,
    zIndex: 0,
  },
  centerText: {
    fontSize: 10,
    fontWeight: 550,
    color: "var(--dark-200)",
  },
};

export interface BookDisplay {
  isbn: string;
  id?: string | number | null;
  title: string;
  author: string;
  image: string;
  genre: string;
  rating: number;
  progress: number;
  description?: string;
}

const BookCard: FC<{
  book: BookDisplay;
  idx: number;
  handleAddToShelf: (book: BookDisplay) => void; // <-- changed to BookDisplay
  isBookmarked?: boolean;
}> = ({ book, handleAddToShelf, isBookmarked }) => (
  <Box style={{ ...styles.recommendationCard }}>
    <Box style={{ ...styles.recommendationBox }}>
      <Image src={book.image} alt={book.title} style={styles.recommendationImage} />
      <Box style={styles.recommendationInfo}>
        <Box style={styles.infoRow}>
          <Text style={styles.recommendationHeader}>{book.title}</Text>
          <Text style={styles.recommendationText}>{book.author}</Text>
        </Box>
        <Box style={{ display: "flex", justifyContent: "flex-end" }}>
          {isBookmarked ? (
            <BookmarkFull style={styles.bookmarkIcon} />
          ) : (
            <BookmarkFill
              style={styles.bookmarkIcon}
              onClick={() => handleAddToShelf(book)} // <-- send full book
            />
          )}
        </Box>
      </Box>
    </Box>
  </Box>
);

const Overviews: FC = () => {
  const navigate = useNavigate();
  const { fetchAllShelves, fetchFeaturedBooks, addToShelf } = useShelves();
  const [recentBook, setRecentBook] = useState<BookDisplay | null>(null);
  const [topRecommendations, setTopRecommendations] = useState<BookDisplay[]>([]);
  const [loadingRecent, setLoadingRecent] = useState(true);
  const [loadingRecommendations, setLoadingRecommendations] = useState(true);

  const [addShelfStatus, setAddShelfStatus] = useState<"idle" | "adding" | "added" | "error">("idle");
  const [addShelfMessage, setAddShelfMessage] = useState<string | null>(null);
  const [bookmarked, setBookmarked] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const loadRecentBook = async () => {
      setLoadingRecent(true);
      try {
        const shelves = await fetchAllShelves();
        const first = shelves?.currentlyReading?.[0];
        if (!first) return setRecentBook(null);

        setRecentBook({
          id: String(first.book?.isbn ?? first.userBook?.bookId ?? ""),
          isbn: first.book?.isbn ?? first.userBook?.bookId ?? "",
          title: first.book?.title ?? first.userBook?.title ?? "Unknown Title",
          author:
            first.book?.author ??
            first.book?.authors?.[0] ??
            first.userBook?.author ??
            first.userBook?.authors?.[0] ??
            "Unknown Author",
          image:
            first.book?.coverUrl ??
            first.book?.coverImageUrl ??
            first.userBook?.coverUrl ??
            first.userBook?.coverImageUrl ??
            "/placeholder-book.png",
          genre: String(
            first.book?.genre ??
            first.book?.categories?.[0] ??
            first.userBook?.categories?.[0] ??
            "Unknown"
          ),
          rating: first.userBook?.averageRating ?? 0,
          progress: first.userBook?.progress ?? 0,
          description: first.book?.description ?? first.userBook?.description ?? "No description available",
        });
      } catch (err) {
        console.error(err);
        setRecentBook(null);
      } finally {
        setLoadingRecent(false);
      }
    };
    loadRecentBook();
  }, []);

  useEffect(() => {
    const loadRecommendations = async () => {
      setLoadingRecommendations(true);
      try {
        const featured = await fetchFeaturedBooks();
        const formatted: BookDisplay[] = featured.map((b: any) => ({
          id: b.bookId || String(b.id || Math.random()),
          isbn: b.bookId || String(b.id || Math.random()),
          title: b.title || "No title",
          author: Array.isArray(b.authors) ? b.authors.join(", ") : "Unknown",
          image: b.coverImageUrl || "/placeholder-book.png",
          genre: b.categories?.[0] || "Unknown",
          rating: b.averageRating ?? 0,
          progress: 0,
        }));
        setTopRecommendations(formatted.slice(0, 4));
        setBookmarked(
          Object.fromEntries(formatted.slice(0, 4).map(book => [book.isbn, false]))
        );
      } catch (err) {
        console.error(err);
        setTopRecommendations([]);
        setBookmarked({});
      } finally {
        setLoadingRecommendations(false);
      }
    };
    loadRecommendations();
  }, []);

  // Updated to accept full BookDisplay
  const handleAddToShelfClick = async (book: BookDisplay) => {
    if (!book?.isbn) {
      setAddShelfStatus("error");
      setAddShelfMessage("Upload the book first");
      setTimeout(() => setAddShelfMessage(null), 3000);
      return;
    }

    setAddShelfStatus("adding");
    setAddShelfMessage(null);

    try {
      console.log("Sending book to addToShelf:", book);

      const res = await addToShelf(book); 
      console.log("Response from addToShelf:", res);

      if (res && (res.message || res.id)) {
        setAddShelfStatus("added");
        setAddShelfMessage("Book added successfully");
        setBookmarked(prev => ({ ...prev, [book.isbn]: true }));
        console.log("Updated bookmarked state for ISBN:", book.isbn);
      } else {
        setAddShelfStatus("error");
        setAddShelfMessage("Failed to add to shelf");
      }
    } catch (err: any) {
      console.error("addToShelf error:", err);
      setAddShelfStatus("error");
      setAddShelfMessage(err?.message ?? "Failed to add to shelf");
    } finally {
      setTimeout(() => setAddShelfMessage(null), 3000);
    }
  };

  return (
    <Box style={styles.overviewsMain}>
      <Box style={styles.overviewsWrapper}>
        <Box style={styles.topSection}>
          <Box style={styles.topLeft}>
            {loadingRecent ? (
              <Text style={styles.centerText}>Loading recent read...</Text>
            ) : recentBook ? (
              <Box style={styles.topLeftBox}>
                <Image src={recentBook.image} alt={recentBook.title} style={styles.bookImage} />
                <Box style={styles.bookInfo}>
                  <Box style={styles.topInfo}>
                    <Text style={styles.bookTitle}>{recentBook.title}</Text>
                    <Text style={styles.bookAuthor}>{recentBook.author}</Text>
                  </Box>
                  <Box style={styles.bottomInfo}>
                    <Text style={styles.bookSummary}>{recentBook.description}</Text>
                    <Box style={styles.continueBox}>
                      <Text style={styles.continueText}>{recentBook.genre}</Text>
                    </Box>
                  </Box>
                </Box>
              </Box>
            ) : (
              <Text style={styles.centerText}>No recent read found</Text>
            )}
          </Box>
        </Box>

        <Box style={{ width: "100%" }}>
          <Box style={styles.topPicksHeading}>
            <Text style={styles.topPicksHeader}>Recommendations</Text>
            <Text style={styles.topPicksText} onClick={() => navigate("/books/all")}>Browse more</Text>
          </Box>
          {loadingRecommendations ? (
            <Text style={styles.centerText}>Loading recommendations...</Text>
          ) : topRecommendations.length > 0 ? (
            <Box style={styles.bookList}>
              {topRecommendations.map((book, idx) => (
                <BookCard
                  key={book.id}
                  book={book}
                  idx={idx}
                  handleAddToShelf={handleAddToShelfClick}
                  isBookmarked={!!bookmarked[book.isbn]}
                />
              ))}
            </Box>
          ) : (
            <Text style={styles.centerText}>No recommendations found</Text>
          )}
        </Box>
      </Box>

      {addShelfMessage && (
        <Toast message={addShelfMessage} status={addShelfStatus === "added" ? "success" : "error"} />
      )}
    </Box>
  );
};

export default Overviews;
