import AppShellMain from "../components/AppShellMain";
import LoadingScreen from "../components/LoadingScreen";
import ProfileTabs from "../components/ProfileTabs";
import usePosts from "../hooks/usePosts";

import useProfile from "../hooks/useProfile";

function Profile() {
  const [posts, subreddits, isLoading] = useProfile();

  console.log(posts.posts);
  return (
    <AppShellMain>
      {isLoading ? (
        <LoadingScreen isLoading={isLoading} />
      ) : (
        <ProfileTabs posts={posts.posts} />
      )}
    </AppShellMain>
  );
}

export default Profile;
