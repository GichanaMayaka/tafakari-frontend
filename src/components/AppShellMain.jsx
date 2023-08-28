import React from "react";
import {
  AppShell,
  Container,
  Header,
  Navbar,
  NavLink,
  Text,
  Stack,
} from "@mantine/core";
import { IconSocial, IconFlipHorizontal, IconUser } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

function AppShellMain({ children }) {
  const navigation = useNavigate();

  return (
    <AppShell
      padding="md"
      navbar={
        <Navbar width={{ base: 300 }} height={500} withBorder={false} p="xs">
          <Stack align="center" spacing="md" h={300}>
            <NavLink
              label={
                <Text size="lg" weight={700}>
                  Subreddits
                </Text>
              }
              icon={<IconSocial size="2rem" stroke={1.5} color={"#862d2d"} />}
              onClick={() => navigation("/subreddits")}
            />
            <NavLink
              label={
                <Text size="lg" weight={700}>
                  Posts
                </Text>
              }
              icon={
                <IconFlipHorizontal
                  size="2rem"
                  stroke={1.5}
                  color={"#862d2d"}
                />
              }
              onClick={() => navigation("/posts")}
            />
            <NavLink
              label={
                <Text size="lg" weight={700}>
                  Profile
                </Text>
              }
              icon={<IconUser size="2rem" stroke={1.5} color={"#862d2d"} />}
              onClick={() => navigation("/profile")}
            />
          </Stack>
        </Navbar>
      }
      header={
        <Header height={60} p="md">
          <Container
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "left",
            }}
          >
            <Text size="lg" weight={700}>
              Tafakari
            </Text>
          </Container>
        </Header>
      }
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[10],
        },
      })}
    >
      {children}
    </AppShell>
  );
}

export default AppShellMain;
