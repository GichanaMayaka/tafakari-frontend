import { Card, Flex, Grid, Stack, Text } from "@mantine/core";
import { IconArrowBigDownLine, IconArrowBigUpLine } from "@tabler/icons-react";
import React from "react";
import { Link } from "react-router-dom";
import CommentsList from "./CommentsList.jsx";
import EditorComponent from "./EditorComponent.jsx";

export default function PostCard({ post, postId, showCommentCard }) {
  return (
    <>
      <Card align="center" key={postId} radius="md" withBorder mt={10}>
        <Grid gutter="md" justify="left">
          <Grid.Col span={1}>
            <Link to={`/upvote`} relative>
              <IconArrowBigUpLine size={15} />
            </Link>
            <Text>{post.votes}</Text>
            <Link to={`/downvote`} relative>
              <IconArrowBigDownLine size={15} />
            </Link>
          </Grid.Col>
          <Grid.Col span={11}>
            <Flex
              mih={50}
              gap="sm"
              justify="flex-start"
              align="center"
              direction="row"
              wrap="wrap"
            >
              <Text align="left" component="h1" fw="bolder">
                {post.title}
              </Text>
              <Text color="#9d9dbb" fw="normal">
                {" "}
                posted by u/{post.user.username} posted at{" "}
                {post.created_on.toLocaleString()}
              </Text>
            </Flex>
            <Stack h={250}>
              <Text align="left" component="p">
                {post.text}
              </Text>
            </Stack>
          </Grid.Col>
        </Grid>
      </Card>

      {showCommentCard ? (
        <Card radius="md" withBorder mt={10}>
          <EditorComponent />
        </Card>
      ) : null}

      {post.comments?.length > 0 ? (
        <CommentsList comments={post.comments} />
      ) : null}
    </>
  );
}
