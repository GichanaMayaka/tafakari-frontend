import { Card } from "@mantine/core";
import React from "react";
import CommentCard from "./CommentCard";

export default function CommentsList({ comments }) {
  return (
    <Card align="left" radius="md" withBorder mt={10}>
      {comments.map((comment) => (
        <CommentCard comment={comment} />
      ))}
    </Card>
  );
}
