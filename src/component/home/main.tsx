import { Stack, Text, Box } from "@mantine/core";
import { useState, useRef, useEffect, type CSSProperties } from "react";
import Hover from "./hover";
import Links from "./links";

import RomanceIcon from "@/assets/romance.svg";
import Romance1 from "@/assets/romance1.svg";
import Romance2 from "@/assets/romance2.svg";
import FantasyIcon from "@/assets/fantasy.svg";
import Fantasy1 from "@/assets/fantasy1.svg";
import Fantasy2 from "@/assets/fantasy2.svg";
import ThrillerIcon from "@/assets/thriller.svg";
import Thriller1 from "@/assets/thriller1.svg";
import Thriller2 from "@/assets/thriller2.svg";
import SelfHelpIcon from "@/assets/selfhelp.svg";
import SelfHelp1 from "@/assets/selfhelp1.svg";
import SelfHelp2 from "@/assets/selfhelp2.svg";

const genres = [
  { src: RomanceIcon, title: "Romance", extra1: Romance1, extra2: Romance2 },
  { src: FantasyIcon, title: "Fantasy", extra1: Fantasy1, extra2: Fantasy2 },
  { src: ThrillerIcon, title: "Thriller", extra1: Thriller1, extra2: Thriller2 },
  { src: SelfHelpIcon, title: "Self Help", extra1: SelfHelp1, extra2: SelfHelp2 },
];

const hoverShifts: Record<string, string> = {
  Romance: "translate(-15px, -10px) scale(1.25)",
  Fantasy: "translate(15px, -10px) scale(1.25)",
  Thriller: "translate(-10px, 10px) scale(1.25)",
  "Self Help": "translate(10px, 10px) scale(1.25)",
};

const styles: Record<string, CSSProperties> = {
  mainContainer: {
    width: "100%",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    textAlign: "center",
    backgroundColor: "var(--light-200)",
    overflow: "visible",
    position: "relative",
    padding: "100px 0 50px 0",
  },
  dotsBg: {
    position: "absolute",
    inset: 0,
    backgroundColor: "var(--light-200)",
    backgroundImage: "radial-gradient(var(--dark-300) 0.8px, transparent 0.8px)",
    backgroundSize: "16px 16px",
    borderRadius: 100,
    zIndex: 0,
  },
  fadeOverlay: {
    position: "absolute",
    inset: 0,
    background:
      "radial-gradient(circle, rgba(255,255,255,0) 60%, var(--light-200) 100%)",
    zIndex: 1,
    pointerEvents: "none",
  },
  globalBlurOverlay: {
    position: "absolute",
    inset: 0,
    zIndex: 5,
    pointerEvents: "none",
    background: "rgba(255,255,255,0.15)",
    backdropFilter: "blur(4px)",
    transition: "opacity 0.35s ease",
    opacity: 0,
  },
  mainStack: {
    position: "relative",
    zIndex: 2,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    gap: 80,
  },
  heading: {
    fontSize: 35,
    fontWeight: 700,
    color: "var(--dark-200)",
    fontFamily: "'Pangolin', cursive",
    width: 350,
    lineHeight: 1.3,
    transform: "rotate(-5deg)",
    display: "inline-block",
  },
  imgWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 80,
    flexWrap: "wrap",
    position: "relative",
    zIndex: 3,
  },
  genreBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    position: "relative",
    transition: "transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)",
  },
  genreTitle: {
    fontSize: 12,
    fontWeight: 600,
    color: "var(--dark-100)",
    backgroundColor: "var(--dark-300)",
    padding: "6px 15px",
    borderRadius: 20,
    marginTop: 16,
  },
  text: {
    fontSize: 14,
    fontWeight: 550,
    color: "var(--dark-200)",
    textAlign: "center",
    width: 500,
    lineHeight: 1.6,
  },
};

interface GenreItemProps {
  item: typeof genres[0];
  hovered: string | null;
  onEnter: (title: string) => void;
}

const GenreItem = ({ item, hovered, onEnter }: GenreItemProps) => {
  const isHovered = hovered === item.title;

  return (
    <Box
      style={{
        ...styles.genreBox,
        opacity: hovered && !isHovered ? 0.6 : 1,
        transform: isHovered ? hoverShifts[item.title] || "scale(1.25)" : "scale(1)",
      }}
      onMouseEnter={() => onEnter(item.title)}
    >
      <img src={item.src} alt={item.title} width={150} height={150} />
      <Text style={styles.genreTitle}>{item.title}</Text>
    </Box>
  );
};

const BackgroundOverlays = ({ hovered }: { hovered: string | null }) => (
  <>
    <Box style={styles.dotsBg} />
    <Box style={styles.fadeOverlay} />
    <Box style={{ ...styles.globalBlurOverlay, opacity: hovered ? 1 : 0 }} />
  </>
);

const Main = () => {
  const [hovered, setHovered] = useState<string | null>(null);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleEnter = (title: string) => {
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    setHovered(title);
  };

  const handleLeave = () => {
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => setHovered(null), 100);
  };

  const hoveredItem = genres.find((g) => g.title === hovered);

  return (
    <Box style={styles.mainContainer}>
      <BackgroundOverlays hovered={hovered} />

      <Stack style={styles.mainStack}>
        <Text style={styles.heading}>Welcome to my corner on the internet :)</Text>

        <Box style={styles.imgWrapper} onMouseLeave={handleLeave}>
          {genres.map((item) => (
            <GenreItem key={item.title} item={item} hovered={hovered} onEnter={handleEnter} />
          ))}
        </Box>

        <Text style={styles.text}>
          Welcome to Readstack - where book lovers, story chasers, and page flippers unite. 
          Get comfy, explore the stacks, and fall headfirst into stories that feel like home.
          Every page here is a chance to discover something new and connect with a community that gets your kind of book obsession.
        </Text>

        <Links />
      </Stack>

      <Hover hoveredItem={hoveredItem || null} />
    </Box>
  );
};

export default Main;
