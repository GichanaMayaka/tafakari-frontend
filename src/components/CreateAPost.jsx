import { Card, TextInput } from "@mantine/core";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function CreateAPost() {
  const navigation = useNavigate();

  return (
    <Card mb={-21}>
      <TextInput
        onClick={(e) => navigation("/submit")}
        placeholder="Create a Post"
      />
    </Card>
  );
}
