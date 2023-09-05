import { useCookies } from "react-cookie";

const init = {
  mode: "cors",
  headers: {
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
  },
  redirect: "follow",
  referrerPolicy: "no-referrer",
};

export async function postData(
  url = "",
  data = {},
  method = "POST",
  accessToken
) {
  init.headers["Authorization"] = `Bearer ${accessToken}`;
  const response = await fetch(url, {
    ...init,
    method: `${method}`,
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw response;
  }

  return response.json();
}

export async function fetchData(url = "", method = "GET") {
  const response = await fetch(url, {
    ...init,
    method: `${method}`,
  });

  if (!response.ok) {
    throw response;
  }

  return response.json();
}
