import React from "react";
import { useNavigate } from "react-router-dom";
import { errorHandler, fetchData } from "../utils.js";

export function useSubreddits(
  initial = {
    id: 0,
    value: "Loading...",
    label: "Loading...",
  }
) {
  const [subreddits, setSubreddits] = React.useState(initial);
  const [isLoading, setIsLoading] = React.useState(true);
  const navigation = useNavigate();

  React.useEffect(() => {
    fetchData("/app/subreddits")
      .then((response) => {
        setSubreddits(
          response.subreddits.map((subs) => {
            return {
              id: subs.id,
              value: subs.id,
              label: `r/${subs.name}`,
            };
          })
        );
      })
      .catch((error) => {
        errorHandler(error.status, navigation, isLoading);
      });
  }, []);

  return [subreddits];
}

export function useSubreddit(id) {
  const navigation = useNavigate();

  const [subreddit, setSubreddit] = React.useState({
    name: "Loading",
  });
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    fetchData(`/app/subreddits/${id}`, "GET")
      .then((response) => {
        setSubreddit(response);
        setIsLoading(false);
      })
      .catch((error) => errorHandler(error.status, navigation, setIsLoading));
  }, [id]);

  return [subreddit, isLoading];
}
