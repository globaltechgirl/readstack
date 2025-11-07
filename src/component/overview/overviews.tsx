import type { FC, CSSProperties } from "react";
import { useState } from "react";
import { Box, Text, Image } from "@mantine/core";

import Book1 from "@/assets/book1.jpg";
import Book2 from "@/assets/book2.jpg";
import Book3 from "@/assets/book3.jpg";
import Book4 from "@/assets/book4.jpg";
import Book5 from "@/assets/book5.jpg";
import Book6 from "@/assets/book6.jpg";
import Book7 from "@/assets/book7.jpg";
import Book8 from "@/assets/book8.jpg";
import Book9 from "@/assets/book9.jpg";
import Book10 from "@/assets/book10.jpg";
import authorImage from "@/assets/author.png";

import ArrowLeft from "@/assets/icons/arrowLeft";
import ArrowRight from "@/assets/icons/arrowRight";
import StarIcon from "@/assets/icons/star";
import HalfStarIcon from "@/assets/icons/halfStar";
import FullStarIcon from "@/assets/icons/fullStar";
import BookmarkFillIcon from "@/assets/icons/bookmarkFill";
import BookmarkFullIcon from "@/assets/icons/bookmarkFull";

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
    gap: 40,
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
  greetingText: {
    fontSize: 15,
    fontWeight: 700,
    color: "var(--dark-100)",
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
    paddingTop: 10,
  },
  topInfo: {
    display: "flex",
    flexDirection: "column",
    gap: 5,
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
    gap: 15,
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
    gap: 2,
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
};

const username = "Harry";

const currentBook = {
  title: "Fourth Wing",
  author: "Rebecca Yarrow",
  image: Book3,
  authorPhoto: authorImage,
  summary:
    "Twenty-year-old Violet Sorrengail was supposed to enter the Scribe Quadrant, living a quiet life among books and history. Now, the commanding general—also known as her tough-as-talons mother—has ordered Violet to join the hundreds of candidates striving to become the elite of Navarre: dragon riders. But when you’re smaller than everyone else and your body is brittle, death is only a heartbeat away...because dragons don’t bond to “fragile” humans. They incinerate them. With fewer dragons willing to bond than cadets, most would kill Violet to better their own chances of success.",
  currentPage: 120,
  totalPages: 300,
};

const topPicks = [
  { title: "Not In Love", author: "ALi Hazelwood", image: Book1, rating: 4.6 },
  { title: "Funny Story", author: "Emily Henry", image: Book2, rating: 3.5 },
  { title: "Harry Porter", author: "J.K. Rowling", image: Book4, rating: 5 },
  { title: "The Silent Patient", author: "Alex Michaelides", image: Book5, rating: 4 },
];

const truncateSummary = (text: string, wordLimit: number) =>
  text.split(" ").length <= wordLimit ? text : text.split(" ").slice(0, wordLimit).join(" ") + "...";

