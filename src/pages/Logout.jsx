import { Text } from "@mantine/core";
import React from "react";
import { useNavigate } from "react-router-dom";
import AppShellMain from "../components/AppShellMain.jsx";
import useCookieValues from "../hooks/useCookieValues.js";
import { errorHandler, postData } from "../utils.js";

export default function Logout() {
  const navigation = useNavigate();
  const [isLoading, setIsLoading] = React.useState([]);
  const [setCookies, removeCookies, { accessToken }] = useCookieValues();

  React.useEffect(() => {
    postData("app/auth/logout", null, "DELETE", accessToken)
      .then((response) => {
        removeCookies("access_token");
        removeCookies("username");
        setTimeout(() => {
          navigation("/login");
        }, 60_000);
      })
      .catch((error) => errorHandler(error.status, navigation, setIsLoading));
  }, []);

  return (
    <AppShellMain>
      <Text align="center" component="h1">
        You have signed out.
        <br />
        You can{" "}
        <a className="link-no-decoration" onClick={(e) => navigation("/login")}>
          Login
        </a>{" "}
        again to create{" "}
        <a
          className="link-no-decoration"
          onClick={() => navigation("/posts", { replace: true })}
        >
          Posts
        </a>
        , and Comment.
      </Text>
    </AppShellMain>
  );
}
