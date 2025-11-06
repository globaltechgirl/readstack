import { useState, type CSSProperties, type JSX } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";

import { FaGoodreadsG } from "react-icons/fa";
import Instagram from "@/assets/instagram.png";
import Threads from "@/assets/threads.png";

const styles: Record<string, CSSProperties> = {
  container: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: -20,
  },
  dotBox: {
    display: "flex",
    flexDirection: "row",
    gap: 6,
    cursor: "pointer",
    backgroundColor: "var(--dark-300)",
    padding: "10px 15px",
    borderRadius: 20,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: "50%",
    backgroundColor: "var(--dark-200)",
  },
  hoverBox: {
    position: "absolute",
    bottom: 40,
    backgroundColor: "rgba(60, 60, 60, 0.06)",
    backdropFilter: "blur(10px)",
    borderRadius: 60,
    padding: 24,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 16,
    zIndex: 20,
    width: 320,
  },
  socialsRow: {
    display: "flex",
    gap: 30,
    justifyContent: "center",
  },
  socialItem: {
    textAlign: "center",
    cursor: "pointer",
  },
  socialText: {
    fontSize: 12,
    fontWeight: 600,
    color: "var(--dark-50)",
  },
  signUpText: {
    fontSize: 12,
    fontWeight: 600,
    color: "var(--dark-100)",
    textDecoration: "underline",
    textUnderlineOffset: 2,
    cursor: "pointer",
  },
};

const socialIconStyle = (
  bgColor: string,
  padding: number = 10,
  borderRadius: CSSProperties["borderRadius"] = "50%"
): CSSProperties => ({
  borderRadius,
  padding,
  display: "inline-flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: bgColor,
  boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
});

interface SocialItemProps {
  icon: JSX.Element;
  label: string;
  bgColor: string;
  padding?: number;
  borderRadius?: CSSProperties["borderRadius"];
  textMarginTop?: number; 
}

const SocialItem = ({ icon, label, bgColor, padding, borderRadius, textMarginTop, }: SocialItemProps) => (
  <motion.div
    whileHover={{ scale: 1.1, y: -5 }}
    transition={{ type: "spring", stiffness: 300 }}
    style={styles.socialItem}
  >
    <div style={socialIconStyle(bgColor, padding ?? 0, borderRadius ?? "50%"  )}>{icon}</div>
    <Text style={{ ...styles.socialText, marginTop: textMarginTop ?? 0 }}>{label}</Text>
  </motion.div>
);

const Links = () => {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate(); 

  return (
    <div
      style={styles.container}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.div whileTap={{ scale: 0.9 }} style={styles.dotBox}>
        {[0, 1, 2].map((i) => (
          <motion.span key={i} layout style={styles.dot} />
        ))}
      </motion.div>

      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{
              duration: 0.5,
              ease: [0.25, 1, 0.5, 1],
            }}
            style={styles.hoverBox}
          >
            <div style={styles.socialsRow}>
              <SocialItem
                icon={<FaGoodreadsG color="var(--dark-100)" size={16} />}
                label="Goodreads"
                bgColor="#f3ebe8"
                padding={8}
                textMarginTop={6.8}
              />
              <SocialItem
                icon={<img src={Instagram} alt="Instagram" width={33} height={33} />}
                label="Instagram"
                bgColor="#000"
              />
              <SocialItem
                icon={<img src={Threads} alt="Threads" width={33} height={33} />}
                label="Threads"
                bgColor="#1c1c1c"
              />
            </div>

            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              transition={{ type: "spring", stiffness: 300 }}
              onClick={() => navigate("/register")}
            >
              <Text style={styles.signUpText}>
                Sign Up
              </Text>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Links;
