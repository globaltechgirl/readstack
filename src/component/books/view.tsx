import { type FC, type CSSProperties, useState, useEffect, useRef } from "react";
import { Box, Text, Image, Stack, Center } from "@mantine/core";
import { useParams } from "react-router-dom";

import Info from "../layout/info";
import EditIcon from "@/assets/icons/edit";
import SaveIcon from "@/assets/icons/save";
import BookmarkFill from "@/assets/icons/bookmarkFill";
import BookmarkFull from "@/assets/icons/bookmarkFull";
import useShelves from "@/hooks/use-shelves";
import { ApiBook, ShelvesResponse } from "@/types/shelves";

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

const BookActions: FC<{
  bookmarked: boolean;
  isEditing: boolean;
  genre?: string;
  onBookmark: () => void;
  onEditToggle: () => void;
}> = ({ bookmarked, isEditing, onBookmark, genre, onEditToggle }) => (
  <Box style={styles.actionWrapper}>
    <Box style={styles.actionRow}>
      <Box style={styles.continueBox}>
        <Text style={styles.continueText}>{genre || "Unknown Genre"}</Text>
      </Box>

      <Box style={styles.iconWrappers}>
        <Box style={styles.iconWrapper}>
          <Box style={styles.iconBox} onClick={onEditToggle}>
            {isEditing ? (
              <SaveIcon style={styles.iconInner} />
            ) : (
              <EditIcon style={styles.iconInner} />
            )}
          </Box>
        </Box>

        <Box style={styles.iconWrapper}>
          <Box style={styles.iconBox} onClick={onBookmark}>
            {bookmarked ? (
              <BookmarkFull style={styles.iconInner} />
            ) : (
              <BookmarkFill style={styles.iconInner} />
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

interface BookDisplay {
  isbn: string;
  id?: string | number | null;
  title: string;
  author: string;
  image: string;
  genre: string;
  publication: string;
  language: string;
  format: string;
  summary: string;
  link?: string;
  rating?: number;
  progress?: number;
}

const View: FC = () => {
  const { fetchAllShelves } = useShelves();
  const { isbn } = useParams<{ isbn: string }>();
  const [, setAllBooks] = useState<BookDisplay[]>([]);
  const [selectedBook, setSelectedBook] = useState<BookDisplay | null>(null);
  const [initialLoadDone, setInitialLoadDone] = useState(false);

  const [bookmarked, setBookmarked] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const fields = ["title", "author", ] as const;
  const details = [
    { label: "Publication", key: "publication" },
    { label: "Language", key: "language" },
    { label: "Format", key: "format" },
    { label: "ISBN", key: "isbn" },
  ];

  const refs: Record<string, React.RefObject<HTMLDivElement | null>> = Object.fromEntries(
    [...fields, "summary", ...details.map(d => d.key)].map(key => [key, useRef<HTMLDivElement>(null)])
  );

  const handleChange = (key: keyof BookDisplay, value: string) => {
    if (!selectedBook) return;
    setSelectedBook({ ...selectedBook, [key]: value });
  };

  useEffect(() => {
    const loadBooks = async () => {
      if (initialLoadDone) return;

      try {
        const shelvesResponse: ShelvesResponse | null = await fetchAllShelves();
        const combinedBooks = [
          ...(shelvesResponse?.currentlyReading ?? []),
          ...(shelvesResponse?.wantToRead ?? []),
          ...(shelvesResponse?.read ?? []),
        ];

        const formatted: BookDisplay[] = combinedBooks.map((item: ApiBook) => ({
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
          genre:
            String(
              item.book?.genre ??
                item.book?.categories?.[0] ??
                item.userBook?.categories?.[0] ??
                "Unknown"
            ) ?? "Unknown",
          publication: item.book?.publicationDate ?? item.userBook?.publicationDate ?? "",
          language: item.book?.language ?? item.userBook?.language ?? "",
          format: item.book?.format ?? item.userBook?.format ?? "",
          summary: item.book?.description ?? item.userBook?.description ?? "",
          rating: item.userBook?.averageRating ?? 0,
          progress: item.userBook?.progress ?? 0,
        }));

        setAllBooks(formatted);
        const bookFromUrl = formatted.find(b => b.isbn === isbn);
        setSelectedBook(bookFromUrl ?? formatted[0] ?? null);
        setInitialLoadDone(true);
      } catch (err) {
        console.error("Failed to load shelves:", err);
        setAllBooks([]);
        setSelectedBook(null);
        setInitialLoadDone(true);
      }
    };

    loadBooks();
  }, [fetchAllShelves, initialLoadDone]);

  return (
    <Stack gap="10" style={styles.viewBody}>
      <Info query={""} setQuery={() => {}} />

      <Box style={styles.viewMain}>
        <Box style={styles.viewWrapper}>
          <Box style={styles.viewSection}>
            {!initialLoadDone ? (
              <Center style={{ width: "100%", padding: 50 }}>
                <Text style={styles.centerText}>Loading book details...</Text>
              </Center>
            ) : !selectedBook ? (
              <Center style={{ width: "100%", padding: 50 }}>
                <Text style={styles.centerText}>No book details available.</Text>
              </Center>
            ) : (
              <>
                <Box style={styles.topSection}>
                  <Image src={selectedBook.image} alt={selectedBook.title} style={styles.bookImage} />
                  <Box style={styles.bookInfo}>
                    {fields.map(field => (
                      <Box
                        key={field}
                        ref={refs[field]}
                        contentEditable={isEditing}
                        suppressContentEditableWarning
                        onInput={e => handleChange(field, e.currentTarget.textContent || "")}
                        style={styles[`book${field.charAt(0).toUpperCase() + field.slice(1)}`]}
                      >
                        {selectedBook[field]}
                      </Box>
                    ))}
                  </Box>
                </Box>

                <Box style={styles.bottomSection}>
                  <Box style={styles.bottomWrapper}>
                    <BookActions
                      bookmarked={bookmarked}
                      isEditing={isEditing}
                      genre={selectedBook.genre}
                      onBookmark={() => setBookmarked(!bookmarked)}
                      onEditToggle={() => setIsEditing(!isEditing)}
                    />

                    <Box style={styles.bottomContent}>
                      <Box style={{ ...styles.descriptionBox, ...styles.detailsBox }}>
                        <Text style={styles.detailLabel}>Description</Text>
                        <Box
                          ref={refs.summary}
                          contentEditable={isEditing}
                          suppressContentEditableWarning
                          onInput={e => handleChange("summary", e.currentTarget.textContent || "")}
                          style={styles.detailValue}
                        >
                          {selectedBook.summary}
                        </Box>
                      </Box>

                      <Box style={styles.detailsWrapper}>
                        {details.map(detail => (
                          <Box key={detail.key} style={styles.detailsBox}>
                            <Text style={styles.detailLabel}>{detail.label}</Text>
                            <Box
                              ref={refs[detail.key]}
                              contentEditable={isEditing}
                              suppressContentEditableWarning
                              onInput={e => handleChange(detail.key as keyof BookDisplay, e.currentTarget.textContent || "")}
                              style={styles.detailValue}
                            >
                              {selectedBook[detail.key as keyof BookDisplay]}
                            </Box>
                          </Box>
                        ))}
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </>
            )}
          
          </Box>
        </Box>
      </Box>
    </Stack>
  );
};

export default View;