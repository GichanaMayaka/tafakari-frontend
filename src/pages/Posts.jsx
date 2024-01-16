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
      <Text align="left" fw="bolder">
        All Posts
      </Text>
      <CreateAPost />
      {isLoading ? (
        <LoadingScreen isLoading={isLoading} />
      ) : (
        <>
          <Text color="blue" component="h1">
            <PostsList posts={posts} />
          </Text>
        </>
      )}
    </AppShellMain>
  );
}
