import { Text } from "@mantine/core";
import React from "react";
import { useNavigate } from "react-router-dom";
import AppShellMain from "../components/AppShellMain.jsx";
import LoadingScreen from "../components/LoadingScreen";
import Subreddit from "../components/Subreddit";
import { fetchData } from "../utils";

export default function Subreddits() {
  const [subreddits, setSubreddits] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const navigation = useNavigate();

  React.useEffect(() => {
    fetchData("/app/subreddits")
      .then((response) => {
        setIsLoading(false);
        setSubreddits(response.subreddits);
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
        <Text color="blue" component="h1" variant="gradient">
          <Subreddit subreddits={subreddits} />
        </Text>
      )}
    </AppShellMain>
  );
}
