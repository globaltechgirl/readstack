import { Stack } from "@mantine/core";
import Fiction from "@/component/shelves/fiction";

function Shelves() {
  return (
    <Stack
      gap="10"
      style={{
        width: "100%",
        height: "100vh",
        padding: 2,
        paddingLeft: 0,
        backgroundColor: "var(--light-100)",
      }}
    >
      <Fiction />
    </Stack>
  );
}

export default Shelves;