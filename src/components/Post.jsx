import React from "react";
import { Text } from "@mantine/core";

export default function Post({ posts }) {
  return posts.map((post) => {
    return (
      <>
        <Text key={post.id}>{post.title}</Text>
        <Text>{post.votes}</Text>
        {post.comments.map((comment) => {
          return (
            <Text key={comment.id} component="p" italic>
              {comment.comment}
            </Text>
          );
        })}
      </>
    );
  });
}
