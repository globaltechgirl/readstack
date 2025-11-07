import { Stack } from "@mantine/core";
import Info from "@/component/layout/info";

function Bookmarks() {
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
      <Info />
    </Stack>
  );
}

export default Bookmarks;