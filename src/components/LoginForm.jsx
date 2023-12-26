import { Button, Group, PasswordInput, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import React from "react";
import { useNavigate } from "react-router-dom";
import useCookieValues from "../hooks/useCookieValues.js";
import { postData } from "../utils.js";

export default function LoginForm() {
  const [failedAuth, setFailedAuth] = React.useState(true);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [setCookies] = useCookieValues();

  const navigation = useNavigate();

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      username: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) => (value.length < 8 ? "Password is too Short" : null),
      username: (value) => (value.length <= 2 ? "Username is too short" : null),
    },
  });

  function handleSubmit(url, payload, method) {
    postData(url, payload, method)
      .then((response) => {
        let expires = new Date();
        expires.setTime(expires.getTime() + response.expires * 1000);

        // Set cookies for username, and access token
        setCookies("access_token", response.access_token, {
          path: "/",
          expires,
        });
        setCookies("username", response.username, {
          path: "/",
          expires,
        });
        navigation("/posts");
      })
      .catch((error) => {
        switch (error.status) {
          case 401:
            setFailedAuth(true);
            setErrorMessage("Unrecognised credentials");
            break;
          case 500:
            navigation("/server-error");
            break;
          default:
            setFailedAuth(true);
            setErrorMessage("Failed Authentication");
        }
      });
  }

  return (
    <form
      onSubmit={form.onSubmit((values) =>
        handleSubmit("app/auth/login", values, "POST")
      )}
    >
      {failedAuth ? <Text c="red">{errorMessage}</Text> : null}
      <TextInput
        label="username"
        placeholder="Username"
        {...form.getInputProps("username")}
      />
      <TextInput
        type="email"
        label="Email"
        placeholder="your@email.com"
        {...form.getInputProps("email")}
      />
      <PasswordInput
        label="Password"
        placeholder="Password"
        {...form.getInputProps("password")}
      />

      <Group position="right" mt="md">
        <Button
          type="submit"
          variant="gradient"
          gradient={{ from: "indigo", to: "turquoise" }}
        >
          Submit
        </Button>
      </Group>
    </form>
  );
}
