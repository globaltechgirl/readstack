import { type FC, type CSSProperties, useState } from "react";
import { AppShell, Box } from "@mantine/core";
import { motion, AnimatePresence } from "framer-motion";
import { Outlet } from "react-router-dom";

import Sidebar from "@/component/layout/sidebar";
import Mainbar from "@/component/layout/mainbar";

const PrivateLayout: FC = () => {
  const [mainbarOpen, setMainbarOpen] = useState(true);

  const toggleMainbar = () => setMainbarOpen((prev) => !prev);

  const styles: Record<string, CSSProperties> = {
    appShell: {
      backgroundColor: "var(--light-100)",
      height: "100vh",
      overflow: "hidden",
    },
    navbarWrapper: {
      height: "100%",
      backgroundColor: "var(--light-200)",
      borderRadius: 10,
      padding: 3,
      display: "flex",
      flexDirection: "column" as const,
    },
    navbarMain: {
      flex: 1,
      display: "flex",
      flexDirection: "row" as const,
      alignItems: "stretch",
      backgroundColor: "var(--light-100)",
      borderRadius: 8,
      overflow: "hidden",
      padding: 0,
    },
    sidebarWrapper: {
      width: "25%",
      maxWidth: 55,
      minWidth: 55,
      backgroundColor: "var(--light-100)",
      display: "flex",
      flexDirection: "column" as const,
      justifyContent: "space-between",
    },
    mainbarWrapper: {
      flex: 1,
      backgroundColor: "var(--light-200)",
      border: "0.5px solid var(--border-200)",
      borderRadius: 8,
      display: "flex",
      flexDirection: "column" as const,
      padding: 6,
      overflow: "hidden",
      height: "98%",
      margin: "0 auto",
    },
    mainWrapper: {
      display: "flex",
      flexDirection: "column" as const,
      height: "100%",
      overflow: "hidden",
    },
    mainBox: {
      flex: 1,
      display: "flex",
      flexDirection: "row" as const,
      backgroundColor: "var(--light-100)",
      borderRadius: 10,
      padding: 2,
      gap: 5,
      height: "100%",
    },
    contentWrapper: {
      flex: 1,
      minWidth: 0,
      overflowY: "auto" as const,
      overflowX: "hidden" as const,
      scrollbarWidth: "none",
      msOverflowStyle: "none",
    },
  };

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
        <Box style={styles.navbarWrapper}>
          <Box style={styles.navbarMain}>
            <Box style={styles.sidebarWrapper}>
              <Sidebar onLogoClick={toggleMainbar} />
            </Box>

            {/* ✅ Animated Mainbar (Slide in/out) */}
            <AnimatePresence initial={false}>
              {mainbarOpen && (
                <motion.div
                  key="mainbar"
                  initial={{ x: "-100%", opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: "-100%", opacity: 0 }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                  style={styles.mainbarWrapper}
                >
                  <Mainbar />
                </motion.div>
              )}
            </AnimatePresence>
          </Box>
        </Box>
      </AppShell.Navbar>

      <AppShell.Main style={styles.mainWrapper}>
        <Box style={styles.mainBox}>
          <Box style={styles.contentWrapper}>
            <Outlet />
          </Box>
        </Box>
      </AppShell.Main>
    </AppShell>
  );
};

export default PrivateLayout;
