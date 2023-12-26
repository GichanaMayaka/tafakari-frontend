import { Button, Flex, Stack, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import React from "react";
import { useNavigate } from "react-router-dom";
import useCookieValues from "../hooks/useCookieValues.js";
import useRichTextEditor from "../hooks/useRichTextEditor";
import { postData } from "../utils";
import RichTextEditorComponent from "./RichTextEditorComponent.jsx";

function CommentEditor({ postId }) {
  const [setCookies, removeCookies, { accessToken }] = useCookieValues();
  const navigation = useNavigate();

  const form = useForm({
    initialValues: { editorContent: "" },
    validate: {
      editorContent: (value) =>
        value.length < 2 ? "Comment must have at least 2 letters" : null,
    },
  });

  const [editor, editorContent] = useRichTextEditor(form);

  function handleSubmit(formValues) {
    const payload = { comment: formValues.editorContent };

    postData(`/app/posts/${postId}/comments`, payload, "POST", accessToken)
      .then((response) => {
        window.location.reload();
      })
      .catch((error) => {
        if (error.status === 401 || error.status === 422) {
          navigation("/login");
        }
      });
  }

  return (
    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
      <Stack>
        <Text align="left">Add a Comment</Text>
        <RichTextEditorComponent
          editor={editor}
          {...form.getInputProps("editorContent")}
        />
        <Flex justify="flex-end" align="center" direction="row">
          <Button
            disabled={!editorContent}
            variant="gradient"
            gradient={{ from: "indigo", to: "cyan" }}
            type="submit"
          >
            Post a Comment
          </Button>
        </Flex>
      </Stack>
    </form>
  );
}

export default CommentEditor;
