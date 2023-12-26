import AppShellMain from "../components/AppShellMain";
import LoadingScreen from "../components/LoadingScreen";
import ProfileTabs from "../components/ProfileTabs";

import useProfile from "../hooks/useProfile";

function Profile() {
  const [posts, subreddits, comments, isLoading] = useProfile();

  return (
    <AppShellMain>
      {isLoading ? (
        <LoadingScreen isLoading={isLoading} />
      ) : (
        <ProfileTabs posts={posts.posts} comments={comments.comments} />
      )}
    </AppShellMain>
  );
}

export default Profile;
