import { Text } from "@mantine/core";
import { motion, AnimatePresence } from "framer-motion";

interface HoverItem {
  title: string;
  src: string;
  extra1: string;
  extra2: string;
}

interface HoverProps {
  hoveredItem: HoverItem | null;
}

const styles = {
  container: {
    position: "absolute",
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
    pointerEvents: "none",
  } as React.CSSProperties,
  innerBox: (position: React.CSSProperties) => ({
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    pointerEvents: "none",
    ...position,
  }) as React.CSSProperties,
  sideImage: (side: "left" | "right") => ({
    position: "absolute",
    top: -60,
    [side]: -105,
    opacity: 0.95,
    transformOrigin: "center",
  }) as React.CSSProperties,
  centerImage: {
    zIndex: 20,
    marginTop: 90,
  } as React.CSSProperties,
  textLabel: {
    fontSize: 12,
    fontWeight: 500,
    color: "var(--dark-100)",
    backgroundColor: "var(--dark-300)",
    padding: "10px 15px",
    borderRadius: 20,
    marginTop: 5,
  } as React.CSSProperties,
  positions: {
    Romance: { marginTop: -60, marginRight: 700 },
    Fantasy: { marginTop: -60, marginRight: 200 },
    Thriller: { marginTop: -60, marginLeft: 200 },
    "Self Help": { marginTop: -60, marginLeft: 700 },
  } as Record<string, React.CSSProperties>,
};

interface SideImageProps {
  src: string;
  alt: string;
  side: "left" | "right";
}

const SideImage = ({ src, alt, side }: SideImageProps) => (
  <motion.img
    src={src}
    alt={alt}
    width={300}
    height={300}
    style={styles.sideImage(side)}
    initial={{ opacity: 0, scale: 2, rotate: 0 }}
    animate={{ opacity: 1, scale: 2.2, rotate: side === "left" ? -5 : 5 }}
    exit={{ opacity: 0, scale: 2.3, rotate: 0 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
  />
);

const Hover = ({ hoveredItem }: HoverProps) => {
  if (!hoveredItem) return null;

  const position = styles.positions[hoveredItem.title] || { marginTop: 140 };

  return (
    <AnimatePresence>
      <motion.div
        key={hoveredItem.title}
        initial={{ opacity: 0, scale: 0.8, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 30 }}
        transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
        style={styles.container}
      >
        <motion.div style={styles.innerBox(position)}>
          <SideImage src={hoveredItem.extra1} alt={`${hoveredItem.title}-extra1`} side="left" />

          <motion.img
            src={hoveredItem.src}
            alt={hoveredItem.title}
            width={120}
            height={120}
            style={styles.centerImage}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.5 }}
          />

          <SideImage src={hoveredItem.extra2} alt={`${hoveredItem.title}-extra2`} side="right" />

          <Text style={styles.textLabel}>{hoveredItem.title}</Text>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Hover;
