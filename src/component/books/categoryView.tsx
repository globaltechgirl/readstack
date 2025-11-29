import { type FC, type CSSProperties, useState, useEffect, useRef } from "react";
import { Box, Text, Image, Stack, Center } from "@mantine/core";
import { useParams } from "react-router-dom";

import Info from "../layout/info";
import useShelves from "@/hooks/use-shelves";
import { ApiBook, ShelvesResponse } from "@/types/shelves";
import Toast from "../layout/toast";
import AddReview from "./addReview";

import EditIcon from "@/assets/icons/edit";
import SaveIcon from "@/assets/icons/save";
import BookmarkFill from "@/assets/icons/bookmarkFill";
import BookmarkFull from "@/assets/icons/bookmarkFull";
import StarIcon from "@/assets/icons/star";
import HalfStarIcon from "@/assets/icons/halfStar";
import FullStarIcon from "@/assets/icons/fullStar";
import EditReview from "./editReview";

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
    flexDirection: "column",
    gap: 25,
    marginTop: 30,
  },
  bottomTop: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    gap: 50,
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
  bottoBottom: {
    flex: 1,
    display: "flex",
    flexDirection: "column"
  },
  detailStarred: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  starBox: {
    display: "flex",
    alignItems: "center",
    gap: 1,
  },
  centerText: {
    fontSize: 10,
    fontWeight: 550,
    color: "var(--dark-200)",
  },
};

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

interface BookActionsProps {
  bookmarked: boolean;
  isEditing: boolean;
  genre?: string;
  onBookmark: () => void;
  onEditToggle: () => void;
  bookmarkOpen: number | null;
  setBookmarkOpen: (idx: number | null) => void;
  bookIdx: number;
  shelfOptions: { label: string; shelf: string }[];
  handleMoveShelf: (isbn: string, shelf: string) => void;
  bookIsbn: string;
}

