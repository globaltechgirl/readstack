import { type FC, type CSSProperties, useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { Box, Text, Image, Stack, Loader, Flex } from "@mantine/core";
import Info from "../layout/info";
import BookmarkFill from "@/assets/icons/bookmarkFill";
import BookmarkFull from "@/assets/icons/bookmarkFull";
import HeartFill from "@/assets/icons/heartFill";
import HeartFull from "@/assets/icons/heartFull";
import useShelves from "@/hooks/use-shelves";

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
    height: "auto",
    objectFit: "cover",
    border: "0.5px solid var(--border-200)",
    backgroundColor: "var(--light-100)",
    borderRadius: 8,
    padding: 2,
    transform: "rotateY(-2deg)",
    cursor: "pointer",
    zIndex: 2,
    marginBottom: -80,
    marginLeft: 10,
  },
  bookInfo: {
    display: "flex",
    flexDirection: "column",
    gap: 15,
    paddingTop: 20,
    alignItems: "flex-start",
  },
  bookTitle: {
    fontSize: 40,
    fontWeight: 600,
    color: "var(--dark-100)",
    width: 250,
  },
  bookAuthor: {
    fontSize: 14,
    fontWeight: 550,
    color: "var(--dark-100)",
  },
  bookGenre: {
    fontSize: 11,
    fontWeight: 500,
    color: "var(--dark-200)",
    fontStyle: "italic",
    marginBottom: 20
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
    minHeight: 200,
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
    gap: 20,
  },
  detailsBox: {
    display: "flex",
    flexDirection: "column",
    gap: 15,
    textAlign: "justify",
  },
  detailLabel: {
    fontSize: 12,
    fontWeight: 600,
    color: "var(--dark-100)",
  },
  detailValue: {
    fontSize: 10,
    fontWeight: 550,
    color: "var(--dark-200)",
    lineHeight: 1.6,
  },
};

const BookActions: FC<{
  bookmarked: boolean;
  liked: boolean;
  onBookmark: () => void;
  onLike: () => void; }> = ({ bookmarked, liked, onBookmark, onLike }) => (
  <Box style={styles.actionWrapper}>
    <Box style={styles.actionRow}>
      <Box style={styles.continueBox}>
        <Text style={styles.continueText}>View Goodreads</Text>
      </Box>

      <Box style={styles.iconWrappers}>
        <Box style={styles.iconWrapper}>
          <Box style={styles.iconBox} onClick={onBookmark}>
            {bookmarked ? (
              <BookmarkFull style={styles.iconInner} />
            ) : (
              <BookmarkFill style={styles.iconInner} />
            )}
          </Box>
        </Box>

        <Box style={styles.iconWrapper}>
          <Box style={styles.iconBox} onClick={onLike}>
            {liked ? (
              <HeartFull style={styles.iconInner} />
            ) : (
              <HeartFill style={styles.iconInner} />
            )}
          </Box>
        </Box>
      </Box>
    </Box>

    <Box style={styles.actionHr}>
      <hr style={styles.hrLine} />
    </Box>
  </Box>
);

const View: FC = () => {
  const { id } = useParams<{ id: string }>();
  const { startGetBook, loading } = useShelves();
  const [book, setBook] = useState<any | null>(null);
  const [bookmarked, setBookmarked] = useState(false);
  const [liked, setLiked] = useState(false);

  const fetchBook = useCallback(async () => {
    if (!id) return;
    try {
      const data = await startGetBook(id);
      setBook(data ?? null);
    } catch (err) {
      console.error("Failed to fetch book:", err);
      setBook(null);
    }
  }, [id, startGetBook]);

  useEffect(() => {
    fetchBook();
  }, [fetchBook]);

  if (loading || !book)
    return <Loader style={{ margin: "50px auto", display: "block" }} />;

  return (
    <Stack gap="10" style={styles.viewBody}>
      <Info />
      <Box style={styles.viewMain}>
        <Box style={styles.viewWrapper}>
          <Box style={styles.viewSection}>
            <Flex style={styles.topSection}>
              <Image
                src={book.coverImageUrl ?? "/placeholder-book.jpg"}
                alt={book.title}
                style={styles.bookImage}
              />
              <Box style={styles.bookInfo}>
                <Text style={styles.bookTitle}>{book.title}</Text>
                <Text style={styles.bookAuthor}>{book.author ?? "Unknown Author"}</Text>
                <Text style={styles.bookGenre}>{book.categories?.[0] ?? "Unknown"}</Text>
              </Box>
            </Flex>

            <Box style={styles.bottomSection}>
              <Box style={styles.bottomWrapper}>
                <BookActions
                  bookmarked={bookmarked}
                  liked={liked}
                  onBookmark={() => setBookmarked(prev => !prev)}
                  onLike={() => setLiked(prev => !prev)}
                />
                <Flex style={styles.bottomContent}>
                  <Box style={{ ...styles.descriptionBox, ...styles.detailsBox }}>
                    <Text style={styles.detailLabel}>Description</Text>
                    <Text style={styles.detailValue}>{book.summary ?? "No description available."}</Text>
                  </Box>
                  <Box style={styles.detailsWrapper}>
                    {[
                      { label: "Publication", value: book.publisher ?? "Unknown" },
                      { label: "Language", value: book.language ?? "Unknown" },
                      { label: "Format", value: `${book.pageCount ?? "?"} pages` },
                      { label: "ISBN", value: book.isbn ?? "Unknown" },
                    ].map((item, idx) => (
                      <Box key={idx} style={styles.detailsBox}>
                        <Text style={styles.detailLabel}>{item.label}</Text>
                        <Text style={styles.detailValue}>{item.value}</Text>
                      </Box>
                    ))}
                  </Box>
                </Flex>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Stack>
  );
};

export default View;
