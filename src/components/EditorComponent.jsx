import { Button, Flex, Stack, Text } from "@mantine/core";
import { Link, RichTextEditor } from "@mantine/tiptap";
import Highlight from "@tiptap/extension-highlight";
import Placeholder from "@tiptap/extension-placeholder";
import { default as Superscript } from "@tiptap/extension-superscript";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";

function EditorComponent({ postId }) {
  const [editorContent, setEditorContent] = React.useState("");

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

  return (
    <form
      onSubmit={() => {
        console.log(postId);
      }}
    >
      <Stack>
        <Text align="left">Add a Comment</Text>
        <RichTextEditor editor={editor}>
          <RichTextEditor.Toolbar sticky stickyOffset={60}>
            <RichTextEditor.ControlsGroup>
              <RichTextEditor.Bold />
              <RichTextEditor.Italic />
              <RichTextEditor.Underline />
              <RichTextEditor.Strikethrough />
              <RichTextEditor.ClearFormatting />
              <RichTextEditor.Highlight />
              <RichTextEditor.Code />
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>
              <RichTextEditor.H1 />
              <RichTextEditor.H2 />
              <RichTextEditor.H3 />
              <RichTextEditor.H4 />
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>
              <RichTextEditor.Blockquote />
              <RichTextEditor.Hr />
              <RichTextEditor.BulletList />
              <RichTextEditor.OrderedList />
              <RichTextEditor.Subscript />
              <RichTextEditor.Superscript />
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>
              <RichTextEditor.Link />
              <RichTextEditor.Unlink />
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>
              <RichTextEditor.AlignLeft />
              <RichTextEditor.AlignCenter />
              <RichTextEditor.AlignJustify />
              <RichTextEditor.AlignRight />
            </RichTextEditor.ControlsGroup>
          </RichTextEditor.Toolbar>

          <RichTextEditor.Content h={150} autoFocus />
        </RichTextEditor>
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

export default EditorComponent;
