import React from "react";
import AppShellMain from "../components/AppShellMain";
import { Text } from "@mantine/core";
import CreateSubredditCommunity from "../components/CreateSubredditCommunity";

export default function CreateSubreddit() {
  return (
    <AppShellMain>
      <CreateSubredditCommunity />
    </AppShellMain>
  );
}
