import { type FC, type CSSProperties, useState, useEffect, useCallback } from "react";
import { Modal, Text, Box, Stack, NumberInput } from "@mantine/core";
import useReviews from "@/hooks/use-reviews"; 

const styles: Record<string, CSSProperties> = {
  actionButton: {
    backgroundColor: "var(--light-100)",
    border: "0.5px solid var(--border-200)",
    borderRadius: 6,
    color: "var(--light-300)",
    cursor: "pointer",
    fontSize: 8.5,
    fontWeight: 400,
    padding: "4px 10px",
    textAlign: "center",
  },
  actionRow: {
    display: "flex",
    gap: 10,
    justifyContent: "flex-end",
  },
  toggleRow: {
    alignItems: "center",
    display: "flex",
    flexWrap: "wrap",
    gap: 12,
  },
  toggleBox: {
    backgroundColor: "var(--light-100)",
    border: "0.5px solid var(--border-200)",
    borderRadius: 6,
    color: "var(--light-300)",
    fontSize: 8,
    fontWeight: 400,
    padding: "3px 6px",
    textAlign: "center",
  },
  innerBox: {
    backgroundColor: "var(--light-200)",
    border: "0.5px solid var(--border-200)",
    borderRadius: 8,
    color: "var(--light-300)",
    fontSize: 8.5,
    fontWeight: 400,
    padding: 6,
  },
  input: {
    width: "100%",
    backgroundColor: "var(--light-200)",
    border: "0.5px solid var(--border-200)",
    borderRadius: 6,
    color: "var(--light-300)",
    padding: "4px 8px",
    fontSize: 9,
  },
  textarea: {
    minHeight: 60,
    resize: "vertical",
    width: "100%",
  },
  wrapper: {
    backgroundColor: "transparent",
    display: "flex",
    flexDirection: "column",
    gap: 4,
    width: "100%",
  },
  wrapperBox: {
    backgroundColor: "var(--light-100)",
    border: "0.5px solid var(--border-200)",
    borderRadius: 8,
    display: "flex",
    flexDirection: "column",
    gap: 4,
    padding: 4,
  },
  wrapperHeader: {
    color: "var(--light-300)",
    fontSize: 8.5,
    fontWeight: 450,
    padding: "2px 4px",
  },
  wrapperMain: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
};

interface EditReviewProps {
  opened: boolean;
  onClose: () => void;
  bookId: string;
  reviewData: { reviewText: string; rating: number } | null;
  onReviewAdded?: (review: { reviewText: string; rating: number }) => void;
  onReviewDeleted?: () => void; 
  setToastMessage: (msg: string | null) => void;
  setToastStatus: (status: "success" | "error") => void;
}

const EditReview: FC<EditReviewProps> = ({
  opened,
  onClose,
  bookId,
  reviewData,
  onReviewAdded,
  onReviewDeleted,
  setToastMessage,
  setToastStatus,
}) => {
  const [reviewText, setReviewText] = useState(reviewData?.reviewText || "");
  const [rating, setRating] = useState<number>(reviewData?.rating || 5);
  const STATUS = "Read"; 
  const { createReview, removeReview } = useReviews();

  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reviewData) {
      setReviewText(reviewData.reviewText);
      setRating(reviewData.rating);
    }
  }, [reviewData]);

  const handleSave = async () => {
    if (!reviewText.trim()) {
      setToastMessage("Please write a review.");
      setToastStatus("error");
      return;
    }

    try {
      setSaving(true);
      await createReview({ bookId, reviewText, rating, newShelf: STATUS });

      setToastMessage("Review updated successfully");
      setToastStatus("success");

      if (onReviewAdded) onReviewAdded({ reviewText, rating });

      onClose(); 
    } catch {
      setToastMessage("Failed to update review.");
      setToastStatus("error");
    } finally {
      setSaving(false);
      setTimeout(() => setToastMessage(null), 3000);
    }
  };

  const handleDelete = useCallback(async () => {
    if (!removeReview) return;

    try {
      setDeleting(true);
      await removeReview(bookId);

      setToastMessage("Review deleted successfully");
      setToastStatus("success");

      if (onReviewDeleted) onReviewDeleted(); 
      onClose();
    } catch {
      setToastMessage("Failed to delete review");
      setToastStatus("error");
    } finally {
      setDeleting(false);
      setTimeout(() => setToastMessage(null), 3000);
    }
  }, [bookId, removeReview, onClose, onReviewAdded, setToastMessage, setToastStatus]);

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      centered
      size="md"
      withCloseButton={false}
      styles={{ content: styles.wrapper, body: { padding: 0 } }}
      overlayProps={{ backgroundOpacity: 0.55, blur: 5 }}
    >
      <Stack style={styles.wrapperMain}>
        <Box style={styles.toggleRow}>
          <Box style={styles.toggleBox}>{STATUS}</Box>
        </Box>

        <Box style={styles.wrapperBox}>
          <Text style={styles.wrapperHeader}>Review</Text>
          <textarea
            placeholder="Write your review"
            style={{ ...styles.innerBox, ...styles.textarea }}
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          />
        </Box>

        <Box style={styles.wrapperBox}>
          <Text style={styles.wrapperHeader}>Rating</Text>
          <NumberInput
            min={1}
            max={5}
            value={rating}
            onChange={(val: string | number) => setRating(Number(val) || 1)}
            unstyled
            styles={{
              root: { position: "relative", width: "100%" },
              input: { ...styles.input, width: "100%", paddingRight: 28, height: 32, boxSizing: "border-box" },
              controls: { position: "absolute", right: 8, bottom: "-7px", top: "50%", transform: "translateY(-50%)", display: "flex", flexDirection: "column" },
              control: { color: "var(--light-300)", cursor: "pointer", width: 12, height: 12, padding: 0, fontSize: 10, marginBottom: "-1px", lineHeight: 1, display: "flex", alignItems: "center", justifyContent: "center" },
            }}
          />
        </Box>

        <Box style={styles.actionRow}>
          <button type="button" style={styles.actionButton} onClick={onClose}>
            Cancel
          </button>
          <button
            type="button"
            style={{ ...styles.actionButton, opacity: deleting ? 0.6 : 1, pointerEvents: deleting ? "none" : "auto" }}
            onClick={handleDelete}
          >
            {deleting ? "Deleting" : "Delete"}
          </button>
          <button
            type="button"
            style={{ ...styles.actionButton, opacity: saving ? 0.6 : 1, pointerEvents: saving ? "none" : "auto" }}
            onClick={handleSave}
          >
            {saving ? "Saving" : "Save"}
          </button>
        </Box>
      </Stack>
    </Modal>
  );
};

export default EditReview;
