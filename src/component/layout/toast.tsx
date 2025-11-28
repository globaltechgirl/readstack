import { FC, CSSProperties } from "react";
import { Box, Text } from "@mantine/core";

interface ToastProps {
  message: string;
  status: "success" | "error";
}

const styles: Record<string, CSSProperties> = {
  outerBox: {
    position: "fixed",
    bottom: 20,
    right: 25,
    width: 200,
    cursor: "pointer",
    zIndex: 9999,
  },
  innerBox: {
    width: "100%",
    padding: 2,
    backgroundColor: "var(--light-200)",
    border: "0.5px solid var(--border-200)",
    borderRadius: 6,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",   
  },
  text: {
    textAlign: "center",
    width: "100%",
    fontSize: 12,
    fontWeight: 600,
    color: "var(--dark-200)",
    padding: 14,
    borderRadius: 5,
    backgroundColor: "var(--light-100)",
  },
};

const Toast: FC<ToastProps> = ({ message }) => {
  return (
    <Box style={styles.outerBox}>
      <Box style={styles.innerBox}>
        <Text style={styles.text}>
          {message}
        </Text>
      </Box>
    </Box>
  );
};

export default Toast;
