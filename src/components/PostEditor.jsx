import { Button, Card, Flex, Select, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useCookieValues from "../hooks/useCookieValues.js";
import { usePost } from "../hooks/usePosts.js";
import useRichTextEditor from "../hooks/useRichTextEditor.js";
import { useSubreddit } from "../hooks/useSubreddits.js";
import { errorHandler, postData } from "../utils.js";
import AppShellMain from "./AppShellMain";
import LoadingScreen from "./LoadingScreen.jsx";
import RichTextEditorComponent from "./RichTextEditorComponent.jsx";

function PostEditor() {
  const navigation = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  const [setCookies, removeCookies, { accessToken }] = useCookieValues();
  const [post, postIsLoading] = usePost(id);
  const [subreddit, subredditIsLoading] = useSubreddit(
    location.state.subredditId
  );

  const form = useForm({
    initialValues: { title: "", editorContent: "", subredditId: "" },
    validate: {
      title: (value) =>
        value.length < 2 ? "Title must have at least 2 letters" : null,
    },
  });

  React.useEffect(() => {
    if (post && !postIsLoading && !subredditIsLoading) {
      form.setFieldValue("title", post.title);
      form.setFieldValue("subredditId", `r/${subreddit.name}`);
    }
  }, [post, postIsLoading, subreddit]);

  const [editor, editorContent] = useRichTextEditor(form, post.text);

  function handleEditPost(formValues) {
    const payload = {
      subreddit_id: subreddit.id,
      title: formValues.title,
      text: formValues.editorContent,
    };

    postData(`/app/posts/${id}`, payload, "PUT", accessToken)
      .then((response) => {
        navigation("/posts", { replace: true });
      })
      .catch((error) => {
        if (error.status === 401 || error.status === 422) {
          navigation("/login");
        } else {
          errorHandler(error.status, navigation, postIsLoading);
        }
      });
  }

  return (
    <AppShellMain>
      {postIsLoading || subredditIsLoading ? (
        <LoadingScreen isLoading={postIsLoading || subredditIsLoading} />
      ) : (
        <form onSubmit={form.onSubmit((values) => handleEditPost(values))}>
          <Select
            data={[`r/${subreddit.name}`]}
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
      )}
    </AppShellMain>
  );
}

export default PostEditor;
