import React from "react";
import { Image, Text } from "@mantine/core";
import AppShellMain from "../components/AppShellMain.jsx";

export default function InternalServerError() {
  return (
    <AppShellMain>
      <Image
        maw={240}
        radius="md"
        src="../../public/500.jpg"
        alt="server error"
        width="auto"
        fit="fill"
      />
    </AppShellMain>
  );
}
