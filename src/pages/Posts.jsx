import { Text } from "@mantine/core";
import React from "react";
import AppShellMain from "../components/AppShellMain.jsx";
import CreateAPost from "../components/CreateAPost.jsx";
import LoadingScreen from "../components/LoadingScreen";
import PostsList from "../components/PostsList.jsx";
import usePosts from "../hooks/usePosts.js";

export default function Posts() {
  const [posts, isLoading] = usePosts();

  return (
    <AppShellMain>
      {isLoading ? (
        <LoadingScreen isLoading={isLoading} />
      ) : (
        <>
          <CreateAPost />
          <Text color="blue" component="h1">
            <PostsList posts={posts} />
          </Text>
        </>
      )}
    </AppShellMain>
  );
}
