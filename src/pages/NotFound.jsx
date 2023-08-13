import { Text } from "@mantine/core";
import React from "react";
import AppShellMain from "../AppShellMain";

export default function NotFound() {
  return (
    <AppShellMain>
      <Text c="red" component="h1">
        Page Not Found
      </Text>
    </AppShellMain>
  );
}