const BookActions: FC<BookActionsProps> = ({
  bookmarked,
  isEditing,
  genre,
  onBookmark,
  onEditToggle,
  bookmarkOpen,
  setBookmarkOpen,
  bookIdx,
  shelfOptions,
  handleMoveShelf,
  bookIsbn,
}) => (
  <Box style={styles.actionWrapper}>
    <Box style={styles.actionRow}>
      <Box style={styles.continueBox}>
        <Text style={styles.continueText}>{genre || "Unknown Genre"}</Text>
      </Box>

      <Box style={styles.iconWrappers}>
        <Box style={styles.iconWrapper}>
          <Box style={styles.iconBox} onClick={onEditToggle}>
            {isEditing ? <SaveIcon style={styles.iconInner} /> : <EditIcon style={styles.iconInner} />}
          </Box>
        </Box>

        <Box style={styles.iconWrapper}>
          <Box style={styles.iconBox} onClick={onBookmark}>
            <Box
              onClick={(e) => {
                e.stopPropagation();
                setBookmarkOpen(bookmarkOpen === bookIdx ? null : bookIdx);
              }}
            >
              {bookmarked ? (
                <BookmarkFull style={styles.iconInner} />
              ) : (
                <BookmarkFill style={styles.iconInner} />
              )}

              {bookmarkOpen === bookIdx && (
                <Box style={styles.bookmarkMain}>
                  <Box className="bookmark-dropdown" style={styles.bookmarkDropdown}>
                    {shelfOptions.map((opt) => (
                      <Box
                        key={opt.label}
                        style={styles.bookmarkOption}
                        className="hover-light"
                        onClick={() => handleMoveShelf(bookIsbn, opt.shelf)}
                      >
                        {opt.label}
                      </Box>
                    ))}
                  </Box>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>

    <Box style={styles.actionHr}>
      <hr style={styles.hrLine} />
    </Box>
  </Box>
);

const CategoryView: FC = () => {
  const { fetchAllShelves, moveShelf } = useShelves();
  const { isbn } = useParams<{ isbn: string }>();
  const [, setAllBooks] = useState<BookDisplay[]>([]);
  const [selectedBook, setSelectedBook] = useState<BookDisplay | null>(null);
  const [initialLoadDone, setInitialLoadDone] = useState(false);

  const [bookmarkOpen, setBookmarkOpen] = useState<number | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastStatus, setToastStatus] = useState<"success" | "error">("success");
  const [bookmarked, setBookmarked] = useState(false);

  const [ isEditing ] = useState(false);
  const [showAddReview, setShowAddReview] = useState(false);
  const [reviews, setReviews] = useState<{ reviewText: string; rating: number }[]>([]);
  const [reviewBeingEdited, setReviewBeingEdited] = useState<{ reviewText: string; rating: number } | null>(null);

  const fields = ["title", "author"] as const;
  const details = [
    { label: "Publication", key: "publication" },
    { label: "Language", key: "language" },
    { label: "Format", key: "format" },
    { label: "ISBN", key: "isbn" },
  ];

  const refs: Record<string, React.RefObject<HTMLDivElement | null>> = Object.fromEntries(
    [...fields, "summary", ...details.map((d) => d.key)].map((key) => [key, useRef<HTMLDivElement>(null)])
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
        const bookFromUrl = formatted.find((b) => b.isbn === isbn);
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
  }, [fetchAllShelves, initialLoadDone, isbn]);

  useEffect(() => {
    if (!selectedBook) return;
    try {
      const stored = localStorage.getItem(`reviews-${selectedBook.isbn}`);
      if (stored) setReviews(JSON.parse(stored));
      else setReviews([]);
    } catch (err) {
      console.error("Failed to load reviews from localStorage", err);
      setReviews([]);
    }
  }, [selectedBook]);

  const handleReviewAdded = (review: { reviewText: string; rating: number }) => {
    setReviews((prev) => {
      const newReviews = [...prev, review];
      if (selectedBook?.isbn) {
        try {
          localStorage.setItem(`reviews-${selectedBook.isbn}`, JSON.stringify(newReviews));
        } catch (err) {
          console.error("Failed to save reviews to localStorage", err);
        }
      }
      return newReviews;
    });
    setShowAddReview(false);
  };

  const handleEditReview = (updatedReview: { reviewText: string; rating: number }) => {
    setReviews([updatedReview]);
    if (selectedBook?.isbn) {
      localStorage.setItem(`reviews-${selectedBook.isbn}`, JSON.stringify([updatedReview]));
    }
    setShowAddReview(false);
  };

  const openEditReview = () => {
    if (reviews.length > 0) setReviewBeingEdited(reviews[0]);
    setShowAddReview(true);
  };

  const handleReviewDeleted = () => {
    setReviews([]);
    if (selectedBook?.isbn) {
      localStorage.removeItem(`reviews-${selectedBook.isbn}`);
    }
  };


  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 1500); 
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const renderStars = (rating: number) =>
    Array.from({ length: 5 }, (_, i) => {
      if (rating >= i + 1)
        return <FullStarIcon key={i} width={11} height={11} color="var(--dark-200)" />;
      if (rating >= i + 0.5)
        return <HalfStarIcon key={i} width={11} height={11} color="var(--dark-200)" />;
      return <StarIcon key={i} width={11} height={11} color="var(--dark-200)" />;
    });
  
  const handleMoveShelf = async (isbn: string, shelf: string) => {
    if (!moveShelf) return;

    try {
      const res = await moveShelf(isbn, shelf);

      if (res?.message) {
        setToastMessage(res.message);
        setToastStatus("success");

        setBookmarked(true);

        if (res.newShelf && res.newShelf !== "WANT_TO_READ") {
          setAllBooks((prev) => prev.filter((b) => b.isbn !== isbn));
        }
      } else {
        setToastMessage("Failed to move book");
        setToastStatus("error");
      }
    } catch (err) {
      console.error(err);
      setToastMessage("Error moving book");
      setToastStatus("error");
    } finally {
      setBookmarkOpen(null);
      setTimeout(() => setToastMessage(null), 3000);
    }
  };

  const shelfOptions = [
    { label: "Wishlist", shelf: "WANT_TO_READ" },
    { label: "Recent", shelf: "CURRENTLY_READING" },
    { label: "Completed", shelf: "READ" },
  ];

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
                    {fields.map((field) => (
                      <Box
                        key={field}
                        ref={refs[field]}
                        contentEditable={isEditing}
                        suppressContentEditableWarning
                        onInput={(e) => handleChange(field, e.currentTarget.textContent || "")}
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
                      onEditToggle={openEditReview}
                      bookmarkOpen={bookmarkOpen}
                      setBookmarkOpen={setBookmarkOpen}
                      bookIdx={0} 
                      shelfOptions={shelfOptions}
                      handleMoveShelf={handleMoveShelf}
                      bookIsbn={selectedBook.isbn}
                    />

                    <Box style={styles.bottomContent}>
                      <Box style={styles.bottomTop}>
                        <Box style={{ ...styles.descriptionBox, ...styles.detailsBox }}>
                          <Text style={styles.detailLabel}>Description</Text>
                          <Box
                            ref={refs.summary}
                            contentEditable={isEditing}
                            suppressContentEditableWarning
                            onInput={(e) => handleChange("summary", e.currentTarget.textContent || "")}
                            style={styles.detailValue}
                          >
                            {selectedBook.summary}
                          </Box>
                        </Box>

                        <Box style={styles.detailsWrapper}>
                          {details.map((detail) => (
                            <Box key={detail.key} style={styles.detailsBox}>
                              <Text style={styles.detailLabel}>{detail.label}</Text>
                              <Box
                                ref={refs[detail.key]}
                                contentEditable={isEditing}
                                suppressContentEditableWarning
                                onInput={(e) =>
                                  handleChange(detail.key as keyof BookDisplay, e.currentTarget.textContent || "")
                                }
                                style={styles.detailValue}
                              >
                                {selectedBook[detail.key as keyof BookDisplay]}
                              </Box>
                            </Box>
                          ))}
                        </Box>
                      </Box>

                      <Box style={styles.bottomBottom}>
                        {reviews.map((review, idx) => (
                          <Box key={idx} style={styles.detailsBox}>
                            <Text style={styles.detailLabel}>Review</Text>
                            <Box style={styles.detailStarred}>
                              <Text style={styles.detailValue}>{review.reviewText}</Text>
                              <Box style={styles.starBox}>{renderStars(review.rating)}</Box>
                            </Box>
                          </Box>
                        ))}
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </>
            )}

            {selectedBook && selectedBook.isbn && showAddReview && (
              reviewBeingEdited ? (
                <EditReview
                  opened={showAddReview}
                  onClose={() => { setShowAddReview(false); setReviewBeingEdited(null); }}
                  bookId={selectedBook.isbn}
                  reviewData={reviewBeingEdited}
                  onReviewAdded={(r) => {
                    handleEditReview(r);
                    setShowAddReview(false);
                    setReviewBeingEdited(null);
                  }}
                  onReviewDeleted={handleReviewDeleted} 
                  setToastMessage={setToastMessage}
                  setToastStatus={setToastStatus}
                />
              ) : (
                <AddReview
                  opened={showAddReview}
                  onClose={() => setShowAddReview(false)}
                  bookId={selectedBook.isbn}
                  onReviewAdded={(r) => {
                    handleReviewAdded(r);
                    setShowAddReview(false);
                  }}
                />
              )
            )}

            {toastMessage && <Toast message={toastMessage} status={toastStatus} />}
          </Box>
        </Box>
      </Box>
    </Stack>
  );
};

export default CategoryView;