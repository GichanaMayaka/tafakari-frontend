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
import { fetchData, postData } from "../utils";
import AppShellMain from "./AppShellMain";
import RichTextEditorComponent from "./RichTextEditorComponent.jsx";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export default function PostEditor() {
  const [cookies] = useCookies();
  const navigation = useNavigate();
  const [availableSubreddits, setAvailableSubreddits] = React.useState([
    // Initialize with a placeholder value
    {
      id: 0,
      value: "Loading...",
      label: "Loading...",
    },
  ]);

  const [title, setTitle] = React.useState("");
  const [editorContent, setEditorContent] = React.useState("");
  const [subredditId, setSubredditId] = React.useState();

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

  React.useEffect(() => {
    fetchData("/app/subreddits")
      .then((response) => {
        setAvailableSubreddits(
          response.subreddits.map((subs) => {
            return {
              id: subs.id,
              value: subs.id,
              label: `r/${subs.name}`,
            };
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function handleCreatePost(event) {
    event.preventDefault();

    const payload = {
      subreddit_id: subredditId,
      title: title,
      text: editorContent,
    };

    postData("/app/posts", payload, "POST", cookies.access_token)
      .then((response) => {
        navigation("/posts");
      })
      .catch((error) => {
        if (error.status === 401 || error.status === 422) {
          navigation("/login");
        }
      });
  }

  return (
    <AppShellMain>
      <form onSubmit={handleCreatePost}>
        <Select
          data={availableSubreddits}
          mb={10}
          placeholder="Choose a Community"
          searchable
          nothingFound="No options"
          onChange={setSubredditId}
        />
        <Card>
          <TextInput
            placeholder="Title"
            mb={15}
            onChange={(e) => setTitle(e.target.value)}
          ></TextInput>
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
