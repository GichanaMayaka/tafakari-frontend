import {
  AppShell,
  Burger,
  Collapse,
  Divider,
  Flex,
  Header,
  NavLink,
  Navbar,
  Select,
  Stack,
  Text,
} from "@mantine/core";
import { IconFlipHorizontal, IconUser } from "@tabler/icons-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import useBreakpoints from "../hooks/useBreakpoints";
import { useSubreddits } from "../hooks/useSubreddits";
import CommunitiesNavigation from "./CommunitiesNavigation";

function AppShellMain({ children }) {
  const navigation = useNavigate();

  const [opened, toggle] = useBreakpoints();
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
        <Collapse in={!opened}>
          <Navbar
            // TODO: Properly handle responsiveness
            miw={{ base: 1, xs: 100, md: 200 }}
            width={{ base: 1, xs: 200, md: 300 }}
            withBorder={false}
            p="xs"
          >
            <Stack align="left" spacing="md" h={300}>
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
        </Collapse>
      }
      header={
        <Header height={60} p="md">
          <Flex justify="space-evenly">
            <Burger
              opened={!opened}
              onClick={toggle}
              hiddenFrom="md"
              color="#a32d25"
              size="sm"
              aria-label="Toggle Navigation"
              style={{ alignItems: "center" }}
            />
            <Flex
              align="center"
              justify="center"
              gap={30}
              direction="row"
              style={{ flexGrow: 1 }}
            >
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
            <Text
              justify="right"
              className="link-no-decoration"
              onClick={() => navigation("/logout")}
            >
              Logout
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
      <Flex
        direction="column"
        gap="xs"
        justify="center"
        pl={"3rem"}
        pr={"3rem"}
      >
        {children}
      </Flex>
    </AppShell>
  );
}

export default AppShellMain;
