import React from "react";
import { useNavigate } from "react-router-dom";
import { fetchData, errorHandler } from "../utils";

export default function usePosts() {
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
        errorHandler(error.status, navigation, setIsLoading);
      });
  }, []);

  return [posts, isLoading];
}

export function usePost(id) {
  const [post, setPost] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const navigation = useNavigate();

  React.useEffect(() => {
    fetchData(`/app/posts/${id}`)
      .then((response) => {
        setPost(response);
        setIsLoading(false);
      })
      .catch((error) => {
        errorHandler(error.status, navigation, setIsLoading);
      });
  }, []);

  return [post, isLoading];
}
