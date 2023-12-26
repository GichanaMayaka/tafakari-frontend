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
import { useDebounce } from "use-debounce";
import useCookieValues from "./useCookieValues";

export default function useRichTextEditor(form) {
  const [editorContent, setEditorContent] = React.useState("");
  const [content] = useDebounce(editorContent, 1000);
  const [setCookies, removeCookies, { userName }] = useCookieValues();

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link,
      Superscript,
      Underline,
      Highlight,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Placeholder.configure({
        placeholder: `Post as ${userName || "Anonymous"}`,
      }),
    ],
    onUpdate({ editor }) {
      const content = editor.getHTML();
      setEditorContent(content);
      form.setFieldValue("editorContent", content);
    },
  });

  return [editor, content];
}
