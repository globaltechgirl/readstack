import { Stack } from "@mantine/core";
import Addition from "@/component/bookmark/addition";

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
      <Addition />
    </Stack>
  );
}

export default Bookmarks;