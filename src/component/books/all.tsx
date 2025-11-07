import { type FC, type CSSProperties, useState } from "react";
import { Box, Text, Image, Button, Flex, Stack } from "@mantine/core";

import ArrowLeft from "@/assets/icons/arrowLeft";
import ArrowRight from "@/assets/icons/arrowRight";
import HeartFill from "@/assets/icons/heartFill";
import HeartFull from "@/assets/icons/heartFull";

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
import Book11 from "@/assets/book11.jpg";
import Book12 from "@/assets/book12.jpg";
import Info from "../layout/info";

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
  },
  allWrapper: {
    backgroundColor: "var(--light-200)",
    borderRadius: 6,
    display: "flex",
    flexDirection: "column",
    gap: 45,
    padding: 20,
    width: "100%",
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
    height: 180,
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
  },
  overlayVisible: {
    opacity: 1,
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
    letterSpacing: 0.2,
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

const allBooks = [
  { title: "Not In Love", author: "Ali Hazelwood", image: Book1, genre: "Romance", tag: "recent" },
  { title: "Funny Story", author: "Emily Henry", image: Book2, genre: "Romance", tag: "wishlist" },
  { title: "Fourth Wing", author: "Rebecca Yarrow", image: Book3, genre: "Fantasy", tag: "completed" },
  { title: "Harry Potter", author: "J.K. Rowling", image: Book4, genre: "Adventure", tag: "recent" },
  { title: "The Silent Patient", author: "Alex Michaelides", image: Book5, genre: "Thriller", tag: "wishlist" },
  { title: "Verity", author: "Collen Hoover", image: Book6, genre: "Romance", tag: "completed" },
  { title: "Atomic Habits", author: "James Clear", image: Book7, genre: "Self Help", tag: "recent" },
  { title: "The Let Them Theory", author: "Mel Robbins", image: Book8, genre: "Motivation", tag: "wishlist" },
  { title: "Just For The Summer", author: "Abbey Jimenez", image: Book9, genre: "Romance", tag: "completed" },
  { title: "Hunger Games", author: "Suzanne Collins", image: Book10, genre: "Dystopian", tag: "recent" },
  { title: "The Housemaid", author: "Freida McFadden", image: Book11, genre: "Thriller", tag: "wishlist" },
  { title: "One Golden Summer", author: "Carley Fortune", image: Book12, genre: "Romance", tag: "completed" },
  { title: "Just For The Summer", author: "Abbey Jimenez", image: Book9, genre: "Romance", tag: "wishlist" },
  { title: "Hunger Games", author: "Suzanne Collins", image: Book10, genre: "Dystopian", tag: "completed" },
  { title: "The Housemaid", author: "Freida McFadden", image: Book11, genre: "Thriller", tag: "recent" },
  { title: "One Golden Summer", author: "Carley Fortune", image: Book12, genre: "Romance", tag: "wishlist" },
  { title: "The Silent Patient", author: "Alex Michaelides", image: Book5, genre: "Thriller", tag: "completed" },
  { title: "Verity", author: "Collen Hoover", image: Book6, genre: "Romance", tag: "recent" },
  { title: "Atomic Habits", author: "James Clear", image: Book7, genre: "Self Help", tag: "wishlist" },
  { title: "The Let Them Theory", author: "Mel Robbins", image: Book8, genre: "Motivation", tag: "completed" },
  { title: "Not In Love", author: "Ali Hazelwood", image: Book1, genre: "Romance", tag: "recent" },
  { title: "Funny Story", author: "Emily Henry", image: Book2, genre: "Romance", tag: "wishlist" },
  { title: "Fourth Wing", author: "Rebecca Yarrow", image: Book3, genre: "Fantasy", tag: "completed" },
  { title: "Harry Potter", author: "J.K. Rowling", image: Book4, genre: "Adventure", tag: "recent" },
];

const All: FC = () => {
  const [page, setPage] = useState(1);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [hovered, setHovered] = useState<number | null>(null);

  const booksPerPage = 12;
  const totalPages = Math.ceil(allBooks.length / booksPerPage);
  const currentBooks = allBooks.slice((page - 1) * booksPerPage, page * booksPerPage);

  const toggleFavorite = (idx: number) =>
    setFavorites((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );

  const handlePrev = () => setPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <Stack gap="10" style={styles.allBody}>
      <Info />

      <Box style={styles.allMain}>
        <Box style={styles.allWrapper}>
          <Box style={styles.booksGrid}>
            {currentBooks.map((book, idx) => (
              <Box
                key={idx}
                style={styles.bookCard}
                onMouseEnter={() => setHovered(idx)}
                onMouseLeave={() => setHovered(null)}
              >
                <Box style={styles.bookWrapper}>
                  <Box style={styles.bookMain}>
                    <Image src={book.image} alt={book.title} style={styles.bookImage} />
                  </Box>

                  <Box style={styles.genreRibbon}>{book.tag}</Box>

                  <Box
                    style={{
                      ...styles.overlay,
                      ...(hovered === idx ? styles.overlayVisible : {}),
                    }}
                  >
                    <Box onClick={() => toggleFavorite(idx)}>
                      {favorites.includes(idx) ? (
                        <HeartFull style={styles.overlayIcon} />
                      ) : (
                        <HeartFill style={styles.overlayIcon} />
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

export default All;
