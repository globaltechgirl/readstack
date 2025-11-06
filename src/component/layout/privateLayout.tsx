import type { FC, CSSProperties } from "react";
import { AppShell, Burger, Box } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { Outlet } from "react-router-dom";

import Logo from "@/assets/logo.svg?react";
import SideBar from "@/component/layout/sidebar";
import Mainbar from "@/component/layout/mainbar";

const PrivateLayout: FC = () => {
  const [opened, { toggle }] = useDisclosure();
  const isSmallScreen = useMediaQuery("(max-width: 768px)");

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
      padding: 2,
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
      padding: 4,
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
      border: "0.5px solid var(--dark-300)",
      borderRadius: 8,
      display: "flex",
      flexDirection: "column" as const,
      padding: 6,
      overflow: "hidden",
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
    <AppShell
      padding={6}
      navbar={{ width: 270, breakpoint: "sm", collapsed: { mobile: !opened } }}
      style={styles.appShell}
    >
      {isSmallScreen && (
        <AppShell.Header
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: 8,
          }}
        >
          <Logo width={25} height={25} />
          <Burger
            opened={opened}
            onClick={toggle}
            size={12}
            color="var(--light-100)"
          />
        </AppShell.Header>
      )}

      <AppShell.Navbar
        p={5}
        pr={0}
        style={{
          borderRight: "none",
          backgroundColor: "var(--light-100)",
        }}
      >
        <Box style={styles.navbarWrapper}>
          {/* Sidebar and Mainbar inside the same box */}
          <Box style={styles.navbarMain}>
            <Box style={styles.sidebarWrapper}>
              <SideBar />
            </Box>

            <Box style={styles.mainbarWrapper}>
              <Mainbar />
            </Box>
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
