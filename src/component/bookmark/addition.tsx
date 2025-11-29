import { type FC, type CSSProperties, useRef, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Box, Text, Stack } from "@mantine/core";

import Info from "../layout/info";
import Book from "@/assets/logo.svg";

import SaveIcon from "@/assets/icons/save";
import BookmarkFill from "@/assets/icons/bookmarkFill";
import DownloadIcon from "@/assets/icons/download";

import Toast from "@/component/layout/toast"; 
import useShelves from "@/hooks/use-shelves";

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
    flex: 1,            
    display: "flex",
    flexDirection: "column",
  },
  additionWrapper: {
    backgroundColor: "var(--light-200)",
    borderRadius: 6,
    display: "flex",
    flexDirection: "column",
    gap: 45,
    padding: "40px 0 20px 0",
    width: "100%",
    height: "100%",   
  },

  additionSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch", 
    position: "relative",
    width: "90%", 
    margin: "0 auto"
  },
  topSection: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
  },
  actionWrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    marginLeft: "auto",
  },
  actionRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    marginBottom: 20,
  },
  actionMain: {
    width: "fit-content",
    padding: 2,
    backgroundColor: "var(--light-100)",
    border: "0.5px solid var(--border-200)",
    borderRadius: 6,
    cursor: "pointer",
  },
  actionBtn: {
    display: "flex",
    alignItems: "center",
    gap: 4,
    padding: "2px 6px",
    borderRadius: 5,
    backgroundColor: "var(--light-200)",
    color: "var(--dark-200)",
  },
  actionIcon: {
    width: 10,
    height: 10,
  },
  actionText: {
    fontSize: 9.5,
    fontWeight: 550,
  },
  shelfMain: {
    position: "absolute",
    top: 28,
    right: 0,
    width: "fit-content",
    padding: 2,
    backgroundColor: "var(--light-100)",
    border: "0.5px solid var(--border-200)",
    borderRadius: 6,
    zIndex: 10,
  },
  shelfDropdown: {
    padding: 2,
    borderRadius: 5,
    backgroundColor: "var(--light-200)",
    overflow: "hidden",
  },
  shelfOption: {
    padding: "4px 12px",
    cursor: "pointer",
    fontSize: 9,
    fontWeight: 550,
    color: "var(--dark-200)",
  },
  twoColRow: {
    display: "flex",
    alignItems: "flex-start",
    padding: "20px 0",
  },
  leftCol: {
    flex: 0.5,
  },
  rightCol: {
    flex: 1,
  },
  labelText: {
    fontSize: 11,
    fontWeight: 600,
    color: "var(--dark-100)",
  },
  labelSub: {
    fontSize: 9.5,
    fontWeight: 550,
    color: "var(--dark-200)",
    marginTop: 6,
  },
  rightBox: {
    width: "100%",
    padding: 2,
    backgroundColor: "var(--light-200)",
    border: "0.5px solid var(--border-200)",
    borderRadius: 6,
    cursor: "pointer",
    display: "flex",
    alignItems: "stretch",
  },
  inputBase: {
    width: "100%",
    height: "100%",
    padding: 6,
    borderRadius: 5,
    backgroundColor: "var(--light-100)",
    outline: "none",
    fontSize: 10,
    fontWeight: 550,
    color: "var(--dark-200)",
    lineHeight: 1.6,
    boxSizing: "border-box",
  },
  dottedHr: {
    border: "none",
    borderTop: "1px dashed var(--border-200)",
    margin: "12px 0",
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
  coverRow: {
    display: "flex",
    gap: 20,
    alignItems: "center",
  },
  coverPreviewWrapper: {
    width: "22%",
    height: 190,
    padding: 2,
    backgroundColor: "var(--light-100)",
    border: "0.5px solid var(--border-200)",
    borderRadius: 6,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  coverPreviewBox: {
    width: "100%",
    height: "100%",
    border: "0.5px dashed var(--border-200)",
    borderRadius: 5,
    overflow: "hidden",
    display: "flex",        
    alignItems: "center",      
    justifyContent: "center", 
    background: "var(--light-200)",
  },
  bookPlaceholder: {
    width: 50,
    height: 50,
  },
  replaceBox: {
    width: "fit-content",
    padding: 2,
    backgroundColor: "var(--light-200)",
    border: "0.5px solid var(--border-200)",
    borderRadius: 6,
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    gap: 8,
    alignItems: "flex-start",
  },
  replaceBtn: {
    fontSize: 10,
    fontWeight: 550,
    color: "var(--dark-200)",
    padding: "2px 6px",
    borderRadius: 5,
    backgroundColor: "var(--light-100)",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: 4,
  },
  descriptionBox: {
    display: "flex",
    alignItems: "flex-start",
    padding: "20px 0",
  },
  descriptionLeft: {
    flex: 0.5,
  },
  descriptionRight: {
    flex: 1,
    display: "flex",
    gap: 10,
    alignItems: "flex-start",
    marginBottom: 8,
    flexWrap: "wrap",
    flexDirection: "column",
  },
  descriptionEditorBox: {
    width: "100%",
    padding: 2,
    backgroundColor: "var(--light-200)",
    border: "0.5px solid var(--border-200)",
    borderRadius: 6,
    cursor: "pointer",
  },
  editorBox: {
    fontSize: 10,
    fontWeight: 550,
    color: "var(--dark-200)",
    padding: 10,
    borderRadius: 5,
    backgroundColor: "var(--light-100)",
    minHeight: 150,
    overflowY: "auto",
  }
};

interface InputRowProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

const InputRow: FC<InputRowProps> = ({ label, value, onChange, placeholder }) => (
  <Box>
    <Box style={styles.twoColRow}>
      <Box style={styles.leftCol}>
        <Text style={styles.labelText}>{label}</Text>
      </Box>
      <Box style={styles.rightCol}>
        <Box style={styles.rightBox}>
          <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            style={styles.inputBase}
            placeholder={placeholder || `Enter ${label}`} 
          />
        </Box>
      </Box>
    </Box>
    <hr style={styles.dottedHr} />
  </Box>
);

interface CoverSectionProps {
  coverPreview: string | null;
  onReplaceClick: () => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  onFileChange: React.ChangeEventHandler<HTMLInputElement>;
}

const CoverSection: FC<CoverSectionProps> = ({ coverPreview, onReplaceClick, fileInputRef, onFileChange }) => (
  <Box style={styles.twoColRow}>
    <Box style={styles.leftCol}>
      <Text style={styles.labelText}>Cover</Text>
      <Text style={styles.labelSub}>JPEG, PNG or WebP. Max 300 KB</Text>
    </Box>
    <Box style={styles.rightCol}>
      <Box style={styles.coverRow}>
        <Box style={styles.coverPreviewWrapper}>
          <Box style={styles.coverPreviewBox}>
            {coverPreview ? ( 
              <Box style={styles.bookMainholder}>
                <img src={coverPreview} alt="book preview" style={{ maxWidth: "100%", maxHeight: "100%" }} />
              </Box>
            ) : (
              <Box style={styles.bookPlaceholder}>
                <img src={Book} alt="book icon" />
              </Box>
            )}
          </Box>
        </Box>
        <Box style={styles.replaceBox}>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            style={{ display: "none" }}
            onChange={onFileChange}
          />
          <button type="button" style={styles.replaceBtn} onClick={onReplaceClick}>
            <DownloadIcon style={styles.actionIcon} /> Replace
          </button>
        </Box>
      </Box>
    </Box>
  </Box>
);

type BookType = {
  id?: string;
  title?: string;
  author?: string;
  genre?: string;
  publication?: string;
  language?: string;
  format?: string;
  isbn?: string;
  link?: string;
  summary?: string;
  image?: string | null;
  [k: string]: any;
};

type UploadResp = {
  message: string;
  shelf: string;
  id: string;
};

const Addition: FC = () => {
  const location = useLocation();
  const bookData = (location.state as BookType) || ({} as BookType);
  const { uploadNewBook, addToShelf } = useShelves(); 

  const [book, setBook] = useState<BookType>({ ...bookData });
  const [coverPreview, setCoverPreview] = useState<string | null>(book.image ?? null);
  const [description, setDescription] = useState(book.summary || "");

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const summaryRef = useRef<HTMLDivElement | null>(null);
  const tempText = useRef<BookType>({ ...bookData });

  const [, setShelfOpen] = useState(false);
  const [, setFontOpen] = useState(false);
  const [, setFontSizeOpen] = useState(false);

  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "success" | "error">("idle");
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  const [addShelfStatus, setAddShelfStatus] = useState<"idle" | "adding" | "added" | "error">("idle");
  const [addShelfMessage, setAddShelfMessage] = useState<string | null>(null);

  const details = [
    { label: "Publication Date", key: "publication", placeholder: "YYYY-MM-DD" },
    { label: "Language", key: "language", placeholder: "English" },
    { label: "Format", key: "format", placeholder: "Hardcover" },
    { label: "ISBN", key: "isbn", placeholder: "1234567890" },
    { label: "Link", key: "link", placeholder: "https://example.com" },
  ];

  useEffect(() => {
    if (summaryRef.current) summaryRef.current.innerHTML = description;
    tempText.current = { ...bookData };
  }, []); 

  const saveBook = async () => {
    const updated: BookType = { ...tempText.current, summary: description };

    if (!updated.title?.trim()) {
      setSaveStatus("error");
      setSaveMessage("Title is required");
      setTimeout(() => setSaveMessage(null), 3000);
      return;
    }

    setBook(updated);
    setSaveStatus("saving");
    setSaveMessage(null);

    try {
      const formData = new FormData();
      formData.append("title", updated.title ?? "");
      formData.append("author", updated.author ?? "");
      formData.append("genre", updated.genre ?? "");
      formData.append("publicationDate", updated.publication ?? "");
      formData.append("language", updated.language ?? "");
      formData.append("format", updated.format ?? "");
      formData.append("isbn", updated.isbn ?? "");
      formData.append("description", updated.summary ?? "");
      formData.append("link", updated.link ?? "");

      const file = fileInputRef.current?.files?.[0];
      if (file) formData.append("cover", file);

      const response: UploadResp | null = await uploadNewBook(formData);

      if (response?.id) {
        const withId = { ...updated, id: response.id };
        setBook(withId);
        tempText.current = withId;

        setSaveStatus("success");
        setSaveMessage("Book uploaded successfully");
      } else {
        setBook(updated);
        tempText.current = updated;

        setSaveStatus("success");
        setSaveMessage("Book uploaded successfully");
      }
    } catch (err) {
      console.error("saveBook error:", err);
      setSaveStatus("error");
      setSaveMessage("Failed to save book");
    } finally {
      setTimeout(() => setSaveMessage(null), 3000);
    }
  };

  const handleAddToShelf = async () => {
    if (!book.isbn) {
      setAddShelfStatus("error");
      setAddShelfMessage("Upload the book first");
      setTimeout(() => setAddShelfMessage(null), 3000);
      return;
    }

    setAddShelfStatus("adding");
    setAddShelfMessage(null);

    try {
      const res = await addToShelf(book.isbn);

      if (res && (res.message || res.id)) {
        setAddShelfStatus("added");
        setAddShelfMessage("Book added successfully");
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

  const handleInputChange = (key: keyof BookType, value: string) => {
    tempText.current = { ...tempText.current, [key]: value };
    setBook({ ...tempText.current });
  };

  const handleReplaceClick = () => fileInputRef.current?.click();

  const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;

    const allowed = ["image/jpeg", "image/png", "image/webp"];
    if (!allowed.includes(f.type)) {
      alert("Allowed image types: JPEG, PNG, WebP");
      return;
    }
    if (f.size > 300 * 1024) {
      alert("Max image size is 300 KB");
      return;
    }

    const url = URL.createObjectURL(f);
    setCoverPreview(url);
    tempText.current.image = url;
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".shelf-btn") && !target.closest(".shelf-dropdown")) setShelfOpen(false);
      if (!target.closest(".font-select-btn") && !target.closest(".font-dropdown")) setFontOpen(false);
      if (!target.closest(".fontsize-select-btn") && !target.closest(".fontsize-dropdown")) setFontSizeOpen(false);
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  return (
    <>
      <style>{`
        input[type="color"]::-webkit-color-swatch-wrapper { padding: 0; border-radius: 50%; }
        input[type="color"]::-webkit-color-swatch { border: none; border-radius: 50%; }
        input[type="color"]::-moz-color-swatch { border: none; border-radius: 50%; }
        .hover-light:hover { background-color: var(--light-100); border-radius: 5px; }
      `}</style>

      <Stack gap="10" style={styles.additionBody}>
        <Info query={""} setQuery={() => {}} />

        <Box style={styles.additionMain}>
          <Box style={styles.additionWrapper}>
            <Box style={styles.additionSection}>
              <Box style={styles.topSection}>
                <Box style={styles.actionWrapper}>
                  <Box style={styles.actionRow}>
                    <Box style={styles.actionMain}>
                      <Box style={styles.actionBtn} onClick={saveBook}>
                        <SaveIcon style={styles.actionIcon} />
                        <Text style={styles.actionText}>
                          {saveStatus === "saving"
                            ? "Saving"
                            : saveStatus === "success"
                            ? "Saved"
                            : saveStatus === "error"
                            ? "Failed"
                            : "Save Draft"}
                        </Text>
                      </Box>
                    </Box>

                    <Box style={styles.actionMain}>
                      <Box className="shelf-btn" style={styles.actionBtn} onClick={handleAddToShelf}>
                        <BookmarkFill style={styles.actionIcon} />
                        <Text style={styles.actionText}>
                          {addShelfStatus === "adding"
                            ? "Adding"
                            : addShelfStatus === "added"
                            ? "Added"
                            : addShelfStatus === "error"
                            ? "Failed"
                            : "Add to Shelf"}
                        </Text>
                      </Box>
                    </Box>
                  </Box>
                </Box>

                {["title", "author", "genre"].map((f) => (
                  <InputRow
                    key={f}
                    label={f[0].toUpperCase() + f.slice(1)}
                    value={(tempText.current as any)[f] ?? ""}
                    onChange={(val: string) => handleInputChange(f as keyof BookType, val)}
                    placeholder={`${f[0].toUpperCase() + f.slice(1)}`}
                  />
                ))}

                <CoverSection
                  coverPreview={coverPreview}
                  onReplaceClick={handleReplaceClick}
                  fileInputRef={fileInputRef}
                  onFileChange={handleFileChange}
                />

                <hr style={styles.dottedHr} />

                {details.map((d) => (
                  <InputRow
                    key={d.key}
                    label={d.label}
                    value={(tempText.current as any)[d.key] ?? ""}
                    onChange={(val: string) => handleInputChange(d.key as keyof BookType, val)}
                    placeholder={d.placeholder}
                  />
                ))}

                <Box style={styles.descriptionBox}>
                  <Box style={styles.descriptionLeft}>
                    <Text style={styles.labelText}>Description</Text>
                  </Box>

                  <Box style={styles.descriptionRight}>
                    <Box style={styles.descriptionEditorBox}>
                      <Box
                        ref={summaryRef}
                        contentEditable
                        suppressContentEditableWarning
                        style={styles.editorBox}
                        onInput={(e) => setDescription((e.target as HTMLDivElement).innerHTML)}
                      />
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Stack>

      {saveMessage && <Toast message={saveMessage} status={saveStatus === "success" ? "success" : "error"} />}
      {addShelfMessage && (
        <Toast message={addShelfMessage} status={addShelfStatus === "added" ? "success" : "error"} />
      )}
    </>
  );
};

export default Addition;
