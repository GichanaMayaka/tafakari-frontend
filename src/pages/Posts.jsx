import { Text } from "@mantine/core";
import React from "react";
import AppShellMain from "../components/AppShellMain.jsx";
import { fetchData } from "../utils";
import PostsList from "../components/PostsList.jsx";
import LoadingScreen from "../components/LoadingScreen";
import { useNavigate } from "react-router-dom";

export default function Posts() {
  const [posts, setPosts] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const navigation = useNavigate();

  React.useEffect(() => {
    fetchData("/app/posts", "GET")
      .then((response) => {
        setIsLoading(false);
        setPosts(response.posts);
      })
      .catch((error) => {
        switch (error.status) {
          case 404:
            navigation("/not-found");
            break;
          case 500:
            navigation("/server-error");
            break;
          default:
            setIsLoading(true);
        }
      });
  }, []);

  return (
    <AppShellMain>
      {isLoading ? (
        <LoadingScreen isLoading={isLoading} />
      ) : (
        <Text color="blue" component="h1">
          <PostsList posts={posts} />
        </Text>
      )}
    </AppShellMain>
  );
}
