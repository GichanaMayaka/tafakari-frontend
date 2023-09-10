import React from "react";
import { Image, Text } from "@mantine/core";
import AppShellMain from "../components/AppShellMain.jsx";

export default function InternalServerError() {
  return (
    <AppShellMain>
      <Image
        maw={240}
        // mx="auto"
        radius="md"
        src="../../public/505.jpg"
        alt="server error"
        width="auto"
        // height="auto"
        fit="fill"
      />
    </AppShellMain>
  );
}
