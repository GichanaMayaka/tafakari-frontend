import React from "react";
import { Text } from "@mantine/core";

export default function Subreddit({ subreddits }) {
  return subreddits.map((subreddit) => {
    return <Text key={subreddit.id}>{subreddit.name}</Text>;
  });
}
