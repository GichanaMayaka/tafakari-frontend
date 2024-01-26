import { Card, Flex, Grid, Stack, Text } from "@mantine/core";
import {
  IconArrowBigDownLine,
  IconArrowBigUpLine,
  IconEdit,
} from "@tabler/icons-react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useCookieValues from "../hooks/useCookieValues.js";
import { errorHandler, fetchData } from "../utils.js";
import CommentEditor from "./CommentEditor.jsx";
import CommentsList from "./CommentsList.jsx";
import RenderRichText from "./RenderRichText.jsx";

export default function PostCard({ post, showCommentCard }) {
  const [votes, setVotes] = React.useState(post.votes);
  const navigation = useNavigate();
  const [setCookies, removeCookies, { userName, accessToken }] =
    useCookieValues();

  function handleUpvote(postId) {
    const url = `/app/posts/${postId}/upvote`;
    fetchData(url, "GET", accessToken)
      .then((response) => setVotes((prevVotes) => prevVotes + 1))
      .catch((error) => errorHandler(error.status, navigation, false));
  }

  function handleDownvote(postId) {
    const url = `/app/posts/${postId}/downvote`;
    fetchData(url, "GET", accessToken)
      .then((response) => setVotes((prevVotes) => prevVotes - 1))
      .catch((error) => errorHandler(error.status, navigation, false));
  }

  return (
    <>
      <Card align="center" key={post.id} radius="md" withBorder mt={10}>
        <Grid gutter="xl" justify="left">
          <Grid.Col span={1}>
            <Link onClick={(e) => handleUpvote(post.id)} relative>
              <IconArrowBigUpLine size={15} />
            </Link>
            <Text>{votes}</Text>
            <Link onClick={(e) => handleDownvote(post.id)} relative>
              <IconArrowBigDownLine size={15} />
            </Link>
            {post.user.username == userName ? (
              <>
                <br />
                <Link
                  to={`/post/${post.id}/edit`}
                  state={{ subredditId: post.subreddit_id }}
                  relative
                >
                  <IconEdit size={17} />
                </Link>
              </>
            ) : null}
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
                <RenderRichText content={post.text} />
              </Text>
            </Stack>
          </Grid.Col>
        </Grid>
      </Card>
      {showCommentCard ? (
        <Card radius="md" withBorder mt={10}>
          <CommentEditor postId={post.id} />
        </Card>
      ) : null}

      {post.comments?.comments?.length > 0 ? (
        <CommentsList comments={post.comments.comments} showLink={false} />
      ) : null}
    </>
  );
}
