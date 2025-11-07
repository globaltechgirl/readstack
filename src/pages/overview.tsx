import { Stack } from "@mantine/core";
import Info from "@/component/layout/info";
import Overviews from "@/component/overview/overviews";

function Overview() {
  return (
    <Stack
      gap="10"
      style={{
        width: "100%",
        height: "100vh",
        padding: 2,
        paddingLeft: 0,
        backgroundColor: "var(--white)",
      }}
    >
      <Info />
      <Overviews />
    </Stack>
  );
}

export default Overview;