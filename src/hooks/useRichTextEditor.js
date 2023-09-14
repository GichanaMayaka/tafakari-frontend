import { Link } from "@mantine/tiptap";
import Highlight from "@tiptap/extension-highlight";
import Placeholder from "@tiptap/extension-placeholder";
import { default as Superscript } from "@tiptap/extension-superscript";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";

export default function useRichTextEditor(form) {
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
      const content = editor.getHTML();
      setEditorContent(content);
      form.setFieldValue("editorContent", content);
    },
  });

  return [editor, editorContent];
}