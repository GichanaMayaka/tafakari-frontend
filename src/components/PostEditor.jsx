import { Button, Card, Flex, Select, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import React from "react";
import { useNavigate } from "react-router-dom";
import useCookieValues from "../hooks/useCookieValues.js";
import useRichTextEditor from "../hooks/useRichTextEditor";
import { useSubreddits } from "../hooks/useSubreddits";
import { postData } from "../utils";
import AppShellMain from "./AppShellMain";
import RichTextEditorComponent from "./RichTextEditorComponent.jsx";

export default function PostEditor() {
  const [setCookies, removeCookies, { accessToken }] = useCookieValues();
  const navigation = useNavigate();

  const [availableSubreddits] = useSubreddits([
    // Initialize with a placeholder value
    {
      id: 0,
      value: "Loading...",
      label: "Loading...",
    },
  ]);

  const form = useForm({
    initialValues: { title: "", editorContent: "", subredditId: "" },
    validate: {
      title: (value) =>
        value.length < 2 ? "Title must have at least 2 letters" : null,
    },
  });

  const [editor, editorContent] = useRichTextEditor(form);

  function handleCreatePost(formValues) {
    const payload = {
      subreddit_id: formValues.subredditId,
      title: formValues.title,
      text: formValues.editorContent,
    };

    postData("/app/posts", payload, "POST", accessToken)
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
      <form onSubmit={form.onSubmit((values) => handleCreatePost(values))}>
        <Select
          data={availableSubreddits}
          mb={10}
          placeholder="Choose a Community"
          searchable
          nothingFound="No options"
          {...form.getInputProps("subredditId")}
        />
        <Card>
          <TextInput
            placeholder="Title"
            mb={15}
            {...form.getInputProps("title")}
          ></TextInput>
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
              Post
            </Button>
          </Flex>
        </Card>
      </form>
    </AppShellMain>
  );
}
