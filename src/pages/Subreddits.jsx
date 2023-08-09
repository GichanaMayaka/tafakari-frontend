import { Text } from "@mantine/core";
import React from "react";
import AppShellMain from "../AppShellMain";
import { fetchData } from "../utils";
import Subreddit from "../components/Subreddit";

export default function Subreddits() {
  const [subreddits, setSubreddits] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    fetchData("/app/subreddits")
      .then((response) => {
        setIsLoading(false);
        setSubreddits(response.subreddits);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <AppShellMain>
      <Text color="blue" component="h1" variant="gradient">
        {isLoading ? (
          <Text>Loading</Text>
        ) : (
          <Subreddit subreddits={subreddits} />
        )}
      </Text>
    </AppShellMain>
  );
}
