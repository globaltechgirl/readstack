import { type FC, useState, useRef, type CSSProperties, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Box, Avatar, Text } from "@mantine/core";
import { motion, AnimatePresence } from "framer-motion";

import { NavLinks, ROUTES } from "@/utils/constants";
import Logo from "@/assets/logo.svg";
import SidebarIcon from "@/assets/icons/sidebar";
import UnfoldIcon from "@/assets/icons/unfold";
import ArrowDownIcon from "@/assets/icons/arrowDown";
import useUser from "@/hooks/use-user";
import useShelves from "@/hooks/use-shelves";
import { TOP_FICTION_GENRES, TOP_NON_FICTION_GENRES, TOP_AUDIOBOOKS_GENRES } from "@/types/genres";

const styles: Record<string, CSSProperties> = {
  wrapper: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  topSection: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    gap: 10,
  },
  logoBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 5,
    paddingTop: 1.5,
  },
  logoIcon: { 
    width: 30, 
    height: 30 
  },
  navLinks: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    padding: 5,
    paddingTop: 18.5,
    gap: 5.3,
  },
  navLinkBox: { 
    position: "relative", 
    width: "100%" 
  },
  navLink: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    padding: "7px 4px",
    gap: 10,
    textDecoration: "none",
    fontSize: 9,
    fontWeight: 600,
    letterSpacing: "0.4px",
    transition: "all 0.2s ease",
  },
  navIconLabel: { 
    display: "flex", 
    alignItems: "center", 
    gap: 10 
  },
  unfoldBtn: { 
    cursor: "pointer",
    display: "flex", 
    alignItems: "center" 
  },
  arrowIcon: { 
    transition: "transform 0.25s ease" 
  },
  dropdown: {
    padding: 4,
    paddingRight: 0,
    display: "flex",
    flexDirection: "column",
    gap: 10,
    zIndex: 100,
    marginLeft: 22,
  },
  dropdownItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "3px 4px",
    borderRadius: 4,
    cursor: "pointer",
    transition: "color 0.2s ease",
  },
  dropdownText: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    textTransform: "capitalize",
    fontSize: 8.8,
    fontWeight: 600,
    letterSpacing: "0.4px",
    color: "var(--dark-200)",
    transition: "color 0.2s ease",
  },
  countBox: {
    backgroundColor: "var(--light-100)",
    border: "0.5px solid var(--border-100)",
    borderRadius: 4,
    padding: "1.5px 3.5px 1px 3.5px",
    fontSize: 7,
    fontWeight: 600,
  },
  userWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    position: "relative",
  },
  userMain: {
    padding: 2,
    paddingRight: 6,
    borderRadius: 8,
    backgroundColor: "var(--light-100)",
    border: "0.5px solid var(--border-200)",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 6,
    width: "100%",
  },
  userBox: { 
    display: "flex", 
    alignItems: "center", 
    gap: 8 
  },
  userInfo: { 
    display: "flex", 
    flexDirection: "column", 
    gap: 1, 
    letterSpacing: 0.1, 
  },
  userName: { 
    fontSize: 8.5, 
    fontWeight: 600, 
    color: "var(--dark-100)" 
  },
  userEmail: { 
    fontSize: 8, 
    fontWeight: 550, 
    color: "var(--dark-200)" 
  },
  userImg: {
    width: 30,
    height: 30,
    borderRadius: 8,
    backgroundColor: "var(--light-100)",
    border: "0.5px solid var(--border-200)",
    objectFit: "cover",
  },
  logoutDropdown: {
    position: "absolute",
    bottom: 45,
    width: "90%",
    backgroundColor: "var(--light-100)",
    border: "0.5px solid var(--border-200)",
    borderRadius: 6,
    padding: "6px 0",
    textAlign: "center",
    cursor: "pointer",
    color: "var(--red)",
    fontSize: 8.5,
    fontWeight: 550,
    zIndex: 200,
  },
};

const addGapAfterLinks = [ROUTES.OVERVIEW, ROUTES.SHELVES.ROOT];

const getNavLinkStyle = (isActive: boolean): CSSProperties => ({
  ...styles.navLink,
  color: isActive ? "var(--dark-200)" : "var(--dark-100)",
});

interface Book {
  id: string;
  image: string;
  title: string;
  author: string;
  tag: string;
}

interface MainbarProps {
  onSidebarClick?: () => void;
}

