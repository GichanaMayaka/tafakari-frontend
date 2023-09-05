import { Button, Card, Flex, Select, TextInput } from "@mantine/core";
import { Link } from "@mantine/tiptap";
import Highlight from "@tiptap/extension-highlight";
import Placeholder from "@tiptap/extension-placeholder";
import { default as Superscript } from "@tiptap/extension-superscript";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";
import AppShellMain from "./AppShellMain";
import RichTextEditorComponent from "./RichTextEditorComponent.jsx";

export default function PostEditor() {
  const [editorContent, setEditorContent] = React.useState("");
  const [availableSubreddits, setAvailableSubreddits] = React.useState("");

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
    <AppShellMain>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log(editorContent);
        }}
      >
        <Select
          data={[
            { value: "react", label: "React" },
            { value: "ng", label: "Angular" },
            { value: "svelte", label: "Svelte" },
            { value: "vue", label: "Vue" },
          ]}
          mb={10}
          placeholder="Choose a Community"
        ></Select>
        <Card>
          <TextInput placeholder="Title" mb={15}></TextInput>
          <RichTextEditorComponent editor={editor} />
          <Flex justify="flex-end" align="center" direction="row">
            <Button
              disabled={!editorContent}
              variant="gradient"
              gradient={{ from: "indigo", to: "cyan" }}
              type="submit"
            >
              Post
            </Button>
          </Flex>
        </Card>
      </form>
    </AppShellMain>
  );
}
