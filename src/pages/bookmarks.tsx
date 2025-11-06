import { Stack } from "@mantine/core";
import Info from "@/component/layout/info";

function Bookmarks() {
  return (
    <Stack
      gap="xl"
      style={{
        width: "100%",
        height: "100vh",
        padding: 2,
        paddingLeft: 0,
        backgroundColor: "var(--white)",
      }}
    >
      <Info />
    </Stack>
  );
}

export default Bookmarks;