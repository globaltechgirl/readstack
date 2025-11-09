import { type FC, type CSSProperties, useState } from "react";
import { Box, Text, Image, Stack } from "@mantine/core";
import Info from "../layout/info";
import Book3 from "@/assets/book3.jpg";
import BookmarkFill from "@/assets/icons/bookmarkFill";
import BookmarkFull from "@/assets/icons/bookmarkFull";
import HeartFill from "@/assets/icons/heartFill";
import HeartFull from "@/assets/icons/heartFull";

const styles: Record<string, CSSProperties> = {
  additionBody: {
    width: "100%",
    height: "100vh",
    padding: 2,
    paddingLeft: 0,
    backgroundColor: "var(--white)",
  },
  additionMain: {
    backgroundColor: "var(--light-100)",
    border: "0.5px solid var(--border-200)",
    borderRadius: 8,
    padding: 3,
  },
  additionWrapper: {
    backgroundColor: "var(--light-200)",
    borderRadius: 6,
    display: "flex",
    flexDirection: "column",
    padding: "40px 20px 20px 20px",
    width: "100%",
  },
  additionSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
  },
  topSection: {
    display: "flex",
    gap: 50,
    alignItems: "flex-start",
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
    paddingTop: 30,
    alignItems: "flex-start",
  },
  bookTitle: {
    fontSize: 40,
    fontWeight: 600,
    color: "var(--dark-100)",
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

const mainBook = {
  title: "Fourth Wing",
  author: "Rebecca Yarrow",
  image: Book3,
  genre: "Fantasy",
  publication: "Orbit",
  language: "English",
  format: "517 pages, Hardcover",
  isbn: "9781649374042",
  summary:
    "Enter the brutal and elite world of a war college for dragon riders... Twenty-year-old Violet Sorrengail was supposed to enter the Scribe Quadrant, living a quiet life among books and history. Now, the commanding general—also known as her tough-as-talons mother—has ordered Violet to join the hundreds of candidates striving to become the elite of Navarre: dragon riders. But when you’re smaller than everyone else and your body is brittle, death is only a heartbeat away...because dragons don’t bond to “fragile” humans. They incinerate them. With fewer dragons willing to bond than cadets, most would kill Violet to better their own chances of success. The rest would kill her just for being her mother’s daughter—like Xaden Riorson, the most powerful and ruthless wingleader in the Riders Quadrant. She’ll need every edge her wits can give her just to see the next sunrise. Yet, with every day that passes, the war outside grows more deadly, the kingdom's protective wards are failing, and the death toll continues to rise. Even worse, Violet begins to suspect leadership is hiding a terrible secret. Friends, enemies, lovers. Everyone at Basgiath War College has an agenda—because once you enter, there are only two ways out: graduate or die.",
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

// -------------------- Main Component --------------------
const Addition: FC = () => {
  const [bookmarked, setBookmarked] = useState(false);
  const [liked, setLiked] = useState(false);

  return (
    <Stack gap="10" style={styles.additionBody}>
      <Info />

      <Box style={styles.additionMain}>
        <Box style={styles.additionWrapper}>
          <Box style={styles.additionSection}>
            {/* Top Section */}
            <Box style={styles.topSection}>
              <Image
                src={mainBook.image}
                alt={mainBook.title}
                style={styles.bookImage}
              />
              <Box style={styles.bookInfo}>
                <Text style={styles.bookTitle}>{mainBook.title}</Text>
                <Text style={styles.bookAuthor}>{mainBook.author}</Text>
                <Text style={styles.bookGenre}>{mainBook.genre}</Text>
              </Box>
            </Box>

            {/* Bottom Section */}
            <Box style={styles.bottomSection}>
              <Box style={styles.bottomWrapper}>
                <BookActions
                  bookmarked={bookmarked}
                  liked={liked}
                  onBookmark={() => setBookmarked(!bookmarked)}
                  onLike={() => setLiked(!liked)}
                />

                <Box style={styles.bottomContent}>
                  <Box style={{ ...styles.descriptionBox, ...styles.detailsBox }}>
                    <Text style={styles.detailLabel}>Description</Text>
                    <Text style={styles.detailValue}>{mainBook.summary}</Text>
                  </Box>

                  <Box style={styles.detailsWrapper}>
                    {[
                      { label: "Publication", value: mainBook.publication },
                      { label: "Language", value: mainBook.language },
                      { label: "Format", value: mainBook.format },
                      { label: "ISBN", value: mainBook.isbn },
                    ].map((item, index) => (
                      <Box key={index} style={styles.detailsBox}>
                        <Text style={styles.detailLabel}>{item.label}</Text>
                        <Text style={styles.detailValue}>{item.value}</Text>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Stack>
  );
};

export default Addition;