const BookCard: FC<{ book: typeof topPicks[number]; bookmarked: boolean; onToggle: () => void }> = ({ book, bookmarked, onToggle }) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => {
      if (rating >= i + 1) return <FullStarIcon key={i} width={12} height={12} color="var(--dark-200)" />;
      if (rating >= i + 0.5) return <HalfStarIcon key={i} width={12} height={12} color="var(--dark-200)" />;
      return <StarIcon key={i} width={12} height={12} color="var(--dark-200)" />;
    });
  };

  return (
    <Box style={styles.recommendationCard}>
      <Box style={styles.recommendationBox}>
        <Image src={book.image} alt={book.title} style={styles.recommendationImage} />
        <Box style={styles.recommendationInfo}>
          <Box style={styles.infoRow}>
            <Text style={styles.recommendationHeader}>{book.title}</Text>
            <Text style={styles.recommendationText}>{book.author}</Text>
          </Box>
          <Box style={styles.actionRow}>
            <Box style={styles.starRow}>{renderStars(book.rating)}</Box>
            <Box onClick={onToggle} style={{ cursor: "pointer" }}>
              {bookmarked ? (
                <BookmarkFullIcon width={12} height={12} color="var(--dark-200)" />
              ) : (
                <BookmarkFillIcon width={12} height={12} color="var(--dark-200)" />
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const ReadingPlanItem: FC<{ book: { title: string; image: string; comment: string }; isLast: boolean }> = ({ book, isLast }) => (
  <Box style={styles.readingRow}>
    <Box style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Image src={book.image} alt={book.title} style={styles.bookBox} />
      {!isLast && <Box style={{ ...styles.connector, height: 30 }} />}
    </Box>
    <Box style={styles.readingBookRow}>
      <Text style={styles.bookName}>{book.title}</Text>
      <Text style={styles.bookComment}>{book.comment}</Text>
    </Box>
  </Box>
);

const ScheduleReading: FC = () => {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const [startOffset, setStartOffset] = useState(0);
  const [activeDay, setActiveDay] = useState(0);

  const allReadingPlans: Record<number, { title: string; image: string; comment: string }[]> = {
    0: [
      { title: "Book 1", image: Book6, comment: "Dragon bonding" },
      { title: "Book 2", image: Book7, comment: "Learn new spells" },
    ],
    1: [
      { title: "Book 4", image: Book8, comment: "Learn new spells" },
      { title: "Book 5", image: Book9, comment: "Dragon bonding" },
    ],
    2: [],
    3: [{ title: "Book 6", image: Book10, comment: "Chapter 1" }],
  };

  const getDate = (offset: number) => {
    const d = new Date();
    d.setDate(d.getDate() + offset);
    return { day: daysOfWeek[d.getDay()], date: d.getDate() };
  };

  const displayedDates = Array.from({ length: 7 }, (_, i) => getDate(startOffset + i));
  const readingPlan = (allReadingPlans[startOffset + activeDay] || []).slice(0, 2);

  return (
    <Box style={styles.scheduleMain}>
      <Box style={styles.scheduleWrapper}>
        <Box style={styles.scheduleHeading}>
          <Text style={styles.scheduleHeader}>Schedule Reading</Text>
          <Box style={styles.scheduleArrow}>
            <ArrowLeft style={styles.arrowButton} onClick={() => { setStartOffset(startOffset - 1); setActiveDay(0); }} />
            <ArrowRight style={styles.arrowButton} onClick={() => { setStartOffset(startOffset + 1); setActiveDay(0); }} />
          </Box>
        </Box>

        <Box style={styles.dayRow}>
          {displayedDates.map((d, idx) => (
            <Box
              key={idx}
              style={{ ...styles.dayBox, ...(activeDay === idx ? styles.activeDay : {}) }}
              onClick={() => setActiveDay(idx)}
            >
              <Text style={styles.dayText}>{d.day}</Text>
              <Text style={styles.dateText}>{d.date}</Text>
            </Box>
          ))}
        </Box>

        {readingPlan.length === 0 ? (
          <Text style={{ fontSize: 10, color: "var(--dark-200)", marginTop: 10 }}>No books for this day. Add a new book entry.</Text>
        ) : (
          <Box style={styles.readingList}>
            {readingPlan.map((book, idx) => (
              <ReadingPlanItem key={idx} book={book} isLast={idx === readingPlan.length - 1} />
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

const Overviews: FC = () => {
  const [bookmarked, setBookmarked] = useState<boolean[]>(topPicks.slice(0, 4).map(() => false));

  const toggleBookmark = (index: number) => {
    setBookmarked(prev => {
      const newState = [...prev];
      newState[index] = !newState[index];
      return newState;
    });
  };

  return (
    <Box style={styles.overviewsMain}>
      <Box style={styles.overviewsWrapper}>
        <Box style={styles.topSection}>
          <Box style={styles.topLeft}>
            <Text style={styles.greetingText}>Happy reading, {username}!</Text>
            <Box style={styles.topLeftBox}>
              <Image src={currentBook.image} alt={currentBook.title} style={styles.bookImage} />
              <Box style={styles.bookInfo}>
                <Box style={styles.topInfo}>
                  <Text style={styles.bookTitle}>{currentBook.title}</Text>
                  <Text style={styles.bookAuthor}>{currentBook.author}</Text>
                </Box>
                <Box style={styles.bottomInfo}>
                  <Text style={styles.bookSummary}>{truncateSummary(currentBook.summary, 100)}</Text>
                  <Box style={styles.continueBox}>
                    <Text style={styles.continueText}>View Goodreads</Text>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>

          <Box style={{ flex: 0.5 }}>
            <ScheduleReading />
          </Box>
        </Box>

        <Box style={{ width: "100%" }}>
          <Box style={styles.topPicksHeading}>
            <Text style={styles.topPicksHeader}>Recommendations</Text>
            <Text style={styles.topPicksText}>Browse more</Text>
          </Box>
          <Box style={styles.bookList}>
            {topPicks.slice(0, 4).map((book, idx) => (
              <BookCard key={idx} book={book} bookmarked={bookmarked[idx]} onToggle={() => toggleBookmark(idx)} />
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Overviews;
