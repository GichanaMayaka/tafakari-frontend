import { Text } from "@mantine/core";
import React from "react";
import AppShellMain from "../AppShellMain";
import { fetchData } from "../utils";
import Post from "../components/Post";

export default function Posts() {
  const [posts, setPosts] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    fetchData("/app/posts", "GET")
      .then((response) => {
        setIsLoading(false);
        setPosts(response.posts);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <AppShellMain>
      <Text color="blue" component="h1">
        <Post posts={posts} />
      </Text>
    </AppShellMain>
  );
}
