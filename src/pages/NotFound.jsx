import { Image } from "@mantine/core";
import React from "react";
import AppShellMain from "../components/AppShellMain.jsx";

export default function NotFound() {
  return (
    <AppShellMain>
      <Image
        maw={240}
        radius="md"
        src="../../public/404.jpg"
        alt="not found"
        width="auto"
        height="auto"
        fit="fill"
      />
    </AppShellMain>
  );
}
