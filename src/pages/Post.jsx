import React from 'react';
import { fetchData } from "../utils.js";
import { useNavigate, useParams } from "react-router-dom";
import AppShellMain from "../components/AppShellMain.jsx";
import PostCard from "../components/PostCard";
import { LoadingOverlay } from "@mantine/core";

function Post({ props }) {
  const [post, setPost] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(true);

  const { id } = useParams();
  const navigation = useNavigate();

  React.useEffect(() => {
    fetchData(`/app/posts/${ id }`).then(response => {
        setPost(response);
        setIsLoading(false);
      }
    ).catch((error) => {
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
  });

  return (
    <AppShellMain>
      { isLoading ? <LoadingOverlay visible={ isLoading }/> :
        <PostCard post={ post } postId={ post.id }/>
      }
    </AppShellMain>
  );
}

export default Post;