const Mainbar: FC<MainbarProps> = ({ onSidebarClick }) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [popoverOpened, setPopoverOpened] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const { user } = useUser();
  const { fetchAllShelves, fetchFeaturedBooks } = useShelves();

  const [bookCounts, setBookCounts] = useState<Record<string, number>>({});

  const toggleDropdown = (label: string) =>
    setOpenDropdown((prev) => (prev === label ? null : label));

  const normalize = (g: string) => g.toLowerCase().replace(/[-\s]/g, "");

  const loadCounts = async () => {
    try {
      const shelvesResponse = await fetchAllShelves();

      const combinedBooks = [
        ...(shelvesResponse?.currentlyReading ?? []),
        ...(shelvesResponse?.wantToRead ?? []),
        ...(shelvesResponse?.read ?? []),
      ];

      const allBooks = combinedBooks.map((item) => ({
        genre: String(
          item.book?.genre ??
            item.book?.categories?.[0] ??
            item.userBook?.categories?.[0] ??
            "Unknown"
        ),
      }));

      const fictionCount = allBooks.filter((book) => {
        const g = normalize(book.genre);
        return TOP_FICTION_GENRES.some((fx) => g.includes(normalize(fx)));
      }).length;

      const nonFictionCount = allBooks.filter((book) => {
        const g = normalize(book.genre);
        return TOP_NON_FICTION_GENRES.some((nfx) => g.includes(normalize(nfx)));
      }).length;

      const audiobookCount = allBooks.filter((book) => {
        const g = normalize(book.genre);
        return TOP_AUDIOBOOKS_GENRES.some((ab) => g.includes(normalize(ab)));
      }).length;

      const featured = await fetchFeaturedBooks();
      const featuredBooks: Book[] = (featured || []).map((shelf) => ({
        id: shelf.bookId || String(shelf.id || Math.random()),
        image: shelf.coverImageUrl || "/placeholder-book.png",
        title: shelf.title || "No title",
        author: Array.isArray(shelf.authors) ? shelf.authors.join(", ") : "Unknown",
        tag: shelf.categories?.[0] || "Unknown",
      }));

      setBookCounts({
        All: featuredBooks.length, 
        Completed: shelvesResponse?.read?.length || 0,
        Recent: shelvesResponse?.currentlyReading?.length || 0,
        Wishlist: shelvesResponse?.wantToRead?.length || 0,
        Fiction: fictionCount,
        "NonFiction": nonFictionCount, 
        Audiobooks: audiobookCount,
      });
    } catch (err) {
      console.error("Failed to fetch book counts:", err);
      setBookCounts((prev) => ({ ...prev, AllBooks: 0 }));
    }
  };

  useEffect(() => {
    loadCounts();
  }, []);

  return (
    <Box style={styles.wrapper}>
      <Box style={styles.topSection}>
        <Box style={styles.logoBox}>
          <img src={Logo} alt="Readstack Logo" style={styles.logoIcon} />
          <Box onClick={onSidebarClick} style={{ cursor: "pointer" }}>
            <SidebarIcon width={13} height={13} />
          </Box>
        </Box>

        <Box style={styles.navLinks}>
          {NavLinks.map(({ label, link, icon: Icon, subNav }) => {
            const isGapAfter = addGapAfterLinks.includes(link);
            const isDropdownOpen = openDropdown === label;

            return (
              <Box
                key={link}
                ref={isDropdownOpen ? dropdownRef : null}
                style={{ ...styles.navLinkBox, marginBottom: isGapAfter ? 12 : 0 }}
              >
                <NavLink
                  to={link}
                  style={({ isActive }) => getNavLinkStyle(isActive)}
                  onClick={() => toggleDropdown(label)}
                >
                  <Box style={styles.navIconLabel}>
                    <Icon style={{ width: 11, height: 11, marginBottom: 1 }} />
                    {label}
                  </Box>

                  {subNav && subNav.length > 0 && (
                    <Box
                      style={styles.unfoldBtn}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleDropdown(label);
                      }}
                    >
                      <ArrowDownIcon
                        width={9}
                        height={9}
                        style={{
                          ...styles.arrowIcon,
                          transform: isDropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
                        }}
                      />
                    </Box>
                  )}
                </NavLink>

                <AnimatePresence>
                  {isDropdownOpen && subNav && subNav.length > 0 && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      style={styles.dropdown}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {subNav.map(({ label: subLabel, link: subLink }) => (
                        <NavLink
                          key={subLink}
                          to={subLink}
                          style={({ isActive }) => ({
                            ...styles.dropdownItem,
                            color: isActive ? "var(--dark-100)" : "var(--dark-200)",
                          })}
                        >
                          <Text style={styles.dropdownText}>{subLabel}</Text>
                          {subLabel !== "Addition" && (<Box style={styles.countBox}>{bookCounts[subLabel] ?? 0}</Box> )}
                        </NavLink>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </Box>
            );
          })}
        </Box>
      </Box>

      <Box style={styles.userWrapper}>
        <Box
          style={styles.userMain}
          onClick={(e) => {
            e.stopPropagation();
            setPopoverOpened((prev) => !prev);
          }}
        >
          <Box style={styles.userBox}>
            <Avatar radius="6" size={32} src="" />
            <Box style={styles.userInfo}>
              <Text style={styles.userName}>{user?.name || "Guest User"}</Text>
              <Text style={styles.userEmail}>{user?.email || "guest@example.com"}</Text>
            </Box>
          </Box>
          <UnfoldIcon width={9} height={9} color="var(--dark-200)" />
        </Box>

        <AnimatePresence>
          {popoverOpened && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              style={styles.logoutDropdown}
              onClick={() => setPopoverOpened(false)}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "var(--red-light)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "var(--white)")
              }
            >
              Logout
            </motion.div>
          )}
        </AnimatePresence>
      </Box>
    </Box>
  );
};

export default Mainbar;
