import type { FC, CSSProperties } from "react";
import { useState, useEffect } from "react";
import { Box, Text } from "@mantine/core";
import { motion, AnimatePresence } from "framer-motion";

import SunIcon from "@/assets/icons/sun";
import MoonIcon from "@/assets/icons/moon";
import NotificationIcon from "@/assets/icons/notification";
import SearchIcon from "@/assets/icons/search";

const styles: Record<string, CSSProperties> = {
  infoMain: {
    padding: 3,
    backgroundColor: "var(--light-100)",
    border: "0.5px solid var(--border-200)",
    borderRadius: 8,
  },
  infoWrapper: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "4px 10px",
    backgroundColor: "var(--light-200)",
    borderRadius: 6,
  },
  logoText: {
    fontSize: 12,
    fontWeight: 900,
    textTransform: "uppercase",
    letterSpacing: 0.6,
    color: "var(--dark-200)",
  },
  rightIconsWrapper: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  searchWrapper: {
    position: "relative",
    flex: 1,
  },
  input: {
    width: "100%",
    backgroundColor: "var(--light-100)",
    borderRadius: 6,
    padding: "5px 10px 5px 25px",
    fontSize: 9.5,
    fontWeight: 600,
    color: "var(--dark-100)",
    outline: "none",
  },
  searchIcon: {
    position: "absolute",
    top: "50%",
    left: 8,
    transform: "translateY(-50%)",
    width: 12,
    height: 12,
    pointerEvents: "none",
    color: "var(--dark-200)",
    marginTop: 1,
  },
  iconWrapper: {
    padding: 2,
    borderRadius: "50%",
    backgroundColor: "var(--light-100)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  iconBox: {
    padding: 4.5,
    borderRadius: "50%",
    backgroundColor: "var(--light-200)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  },
  iconInner: {
    width: 11, 
    height: 11 
  },
};

const Info: FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") === "dark";
    }
    return false;
  });

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-theme");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark-theme");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <Box style={styles.infoMain}>
      <Box style={styles.infoWrapper}>
        <Text style={styles.logoText}>Readstack</Text>

        <Box style={styles.rightIconsWrapper}>
          <Box style={styles.searchWrapper}>
            <SearchIcon style={styles.searchIcon} />
            <input type="text" placeholder="Search" style={styles.input} />
          </Box>

          <Box style={styles.iconWrapper}>
            <motion.div
              style={styles.iconBox}
              onClick={() => setDarkMode(!darkMode)}
              layout
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={darkMode ? "moon" : "sun"}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {darkMode ? (
                    <MoonIcon
                      width={styles.iconInner.width}
                      height={styles.iconInner.height}
                    />
                  ) : (
                    <SunIcon
                      width={styles.iconInner.width}
                      height={styles.iconInner.height}
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </Box>

          <Box style={styles.iconWrapper}>
            <Box style={styles.iconBox}>
              <NotificationIcon style={styles.iconInner} />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Info;
