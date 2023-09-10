import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import AppShellMain from "../components/AppShellMain";
import { useSubreddit } from "../hooks/useSubreddits";
import LoadingScreen from "../components/LoadingScreen";

export default function Subreddit() {
  const { id } = useParams();
  const [subreddit, isLoading] = useSubreddit(id);

  return (
    <AppShellMain>
      {isLoading ? (
        <LoadingScreen isLoading={isLoading} />
      ) : (
        <>Subreddit {subreddit.name}</>
      )}
    </AppShellMain>
  );
}
