import {
  AppShell,
  Flex,
  Header,
  NavLink,
  Navbar,
  Stack,
  Text,
} from "@mantine/core";
import { IconFlipHorizontal, IconSocial, IconUser } from "@tabler/icons-react";
import React from "react";
import { useNavigate } from "react-router-dom";

function AppShellMain({ children }) {
  const navigation = useNavigate();

  return (
    <AppShell
      padding="xs"
      navbar={
        <Navbar width={{ base: 300 }} withBorder={false} p="xs">
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
          <Flex align="center" justify="flex-start">
            <Text size="lg" weight={700}>
              Tafakari
            </Text>
          </Flex>
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
      <Flex direction="column" gap="xs" justify="center">
        {children}
      </Flex>
    </AppShell>
  );
}

export default AppShellMain;
