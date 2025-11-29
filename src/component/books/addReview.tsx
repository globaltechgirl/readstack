import { type FC, type CSSProperties, useState } from "react";
import { Modal, Text, Box, Stack, NumberInput } from "@mantine/core";
import useReviews from "@/hooks/use-reviews"; 
import Toast from "@/component/layout/toast"; 

interface AddReviewProps {
  opened: boolean;
  onClose: () => void;
  bookId: string;
  onReviewAdded?: (review: { reviewText: string; rating: number }) => void;
}

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

const AddReview: FC<AddReviewProps> = ({ opened, onClose, bookId, onReviewAdded }) => {
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState<number>(5);
  const STATUS = "READ"; 
  const { createReview, loading } = useReviews();

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastStatus, setToastStatus] = useState<"success" | "error">("success");

  const handleSave = async () => {
    if (!reviewText.trim()) {
      setToastMessage("Please write a review.");
      setToastStatus("error");
      setTimeout(() => setToastMessage(null), 3000);
      return;
    }

    try {
      await createReview({ bookId, reviewText, rating, newShelf: STATUS });

      setToastMessage("Review added successfully");
      setToastStatus("success");
      if (onReviewAdded) onReviewAdded({ reviewText, rating });

      setReviewText("");
      setRating(5);

      setTimeout(() => {
        setToastMessage(null);
        onClose();
      }, 1500);
      
    } catch (err) {
      setToastMessage("Failed to add review.");
      setToastStatus("error");
      setTimeout(() => setToastMessage(null), 3000);
    }
  };

  return (
    <>
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
              style={{ ...styles.actionButton, opacity: loading ? 0.6 : 1, pointerEvents: loading ? "none" : "auto" }}
              onClick={handleSave}
            >
              {loading ? "Saving" : "Save"}
            </button>
          </Box>
        </Stack>
      </Modal>

      {toastMessage && <Toast message={toastMessage} status={toastStatus} />}
    </>
  );
};

export default AddReview;
