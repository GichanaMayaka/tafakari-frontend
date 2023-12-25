import React from "react";
import { useCookies } from "react-cookie";
import { fetchData } from "../utils";

export default function useProfile() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [posts, setPosts] = React.useState([]);
  const [subreddits, setSubreddits] = React.useState([]);

  const [cookies, setCookies] = useCookies([]);
  const accessToken = cookies.access_token;

  React.useEffect(() => {
    fetchData("/app/profile", "GET", accessToken)
      .then((response) => {
        setPosts(response.posts);
        setSubreddits(response.subreddits);
        setIsLoading(false);
      })
      .catch((error) => console.log(error.status));
  }, []);

  return [posts, subreddits, isLoading];
}
