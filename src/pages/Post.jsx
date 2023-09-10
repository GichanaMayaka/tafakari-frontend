import { LoadingOverlay } from "@mantine/core";
import React from "react";
import { useParams } from "react-router-dom";
import AppShellMain from "../components/AppShellMain.jsx";
import PostCard from "../components/PostCard";
import { usePost } from "../hooks/usePosts.js";

function Post() {
  const { id } = useParams();
  const [post, isLoading] = usePost(id);

  return (
    <AppShellMain>
      {isLoading ? (
        <LoadingOverlay visible={isLoading} />
      ) : (
        <PostCard post={post} showCommentCard={true} />
      )}
    </AppShellMain>
  );
}

export default Post;
