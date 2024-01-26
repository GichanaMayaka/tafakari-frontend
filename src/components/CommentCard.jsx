import { Flex, Stack, Text } from "@mantine/core";
import { IconArrowBigDownLine, IconArrowBigUpLine } from "@tabler/icons-react";
import { default as React } from "react";
import { Link } from "react-router-dom";
import RenderRichText from "./RenderRichText";

export default function CommentCard({ comment }) {
  return (
    <Stack justify="left" mb={30} spacing="sm" key={comment.id}>
      <Text key={comment.id}>
        u/{comment.user.username} .{" "}
        {Math.round((new Date() - new Date(comment.created_on)) / (1000 * 60))}{" "}
        mins ago
      </Text>
      <Flex direction="row" justify="flex-start" align="center" gap="sm">
        <Text key={comment.id}>
          <RenderRichText content={comment.comment} />
        </Text>
      </Flex>
      <Flex direction="row" justify="flex-start" align="center" gap="sm">
        <Link to={`#`} relative>
          <IconArrowBigUpLine size={15} />
        </Link>
        <Text key={comment.id}>{comment.votes}</Text>
        <Link to={`#`} relative>
          <IconArrowBigDownLine size={15} />
        </Link>
      </Flex>
    </Stack>
  );
}
