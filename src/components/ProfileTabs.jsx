import { Tabs } from "@mantine/core";
import React, { useState } from "react";
import PostCard from "../components/PostCard";
import { useNavigate } from "react-router-dom";

function ProfileTabs({ posts, comments }) {
  const [activeTab, setActiveTab] = useState("posts");
  const navigation = useNavigate();

  return (
    <Tabs
      variant="outline"
      radius="md"
      value={activeTab}
      onTabChange={(e) => setActiveTab(e)}
    >
      <Tabs.List>
        <Tabs.Tab value="posts">Posts</Tabs.Tab>
        <Tabs.Tab value="comments">Comments</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="posts">
        {posts.map((post) => {
          return (
            <a
              onClick={(e) =>
                navigation(`/posts/${post.id}`, { replace: true })
              }
            >
              <PostCard post={post} showCommentCard={false} />
            </a>
          );
        })}
      </Tabs.Panel>
      <Tabs.Panel value="comments">Comments will go here</Tabs.Panel>
    </Tabs>
  );
}

export default ProfileTabs;
