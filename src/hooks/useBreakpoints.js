import { useDisclosure, useViewportSize } from "@mantine/hooks";
import React from "react";

function useBreakpoints() {
  const [opened, { toggle, open, close }] = useDisclosure(false);
  const { height, width } = useViewportSize();

  React.useEffect(() => {
    if (width < 650) {
      open();
    } else {
      close();
    }
  }, [width]);

  return [opened, toggle];
}

export default useBreakpoints;
