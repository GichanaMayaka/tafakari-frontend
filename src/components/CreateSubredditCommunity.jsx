import { Button, Card, Flex, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import React from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import useRichTextEditor from "../hooks/useRichTextEditor.js";
import { postData } from "../utils.js";
import RichTextEditorComponent from "./RichTextEditorComponent.jsx";

function CreateSubredditCommunity() {
  const [cookies, setCookies] = useCookies([]);
  const form = useForm({
    initialValues: { name: "", editorContent: "" },
    validate: {
      name: (value) =>
        value.length < 2 ? "Name must have at least 2 letters" : null,
      editorContent: (value) =>
        value.length < 2 ? "Description must have at least 2 letters" : null,
    },
  });
  const [editor, editorContent] = useRichTextEditor(form);
  const navigation = useNavigate();

  function handleCreateSubredditCommunity(formValues) {
    const payload = {
      name: formValues.name,
      description: formValues.editorContent,
    };

    if (cookies.access_token) {
      postData("/app/subreddits", payload, "POST", cookies.access_token)
        .then((response) => console.log(response))
        .catch((error) => console.error(error));

      setTimeout(() => {
        navigation("/subreddits");
      }, 60_000);
    } else {
      alert("Can't post as Anonymous. Please Sign in to create a community");
    }
  }

  return (
    <form
      onSubmit={form.onSubmit((values) =>
        handleCreateSubredditCommunity(values)
      )}
    >
      <Card>
        <TextInput
          placeholder="Subreddit Name"
          mb={15}
          {...form.getInputProps("name")}
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
  );
}

export default CreateSubredditCommunity;
