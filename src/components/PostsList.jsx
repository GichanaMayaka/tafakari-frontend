import React from "react";
import { useNavigate } from "react-router-dom";
import PostCard from "./PostCard";

export default function PostsList({ posts }) {
  const navigation = useNavigate();

  return posts.map((post) => {
    return (
      <>
        <a onClick={(e) => navigation(`${post.id}`)} key={post.id}>
          <PostCard post={post} showCommentCard={false} />
        </a>
      </>
    );
  });
}
