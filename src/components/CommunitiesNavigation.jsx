import { Container, NavLink, Text } from "@mantine/core";
import { IconPlus, Icon3dCubeSphere } from "@tabler/icons-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useSubreddits } from "../hooks/useSubreddits";

export default function CommunitiesNavigation() {
  const [availableSubreddits] = useSubreddits([
    // Initialize with a placeholder value
    {
      id: 0,
      value: "Loading...",
      label: "Loading...",
    },
  ]);
  const navigation = useNavigate();

  return (
    <NavLink
      label={
        <Text size="md" weight={700}>
          Communities
        </Text>
      }
    >
      <Container>
        <NavLink
          label={
            <Text size="md" weight={700}>
              Create Subreddit
            </Text>
          }
          icon={<IconPlus size="2rem" stroke={1.5} color={"#862d2d"} />}
          onClick={() => navigation(`/subreddits/new`)}
        />
        {availableSubreddits.map((subreddit) => (
          <NavLink
            label={
              <Text size="md" weight={700}>
                {subreddit.label}
              </Text>
            }
            // TODO: Use an appropriate icon
            icon={
              <Icon3dCubeSphere size="2rem" stroke={1.5} color={"#862d2d"} />
            }
            onClick={() => navigation(`/subreddits/${subreddit.id}`)}
          />
        ))}
      </Container>
    </NavLink>
  );
}
