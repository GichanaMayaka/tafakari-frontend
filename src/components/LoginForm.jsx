import { Button, Group, PasswordInput, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import React from "react";
import { useNavigate } from "react-router-dom";
import { postData } from "../utils.js";
import { useCookies } from "react-cookie";

export default function LoginForm() {
  const [failedAuth, setFailedAuth] = React.useState(true);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [cookie, setCookie] = useCookies([]);

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
        expires.setTime(expires.getTime() + response.expires);

        setCookie("access_token", response.access_token, {
          path: "/",
          expires,
        });
        navigation("/register");
      })
      .catch((error) => {
        if (error.status === 401) {
          setFailedAuth(true);
          setErrorMessage("Unrecognised credentials");
        } else if (error.status >= 500) {
          navigation("/500");
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
