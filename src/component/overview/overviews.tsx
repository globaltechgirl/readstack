import type { FC, CSSProperties, JSX } from "react";
import { useEffect, useState } from "react";
import { Box, Text, Image } from "@mantine/core";

import useShelves from "@/hooks/use-shelves";
import { useNavigate } from "react-router-dom";
import StarIcon from "@/assets/icons/star";
import HalfStarIcon from "@/assets/icons/halfStar";
import FullStarIcon from "@/assets/icons/fullStar";

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
  topLeftWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    flex: 1,
    width: "100%",
  },
  topLeftBox: {
    flex: 1,
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
  renderStars: (rating: number) => JSX.Element[];
}> = ({ book, renderStars }) => (
  <Box style={styles.recommendationCard}>
    <Box style={styles.recommendationBox}>
      <Image src={book.image} alt={book.title} style={styles.recommendationImage} />
      <Box style={styles.recommendationInfo}>
        <Box style={styles.infoRow}>
          <Text style={styles.recommendationHeader}>{book.title}</Text>
          <Text style={styles.recommendationText}>{book.author}</Text>
        </Box>
        <Box>
          <Box style={styles.starRow}>{renderStars(book.rating)}</Box>
        </Box>
      </Box>
    </Box>
  </Box>
);

const Overviews: FC = () => {
  const navigate = useNavigate();
  const { fetchAllShelves, fetchFeaturedBooks } = useShelves();
  const [recentBooks, setRecentBooks] = useState<BookDisplay[]>([]);
  const [topRecommendations, setTopRecommendations] = useState<BookDisplay[]>([]);
  const [loadingRecent, setLoadingRecent] = useState(true);
  const [loadingRecommendations, setLoadingRecommendations] = useState(true);
 
  useEffect(() => {
    const loadRecentBook = async () => {
      setLoadingRecent(true);
      try {
        const shelves = await fetchAllShelves();
        const recent = shelves?.currentlyReading?.slice(0, 2) || [];

        const formatted: BookDisplay[] = recent.map((first) => ({
          id: String(first.book?.isbn ?? first.userBook?.bookId ?? ""),
          isbn: first.book?.isbn ?? first.userBook?.bookId ?? "",
          title: first.book?.title ?? first.userBook?.title ?? "Unknown Title",
          author:
            first.book?.author ?? first.book?.authors?.[0] ?? first.userBook?.author ?? first.userBook?.authors?.[0] ?? "Unknown Author",
          image: first.book?.coverUrl ?? first.book?.coverImageUrl ?? first.userBook?.coverUrl ?? first.userBook?.coverImageUrl ?? "/placeholder-book.png",
          genre: String(first.book?.genre ?? first.book?.categories?.[0] ?? first.userBook?.categories?.[0] ?? "Unknown"),
          rating: first.userBook?.averageRating ?? 0,
          progress: first.userBook?.progress ?? 0,
          description: first.book?.description ?? first.userBook?.description ?? "No description available",
        }));

        setRecentBooks(formatted);
      } catch (err) {
        console.error(err);
        setRecentBooks([]);
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
      } catch (err) {
        console.error(err);
        setTopRecommendations([]);
      } finally {
        setLoadingRecommendations(false);
      }
    };
    loadRecommendations();
  }, []);

  const renderStars = (rating: number) =>
    Array.from({ length: 5 }, (_, i) => {
      if (rating >= i + 1)
        return <FullStarIcon key={i} width={11} height={11} color="var(--dark-200)" />;
      if (rating >= i + 0.5)
        return <HalfStarIcon key={i} width={11} height={11} color="var(--dark-200)" />;
      return <StarIcon key={i} width={11} height={11} color="var(--dark-200)" />;
    });

  return (
    <Box style={styles.overviewsMain}>
      <Box style={styles.overviewsWrapper}>
        <Box style={styles.topSection}>
          <Box style={styles.topLeft}>
            {loadingRecent ? (
              <Text style={styles.centerText}>Loading recent reads...</Text>
            ) : recentBooks.length > 0 ? (
              <Box style={styles.topLeftWrapper}>
                {recentBooks.map((book) => (
                  <Box key={book.id} style={styles.topLeftBox}>
                    <Image src={book.image} alt={book.title} style={styles.bookImage} />
                    <Box style={styles.bookInfo}>
                      <Box style={styles.topInfo}>
                        <Text style={styles.bookTitle}>{book.title}</Text>
                        <Text style={styles.bookAuthor}>{book.author}</Text>
                      </Box>
                      <Box style={styles.bottomInfo}>
                        <Text style={styles.bookSummary}>{book.description}</Text>
                        <Box style={styles.continueBox}>
                          <Text style={styles.continueText}>{book.genre}</Text>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                ))}
              </Box>
            ) : (
              <Text style={styles.centerText}>No recent reads found</Text>
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
                  renderStars={renderStars}
                />
              ))}
            </Box>
          ) : (
            <Text style={styles.centerText}>No recommendations found</Text>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Overviews;
