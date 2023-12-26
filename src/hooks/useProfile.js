import React from "react";
import { useCookies } from "react-cookie";
import { errorHandler, fetchData } from "../utils";
import { useNavigate } from "react-router-dom";

export default function useProfile(accessToken) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [posts, setPosts] = React.useState([]);
  const [subreddits, setSubreddits] = React.useState([]);
  const [comments, setComments] = React.useState([]);
  const navigation = useNavigate();

  React.useEffect(() => {
    fetchData("/app/profile", "GET", accessToken)
      .then((response) => {
        setPosts(response.posts);
        setSubreddits(response.subreddits);
        setComments(response.comments);
        setIsLoading(false);
      })
      .catch((error) => errorHandler(error.status, navigation, setIsLoading));
  }, []);

  return [posts, subreddits, comments, isLoading];
}
