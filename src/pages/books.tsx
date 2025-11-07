import { Stack } from "@mantine/core";
import All from "@/component/books/all";

function Books() {
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
      <All />
    </Stack>
  );
}

export default Books;