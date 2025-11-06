import { type FC, type CSSProperties, useState } from "react";
import { AppShell, Box } from "@mantine/core";
import { motion, AnimatePresence } from "framer-motion";
import { Outlet } from "react-router-dom";

import Sidebar from "@/component/layout/sidebar";
import Mainbar from "@/component/layout/mainbar";

const SIDEBAR_WIDTH = 55;
const MAINBAR_WIDTH = 200;
const NAVBAR_PADDING = 10;
const TRANSITION_DURATION = 0.3;

const styles: Record<string, CSSProperties> = {
  appShell: {
    backgroundColor: "var(--light-100)",
    height: "100vh",
    overflow: "hidden",
    display: "flex",
    flexDirection: "row",
  },
  navbarWrapper: {
    position: "relative",
    display: "flex",
    flexDirection: "row",
    height: "100%",
    zIndex: 2,
    backgroundColor: "var(--light-200)",
    borderRadius: 10,
    padding: 3,
    transition: `width ${TRANSITION_DURATION}s ease-in-out`,
  },
  navbarMain: {
    flex: 1,
    display: "flex",
    alignItems: "stretch",
    backgroundColor: "var(--light-100)",
    borderRadius: 8,
    overflow: "hidden",
    position: "relative",
  },
  sidebar: {
    width: SIDEBAR_WIDTH,
    backgroundColor: "var(--light-100)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    zIndex: 3,
  },
  mainbar: {
    position: "absolute",
    left: SIDEBAR_WIDTH + 2,
    top: 2,
    bottom: 0,
    width: MAINBAR_WIDTH,
    backgroundColor: "var(--light-200)",
    border: "0.5px solid var(--border-200)",
    borderRadius: 8,
    display: "flex",
    flexDirection: "column",
    padding: 6,
    overflow: "hidden",
    zIndex: 2,
    height: "99.2%",
  },
  mainWrapper: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    backgroundColor: "var(--light-100)",
    borderRadius: 10,
    height: "100%",
    transition: `margin-left ${TRANSITION_DURATION}s ease-in-out`,
  },
  mainContent: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    backgroundColor: "var(--light-100)",
    borderRadius: 10,
    padding: "4px 4px 8px 14px",
    gap: 5,
    height: "100%",
  },
  contentArea: {
    flex: 1,
    minWidth: 0,
    overflowY: "auto",
    overflowX: "hidden",
    scrollbarWidth: "none",
    msOverflowStyle: "none",
  },
};

const PrivateLayout: FC = () => {
  const [mainbarOpen, setMainbarOpen] = useState(true);

  const toggleMainbar = () => setMainbarOpen((prev) => !prev);

  const navbarWidth = mainbarOpen
    ? SIDEBAR_WIDTH + MAINBAR_WIDTH + NAVBAR_PADDING
    : SIDEBAR_WIDTH;

  const mainMarginLeft = navbarWidth;

  return (
    <AppShell padding={6} style={styles.appShell}>
      <AppShell.Navbar
        p={5}
        pr={0}
        style={{
          borderRight: "none",
          backgroundColor: "var(--light-100)",
        }}
      >
        <Box style={{ ...styles.navbarWrapper, width: navbarWidth }}>
          <Box style={styles.navbarMain}>
            <Box style={styles.sidebar}>
              <Sidebar onLogoClick={toggleMainbar} />
            </Box>

            <AnimatePresence initial={false}>
              {mainbarOpen && (
                <motion.div
                  key="mainbar"
                  initial={{ x: -MAINBAR_WIDTH, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -MAINBAR_WIDTH, opacity: 0 }}
                  transition={{ duration: TRANSITION_DURATION, ease: "easeInOut" }}
                  style={styles.mainbar}
                >
                  <Mainbar onSidebarClick={toggleMainbar} />
                </motion.div>
              )}
            </AnimatePresence>
          </Box>
        </Box>
      </AppShell.Navbar>

      <Box style={{ ...styles.mainWrapper, marginLeft: mainMarginLeft }}>
        <Box style={styles.mainContent}>
          <Box style={styles.contentArea}>
            <Outlet />
          </Box>
        </Box>
      </Box>
    </AppShell>
  );
};

export default PrivateLayout;
