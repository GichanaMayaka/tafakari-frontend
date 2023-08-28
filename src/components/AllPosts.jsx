import React from "react";
import PostCard from "./PostCard";
import { useNavigate } from "react-router-dom";

export default function AllPosts({ posts }) {
  const navigation = useNavigate();

  return posts.map((post) => {
    return (
      <>
        <a onClick={ (e) => navigation(`${ post.id }`) }>
          <PostCard post={ post } postId={ post.id }/>
        </a>
      </>
    );
  });
}
