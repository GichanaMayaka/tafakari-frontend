import {
  Button,
  Checkbox,
  Group,
  PasswordInput,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import React from "react";
import { useNavigate } from "react-router-dom";
import { postData } from "../utils.js";

export default function RegisterForm() {
  const [failedRegister, setFailedRegister] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const navigation = useNavigate();

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      username: "",
      termsOfService: false,
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) => (value.length < 8 ? "Password is too Short" : null),
      username: (value) => (value.length <= 2 ? "Username is too short" : null),
      termsOfService: (value) =>
        !value ? "Please accept to our Terms and Conditions" : null,
    },
  });

  function handleRegister(url, payload, method) {
    postData(url, payload, method)
      .then((response) => {
        console.log(response.access_token);
        navigation("/");
      })
      .catch((error) => {
        switch (error.status) {
          case 401:
            setFailedRegister(true);
            setErrorMessage("Unrecognised credentials");
            break;
          case 409:
            setFailedRegister(true);
            setErrorMessage(
              "A user with the same credentials already exists. Please proceed to Login"
            );
            break;
          case 500:
            setFailedRegister(true);
            navigation("/server-error");
            break;
          default:
            setErrorMessage("Failed");
            setErrorMessage("There is an Error");
        }
      });
  }

  return (
    <form
      onSubmit={form.onSubmit((values) =>
        handleRegister("app/auth/register", values, "POST")
      )}
    >
      {failedRegister ? <Text c="red">{errorMessage}</Text> : null}
      <TextInput
        label="Email"
        placeholder="your@email.com"
        radius="md"
        {...form.getInputProps("email")}
      ></TextInput>
      <TextInput
        label="Username"
        placeholder="username"
        radius="md"
        {...form.getInputProps("username")}
      ></TextInput>
      <PasswordInput
        label="Password"
        placeholder="password"
        radius="md"
        {...form.getInputProps("password")}
      ></PasswordInput>
      <Checkbox
        mt="md"
        label="I agree to sell my privacy"
        {...form.getInputProps("termsOfService", { type: "checkbox" })}
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
