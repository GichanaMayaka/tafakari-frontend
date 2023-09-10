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

export function errorHandler(errorStatusCode, navigator, loadingSetter) {
  switch (errorStatusCode) {
    case 401:
      navigator("/login");
      break;
    case 404:
      navigator("/not-found");
      break;
    case 422:
      navigator("/login");
      break;
    case 500:
      navigator("/server-error");
      break;
    default:
      loadingSetter(true);
  }
}
