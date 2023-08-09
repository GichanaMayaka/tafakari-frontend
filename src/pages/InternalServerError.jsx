import React from "react";
import { Text } from "@mantine/core";
import AppShellMain from "../AppShellMain";

export default function InternalServerError() {
  return (
    <AppShellMain>
      <Text color="red" component="h2">
        There's an error with the Server. It's not you, it's us.
      </Text>
    </AppShellMain>
  );
}
