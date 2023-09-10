import { Card, Text } from "@mantine/core";
import React from "react";
import { useParams } from "react-router-dom";
import AppShellMain from "../components/AppShellMain";
import LoadingScreen from "../components/LoadingScreen";
import PostsList from "../components/PostsList";
import { usePostInSubeddit } from "../hooks/usePosts";
import { useSubreddit } from "../hooks/useSubreddits";

export default function Subreddit() {
  const { id } = useParams();
  const [subreddit, isLoading] = useSubreddit(id);
  const [subredditPosts, postsAreLoading] = usePostInSubeddit(id);

  return (
    <AppShellMain>
      {isLoading ? (
        <LoadingScreen isLoading={isLoading} />
      ) : (
        <Card radius="md" withBorder>
          <Text align="center" component="h1" fw="bolder">
            r/{subreddit.name}
          </Text>
        </Card>
      )}
      {postsAreLoading ? (
        <LoadingScreen isLoading={postsAreLoading} />
      ) : (
        <PostsList posts={subredditPosts} />
      )}
    </AppShellMain>
  );
}
