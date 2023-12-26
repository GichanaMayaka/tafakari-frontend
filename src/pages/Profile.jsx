import AppShellMain from "../components/AppShellMain";
import LoadingScreen from "../components/LoadingScreen";
import ProfileTabs from "../components/ProfileTabs";
import useCookieValues from "../hooks/useCookieValues";

import useProfile from "../hooks/useProfile";

function Profile() {
  const [setCookies, removeCookies, { accessToken }] = useCookieValues();
  const [posts, subreddits, comments, isLoading] = useProfile(accessToken);

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
