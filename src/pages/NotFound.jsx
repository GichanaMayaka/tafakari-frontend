import { Image } from "@mantine/core";
import React from "react";
import AppShellMain from "../components/AppShellMain.jsx";

export default function NotFound() {
  return (
    <AppShellMain>
      <Image
        maw={240}
        // mx="auto"
        radius="md"
        src="../../public/404.jpg"
        alt="server error"
        width="auto"
        height="auto"
        fit="fill"
      />
    </AppShellMain>
  );
}
