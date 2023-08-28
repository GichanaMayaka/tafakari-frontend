import { Card, Grid, Stack, Text } from "@mantine/core";
import { IconArrowBigDownLine, IconArrowBigUpLine } from "@tabler/icons-react";
import React from "react";
import { Link } from "react-router-dom";

export default function PostCard({ post, postId }) {
  return (
    <Card align="center" key={ postId } radius="md" withBorder mt={ 10 }>
      <Grid gutter="md" justify="left">
        <Grid.Col span={ 1 }>
          <Link to={ `/upvote` } relative>
            <IconArrowBigUpLine size={ 15 }/>
          </Link>
          <Text>{ post.votes }</Text>
          <IconArrowBigDownLine size={ 15 }/>
        </Grid.Col>
        <Grid.Col span={ 11 }>
          <Stack h={ 80 }>
            <Text align="left" component="h1" fw="bolder">
              { post.title }
              <Text color="#01010a" fw="normal">
                { " " }
                posted by u/{ post.user.username } posted at { post.created_on.toLocaleString() }
              </Text>
            </Text>
          </Stack>
          <Stack h={ 250 }>
            <Text align="left" component="p">
              { post.text }
            </Text>
          </Stack>
          {/*{ post.comments ?*/ }
          {/*  <Stack>{ post.comments }</Stack> :*/ }
          {/*  null*/ }
          {/*}*/ }
        </Grid.Col>
      </Grid>
    </Card>
  );
}
