import { Card } from "@mantine/core";
import React from "react";
import CommentCard from "./CommentCard";
import { useNavigate } from "react-router-dom";

export default function CommentsList({ comments }) {
  const navigation = useNavigate();

  return (
    <Card align="left" radius="md" withBorder mt={10}>
      {comments?.map((comment) =>
        comment?.post_id ? (
          <a
            key={comment.id}
            className="link-no-decoration"
            onClick={(e) =>
              navigation(`/posts/${comment.post_id}/`, { replace: true })
            }
          >
            <CommentCard comment={comment} />
          </a>
        ) : (
          <CommentCard comment={comment} />
        )
      )}
    </Card>
  );
}
