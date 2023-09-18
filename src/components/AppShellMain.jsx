import {
  AppShell,
  Container,
  Divider,
  Flex,
  Header,
  NavLink,
  Navbar,
  Select,
  Stack,
  Text,
} from "@mantine/core";
import { IconFlipHorizontal, IconUser, IconPlus } from "@tabler/icons-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useSubreddits } from "../hooks/useSubreddits";
import CommunitiesNavigation from "./CommunitiesNavigation";

function AppShellMain({ children }) {
  const navigation = useNavigate();

  const [availableSubreddits] = useSubreddits([
    // Initialize with a placeholder value
    {
      id: 0,
      value: "Loading...",
      label: "Loading...",
    },
  ]);

  return (
    <AppShell
      padding="xs"
      navbar={
        <Navbar width={{ base: 300 }} withBorder={false} p="xs">
          <Stack align="center" spacing="md" h={300}>
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
            <Divider />
            <CommunitiesNavigation />
          </Stack>
        </Navbar>
      }
      header={
        <Header height={60} p="md">
          <Flex align="center" justify="center" gap={30} direction="row">
            <Text size="xl" weight={900}>
              Tafakari
            </Text>
            <Select
              data={availableSubreddits}
              onChange={(e) => {
                navigation(`/subreddits/${e}`);
              }}
            />
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
