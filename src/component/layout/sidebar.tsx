import { type FC } from "react";
import { NavLink } from "react-router-dom";
import { Box, Avatar } from "@mantine/core";

import { NavLinks, ROUTES } from "@/utils/constants";
import Logo from "@/assets/logo.svg";

const styles = {
  wrapper: { 
    height: "100%", 
    display: "flex", 
    flexDirection: "column" as const, 
    justifyContent: "space-between",
  },
  topSection: { 
    display: "flex", 
    flexDirection: "column" as const, 
    gap: 15,
  },
  logoBox: { 
    display: "flex", 
    alignItems: "center", 
    padding: 10,
  },
  navLinks: { 
    display: "flex", 
    flexDirection: "column" as const, 
    width: "100%", 
    padding: 8,
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
    backgroundColor: "var(--white)", 
    border: "0.5px solid var(--border-100)", 
    cursor: "pointer", 
  },
  userImg: { 
    width: 30, 
    height: 30, 
    borderRadius: 8, 
    backgroundColor: "var(--white)", 
    border: "0.5px solid var(--border-100)", 
    objectFit: "cover" as const, 
  },
};

const Sidebar: FC = () => {
  return (
    <Box style={styles.wrapper}>
      {/* Top Section */}
      <Box style={styles.topSection}>
        <Box style={styles.logoBox}>
          <img src={Logo} alt="FifthLab Logo" style={{ width: 30, height: 20 }} />
        </Box>

        <Box style={styles.navLinks}>
          {NavLinks.map(({ link, icon: Icon }) => {
            const addGapAfter = [ROUTES.OVERVIEW, ROUTES.BOOKMARK.ROOT];
            const isGapAfter = addGapAfter.includes(link);

            return (
              <Box key={link} style={{ marginBottom: isGapAfter ? 12 : 0 }}>
                <NavLink
                  to={link}
                  style={({ isActive }) => ({
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 8,
                    borderRadius: 6,
                    backgroundColor: isActive ? "var(--white)" : "transparent",
                    border: isActive ? "0.5px solid var(--border-100)" : "transparent",
                    transition: "all 0.2s ease",
                  })}
                >
                  <Icon style={{ width: 12, height: 12 }} />
                </NavLink>
              </Box>
            );
          })}
        </Box>
      </Box>

      {/* Bottom Section (Profile Image) */}
      <Box style={styles.userWrapper}>
        <Box style={styles.userInfo}>
          <Avatar radius="6" size={30} />
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;