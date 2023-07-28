import React from "react";
import "./App.css";
import { Button, Container, Text, TextInput } from "@mantine/core";
import AppShellMain from "./AppShellMain.jsx";

function App() {
  const [apiUrl] = React.useState(import.meta.env.VITE_API_BASE_URL);

  return (
    <>
      <AppShellMain>
        <Container>
          <Text variant="text" align="left">
            Welcome to Tafakari - a Reddit clone by Gichana
          </Text>
          <Button
            variant="gradient"
            gradient={{ from: "indigo", to: "turquoise" }}
          >
            Hit Home
          </Button>
        </Container>
      </AppShellMain>
    </>
  );
}

export default App;
