import { type FC, type CSSProperties, useRef, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Box, Text, Stack } from "@mantine/core";

import Info from "../layout/info";
import Book3 from "@/assets/book3.jpg";

import SaveIcon from "@/assets/icons/save";
import BookmarkFill from "@/assets/icons/bookmarkFill";
import DownloadIcon from "@/assets/icons/download";
import BoldIcon from "@/assets/icons/bold";
import UnderlineIcon from "@/assets/icons/underline";
import SlantIcon from "@/assets/icons/slant";
import LeftIcon from "@/assets/icons/left";
import JustifyIcon from "@/assets/icons/justify";

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
    padding: "40px 0 20px 0",
    width: "100%",
  },
  viewSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
    width: "90%",
    margin: "0 auto",
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
    width: 120,
    height: "auto",
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
    border: "0.5px dashed var(--border-200)",
    borderRadius: 5,
    overflow: "hidden",
    background: "var(--light-200)",
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
  },
  toolbarBox: {
    width: "fit-content",
    padding: 2,
    backgroundColor: "var(--light-200)",
    border: "0.5px solid var(--border-200)",
    borderRadius: 6,
    cursor: "pointer",
    display: "flex",
  },
  toolbar: {
    fontSize: 9,
    fontWeight: 600,
    color: "var(--dark-200)",
    padding: 4,
    borderRadius: 5,
    backgroundColor: "var(--light-100)",
    display: "flex",
    gap: 8,
    alignItems: "center",
    flexWrap: "wrap",
    width: "100%",
    height: "100%",
  },
  selectBtn: {
    display: "flex",
    alignItems: "center",
    gap: 4,
    padding: "2px 6px",
    borderRadius: 5,
    backgroundColor: "var(--light-200)",
    border: "0.5px solid var(--border-200)",
    color: "var(--dark-200)",
  },
  selectText: {
    fontSize: 9,
    fontWeight: 550,
  },
  iconBtn: {
    background: "var(--light-200)",
    border: "0.5px solid var(--border-200)",
    borderRadius: 5,
    padding: "4px 6px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  colorBoxWrapper: {
    width: 18,
    height: 18,
    borderRadius: "50%",
    border: "2px solid var(--border-200)",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "transparent",
    cursor: "pointer",
  },
  colorBox: {
    width: "100%",
    height: "100%",
    border: "none",
    padding: 0,
    borderRadius: "50%",
    background: "transparent",
    appearance: "none",
    WebkitAppearance: "none",
    cursor: "pointer",
  },
  descriptionEditorBox: {
    width: "fit-content",
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

const mainBook = {
  title: "Fourth Wing",
  author: "Rebecca Yarrow",
  image: Book3,
  genre: "Fantasy",
  publication: "May 2, 2023",
  language: "English",
  format: "517 pages, Hardcover",
  isbn: "9781649374042",
  summary:
    "Enter the brutal and elite world of a war college for dragon riders... Twenty-year-old Violet Sorrengail was supposed to enter the Scribe Quadrant, living a quiet life among books and history. Now, the commanding general—also known as her tough-as-talons mother—has ordered Violet to join the hundreds of candidates striving to become the elite of Navarre: dragon riders. But when you’re smaller than everyone else and your body is brittle, death is only a heartbeat away...because dragons don’t bond to “fragile” humans. They incinerate them. With fewer dragons willing to bond than cadets, most would kill Violet to better their own chances of success. The rest would kill her just for being her mother’s daughter—like Xaden Riorson, the most powerful and ruthless wingleader in the Riders Quadrant. She’ll need every edge her wits can give her just to see the next sunrise. Yet, with every day that passes, the war outside grows more deadly, the kingdom's protective wards are failing, and the death toll continues to rise. Even worse, Violet begins to suspect leadership is hiding a terrible secret. Friends, enemies, lovers. Everyone at Basgiath War College has an agenda—because once you enter, there are only two ways out: graduate or die.",
};

type BookType = typeof mainBook;

interface InputRowProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
}
const InputRow: FC<InputRowProps> = ({ label, value, onChange }) => (
  <Box>
    <Box style={styles.twoColRow}>
      <Box style={styles.leftCol}>
        <Text style={styles.labelText}>{label}</Text>
      </Box>
      <Box style={styles.rightCol}>
        <Box style={styles.rightBox}>
          <input value={value} onChange={(e) => onChange(e.target.value)} style={styles.inputBase} placeholder={label} />
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
              <img src={coverPreview} alt="preview" style={{ maxWidth: "100%", maxHeight: "100%" }} />
            ) : (
              <Text style={{ fontSize: 12, color: "var(--dark-200)", padding: 8 }}>No image</Text>
            )}
          </Box>
        </Box>
        <Box style={styles.replaceBox}>
          <input ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/webp" style={{ display: "none" }} onChange={onFileChange} />
          <button type="button" style={styles.replaceBtn} onClick={onReplaceClick}>
            <DownloadIcon style={styles.actionIcon} /> Replace
          </button>
        </Box>
      </Box>
    </Box>
  </Box>
);

