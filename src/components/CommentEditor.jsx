import { Button, Flex, Stack, Text } from "@mantine/core";
import { Link } from "@mantine/tiptap";
import Highlight from "@tiptap/extension-highlight";
import Placeholder from "@tiptap/extension-placeholder";
import { default as Superscript } from "@tiptap/extension-superscript";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { postData } from "../utils";
import RichTextEditorComponent from "./RichTextEditorComponent.jsx";

function CommentEditor({ postId }) {
  const [editorContent, setEditorContent] = React.useState("");
  const [cookies] = useCookies();
  const navigation = useNavigate();

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link,
      Superscript,
      Underline,
      Highlight,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Placeholder.configure({
        placeholder: `Post as ${
          localStorage.getItem("username") || "Anonymous"
        }`,
      }),
    ],
    onUpdate({ editor }) {
      setEditorContent(editor.getHTML());
    },
  });

  function handleSubmit(postId = postId) {
    const payload = { comment: editorContent };

    postData(
      `/app/posts/${postId}/comments`,
      payload,
      "POST",
      cookies.access_token
    )
      .then((response) => {
        navigation("", { replace: true });
      })
      .catch((error) => {
        if (error.status === 401) {
          navigation("/login");
        }
      });
  }

  return (
    <form onSubmit={() => handleSubmit(postId)}>
      <Stack>
        <Text align="left">Add a Comment</Text>
        <RichTextEditorComponent editor={editor} />
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
