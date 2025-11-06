import type { FC, CSSProperties } from "react";
import { NavLink } from "react-router-dom";
import { Box, Avatar } from "@mantine/core";
import { NavLinks, ROUTES } from "@/utils/constants";
import Logo from "@/assets/logo.svg";

const GAP_AFTER_LINKS = [ROUTES.OVERVIEW, ROUTES.BOOKMARKS.ROOT];

const styles: Record<string, CSSProperties> = {
  wrapper: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  topSection: {
    display: "flex",
    flexDirection: "column",
    gap: 15,
  },
  logoBox: {
    display: "flex",
    alignItems: "center",
    padding: 10,
    cursor: "pointer",
  },
  logoIcon: {
    width: 30,
    height: 30,
  },
  navLinks: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    padding: "8px 10px",
    gap: 5,
  },
  userWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 6,
  },
  userInfo: {
    padding: 2,
    borderRadius: 8,
    backgroundColor: "var(--light-100)",
    border: "0.5px solid var(--border-200)",
    cursor: "pointer",
  },
  userImg: {
    width: 30,
    height: 30,
    borderRadius: 8,
    backgroundColor: "var(--light-100)",
    border: "0.5px solid var(--border-200)",
    objectFit: "cover",
  },
};

const getNavLinkStyle = (isActive: boolean): CSSProperties => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 8,
  borderRadius: 6,
  backgroundColor: isActive ? "var(--white)" : "transparent",
  border: isActive ? "0.5px solid var(--border-100)" : "transparent",
  transition: "all 0.2s ease",
});

interface SidebarProps {
  onLogoClick: () => void;
}

const Sidebar: FC<SidebarProps> = ({ onLogoClick }) => {
  return (
    <Box style={styles.wrapper}>
      <Box style={styles.topSection}>
        <Box style={styles.logoBox} onClick={onLogoClick}>
          <img src={Logo} alt="Readstack Logo" style={styles.logoIcon} />
        </Box>

        <Box style={styles.navLinks}>
          {NavLinks.map(({ link, icon: Icon }) => {
            const isGapAfter = GAP_AFTER_LINKS.includes(link);

            return (
              <Box key={link} style={{ marginBottom: isGapAfter ? 12 : 0 }}>
                <NavLink to={link} style={({ isActive }) => getNavLinkStyle(isActive)}>
                  <Icon style={{ width: 12, height: 12 }} />
                </NavLink>
              </Box>
            );
          })}
        </Box>
      </Box>

      <Box style={styles.userWrapper}>
        <Box style={styles.userInfo}>
          <Avatar radius="6" size={30} />
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