const View: FC = () => {
  const location = useLocation();
  const bookData = (location.state as BookType) || mainBook;

  const [book, setBook] = useState<BookType>({ ...bookData });
  const [coverPreview, setCoverPreview] = useState<string | null>(book.image ?? null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const summaryRef = useRef<HTMLDivElement | null>(null);
  const tempText = useRef<BookType>({ ...bookData });

  const [shelfOpen, setShelfOpen] = useState(false);
  const [, setFontOpen] = useState(false);
  const [, setFontSizeOpen] = useState(false);
  const [selectedFont, setSelectedFont] = useState("Times New Roman");
  const [selectedFontSize, setSelectedFontSize] = useState("10px");

  const fonts = ["Times New Roman", "Georgia", "Arial", "Verdana"];
  const fontSizes = ["10px", "12px", "14px", "16px", "18px", "20px"];
  const details = [
    { label: "Publication Date", key: "publication" },
    { label: "Language", key: "language" },
    { label: "Format", key: "format" },
    { label: "ISBN", key: "isbn" },
  ];

  const saveBook = () => {
    const newSummary = summaryRef.current?.innerHTML ?? tempText.current.summary ?? "";
    const updated: BookType = { ...tempText.current, summary: newSummary, image: coverPreview ?? book.image };
    setBook(updated);
    console.log("Book saved:", updated);
  };

  const handleInputChange = (key: keyof BookType, value: string) => {
    tempText.current = { ...tempText.current, [key]: value };
    saveBook();
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
    setCoverPreview(URL.createObjectURL(f));
    (tempText.current as any).__imageFile = f;
    saveBook();
  };

  const exec = (command: string, value?: string) => {
    summaryRef.current?.focus();
    document.execCommand(command, false, value);
    saveBook();
  };

  const applyFontSize = (size: string) => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    if (range.collapsed) return;

    const span = document.createElement("span");
    span.style.fontSize = size;
    range.surroundContents(span);

    selection.removeAllRanges();
    const newRange = document.createRange();
    newRange.setStartAfter(span);
    selection.addRange(newRange);

    saveBook();
  };

  useEffect(() => saveBook(), [tempText.current]);

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

      <Stack gap="10" style={styles.viewBody}>
        <Info />

        <Box style={styles.viewMain}>
          <Box style={styles.viewWrapper}>
            <Box style={styles.viewSection}>
              <Box style={styles.topSection}>

                <Box style={styles.actionWrapper}>
                  <Box style={styles.actionRow}>
                    <Box style={styles.actionMain}>
                      <Box style={styles.actionBtn} onClick={saveBook}>
                        <SaveIcon style={styles.actionIcon} />
                        <Text style={styles.actionText}>Save Draft</Text>
                      </Box>
                    </Box>

                    <Box style={styles.actionMain}>
                      <Box
                        className="shelf-btn"
                        style={{ ...styles.actionBtn, position: "relative" }}
                        onClick={() => setShelfOpen((s) => !s)}
                      >
                        <BookmarkFill style={styles.actionIcon} />
                        <Text style={styles.actionText}>Add to Shelf</Text>

                        {shelfOpen && (
                          <Box style={styles.shelfMain}>
                            <Box className="shelf-dropdown" style={styles.shelfDropdown}>
                              {["Recent", "Completed", "Wishlist"].map((opt) => (
                                <Box
                                  key={opt}
                                  style={styles.shelfOption}
                                  className="hover-light"
                                  onClick={() => {
                                    console.log("Added to:", opt);
                                    setShelfOpen(false);
                                  }}
                                >
                                  {opt}
                                </Box>
                              ))}
                            </Box>
                          </Box>
                        )}
                      </Box>
                    </Box>
                  </Box>
                </Box>

                {["title", "author", "genre"].map((f) => (
                  <InputRow key={f} label={f[0].toUpperCase() + f.slice(1)} value={(tempText.current as any)[f]} onChange={(val) => handleInputChange(f as keyof BookType, val)} />
                ))}

                <CoverSection coverPreview={coverPreview} onReplaceClick={handleReplaceClick} fileInputRef={fileInputRef} onFileChange={handleFileChange} />

                {details.map((d) => (
                  <InputRow key={d.key} label={d.label} value={(tempText.current as any)[d.key] ?? ""} onChange={(val) => handleInputChange(d.key as keyof BookType, val)} />
                ))}

                <Box style={styles.descriptionBox}>
                  <Box style={styles.descriptionLeft}>
                    <Text style={styles.labelText}>Description</Text>
                  </Box>

                  <Box style={styles.descriptionRight}>
                    <Box style={styles.toolbarBox}>
                      <Box style={styles.toolbar}>

                        <Box style={{ ...styles.selectBtn, cursor: "pointer", userSelect: "none" }} onClick={() => {
                          const nextIndex = (fonts.indexOf(selectedFont) + 1) % fonts.length;
                          setSelectedFont(fonts[nextIndex]);
                          exec("fontName", fonts[nextIndex]);
                        }}>
                          <Text style={styles.selectText}>{selectedFont}</Text>
                        </Box>

                        <Box style={{ ...styles.selectBtn, cursor: "pointer", userSelect: "none" }} onClick={() => {
                          const nextIndex = (fontSizes.indexOf(selectedFontSize) + 1) % fontSizes.length;
                          const nextSize = fontSizes[nextIndex];
                          setSelectedFontSize(nextSize);
                          applyFontSize(nextSize);
                        }}>
                          <Text style={styles.selectText}>{selectedFontSize}</Text>
                        </Box>

                        <button type="button" style={styles.iconBtn} onClick={() => exec("bold")}><BoldIcon style={styles.actionIcon} /></button>
                        <button type="button" style={styles.iconBtn} onClick={() => exec("italic")}><SlantIcon style={styles.actionIcon} /></button>
                        <button type="button" style={styles.iconBtn} onClick={() => exec("underline")}><UnderlineIcon style={styles.actionIcon} /></button>

                        <Box style={styles.colorBoxWrapper}>
                          <input type="color" style={styles.colorBox} onChange={(e) => exec("foreColor", e.target.value)} title="Text color" />
                        </Box>

                        <button type="button" style={styles.iconBtn} onClick={() => exec("justifyLeft")}><LeftIcon style={styles.actionIcon} /></button>
                        <button type="button" style={styles.iconBtn} onClick={() => exec("justifyCenter")}><JustifyIcon style={styles.actionIcon} /></button>
                      </Box>
                    </Box>

                    <Box style={styles.descriptionEditorBox}>
                      <Box ref={summaryRef} contentEditable suppressContentEditableWarning style={styles.editorBox} dangerouslySetInnerHTML={{ __html: book.summary }} />
                    </Box>
                  </Box>
                </Box>

              </Box>
            </Box>
          </Box>
        </Box>
      </Stack>
    </>
  );
};

export default View;