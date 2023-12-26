import { useCookies } from "react-cookie";

function useCookieValues() {
  const [cookies, setCookies, removeCookies] = useCookies([]);

  const accessToken = cookies.access_token;
  const userName = cookies.username;

  return [
    setCookies,
    removeCookies,
    { accessToken: accessToken, userName: userName },
  ];
}

export default useCookieValues;
