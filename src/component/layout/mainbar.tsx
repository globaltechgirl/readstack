import { type FC, useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { Box, Avatar, Text } from "@mantine/core";
import { motion, AnimatePresence } from "framer-motion";

import { NavLinks, ROUTES } from "@/utils/constants";
import UnfoldIcon from "@/assets/icons/unfold";
import ArrowDownIcon from "@/assets/icons/arrowDown";

const styles = {
  wrapper: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column" as const,
    justifyContent: "space-between",
    alignItems: "stretch",
  },
  topSection: {
    display: "flex",
    flexDirection: "column" as const,
    width: "100%",
    gap: 10,
  },
  logoBox: {
    display: "flex",
    alignItems: "center",
    padding: 8,
  },
  navLinks: {
    display: "flex",
    flexDirection: "column" as const,
    width: "100%",
    padding: 8,
    paddingTop: 8.5,
    gap: 5,
  },
  navLinkBox: {
    position: "relative" as const,
    width: "100%",
  },
  navLink: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    padding: "7px 4px",
    transition: "all 0.2s ease",
    gap: 10,
    textDecoration: "none",
    fontSize: 9,
    fontWeight: 450,
    letterSpacing: "0.4px",
  },
  navIconLabel: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  countGroup: {
    display: "flex",
    alignItems: "center",
    gap: 6,
  },
  countBox: {
    backgroundColor: "var(--white)",
    border: "0.5px solid var(--border-100)",
    borderRadius: 4,
    padding: "1.5px 3.5px 1px 3.5px",
    fontSize: 7,
    fontWeight: 500,
    marginRight: 2,
  },
  unfoldBtn: {
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
  },
  arrowIcon: {
    transition: "transform 0.25s ease",
  },
  dropdown: {
    padding: 4,
    display: "flex",
    flexDirection: "column" as const,
    gap: 10,
    zIndex: 100,
    marginLeft: 22,
  },
  dropdownItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    transition: "color 0.2s ease",
    padding: "3px 4px",
    borderRadius: 4,
    cursor: "pointer",
  },
  dropdownText: {
    whiteSpace: "nowrap" as const,
    overflow: "hidden",
    textOverflow: "ellipsis",
    textTransform: "capitalize" as const,
    fontSize: 8.8,
    fontWeight: 400,
    letterSpacing: "0.4px",
    cursor: "pointer",
    color: "var(--dark-200)",
    transition: "color 0.2s ease",
  },
  userWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 2,
    width: "100%",
    position: "relative" as const,
  },
  userMain: {
    padding: 2,
    paddingRight: 4,
    borderRadius: 8,
    backgroundColor: "var(--white)",
    border: "0.5px solid var(--border-100)",
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
    gap: 8,
  },
  userInfo: {
    display: "flex",
    flexDirection: "column" as const,
    gap: 0,
    letterSpacing: "0.1px",
  },
  userName: {
    fontSize: 8.5,
    fontWeight: 450,
    color: "var(--light-100)",
  },
  userEmail: {
    fontSize: 8,
    fontWeight: 400,
    color: "var(--light-200)",
  },
  userImg: {
    width: 30,
    height: 30,
    borderRadius: 8,
    backgroundColor: "var(--white)",
    border: "0.5px solid var(--border-100)",
    objectFit: "cover" as const,
  },
  logoutDropdown: {
    position: "absolute" as const,
    bottom: "45px",
    width: "90%",
    backgroundColor: "var(--white)",
    border: "0.5px solid var(--border-100)",
    borderRadius: 6,
    padding: "6px 0",
    textAlign: "center" as const,
    cursor: "pointer",
    color: "var(--red)",
    fontSize: 8.5,
    fontWeight: 450,
    zIndex: 200,
  },
};

const Mainbar: FC = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [popoverOpened, setPopoverOpened] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // close dropdown only when click happens outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpenDropdown(null);
      }
    };
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <Box style={styles.wrapper}>
      <Box style={styles.topSection}>
        <Box style={styles.navLinks}>
          {NavLinks.map(({ label, link, icon: Icon, subNav }) => {
            const addGapAfter = [ROUTES.HOME, ROUTES.BOOKMARK.ROOT];
            const isGapAfter = addGapAfter.includes(link);

            return (
              <Box
                key={link}
                ref={openDropdown === label ? dropdownRef : null}
                style={{
                  ...styles.navLinkBox,
                  marginBottom: isGapAfter ? 12 : 0,
                }}
              >
                {/* MAIN NAV ITEM */}
                <NavLink
                  to={link}
                  style={({ isActive }) => ({
                    ...styles.navLink,
                    color: isActive ? "var(--dark-100)" : "var(--dark-200)",
                  })}
                  onClick={() => setOpenDropdown(openDropdown === label ? null : label)}
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
                        setOpenDropdown(openDropdown === label ? null : label);
                      }}
                    >
                      <ArrowDownIcon
                        width={9}
                        height={9}
                        style={{
                          ...styles.arrowIcon,
                          transform:
                            openDropdown === label
                              ? "rotate(180deg)"
                              : "rotate(0deg)",
                        }}
                      />
                    </Box>
                  )}
                </NavLink>

                {/* SUBNAV DROPDOWN */}
                <AnimatePresence>
                  {openDropdown === label && subNav && subNav.length > 0 && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      style={styles.dropdown}
                      onClick={(e) => e.stopPropagation()} // prevent outside click close
                    >
                      {subNav.map(({ label: subLabel, link: subLink }) => (
                        <NavLink
                          key={subLink}
                          to={subLink}
                          style={({ isActive }) => ({
                            ...styles.dropdownItem,
                            color: isActive
                              ? "var(--dark-100)"
                              : "var(--dark-200)",
                          })}
                        >
                          <Text style={styles.dropdownText}>{subLabel}</Text>
                          <Box style={styles.countBox}>10</Box>
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

      {/* USER PROFILE SECTION */}
      <Box style={styles.userWrapper}>
        <Box
          style={styles.userMain}
          onClick={(e) => {
            e.stopPropagation();
            setPopoverOpened((prev) => !prev);
          }}
        >
          <Box style={styles.userBox}>
            <Avatar radius="6" size={30} />
            <Box style={styles.userInfo}>
              <Text style={styles.userName}>Onyinye Ofili</Text>
              <Text style={styles.userEmail}>onyinyeofili209@gmail.com</Text>
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
