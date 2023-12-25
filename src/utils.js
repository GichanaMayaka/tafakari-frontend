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

export async function fetchData(url = "", method = "GET", accessToken = null) {
  if (accessToken) {
    init.headers["Authorization"] = `Bearer ${accessToken}`;
  }
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

export function calculateTimeDifference(datetimeString) {
  const now = new Date();
  const targetDate = new Date(datetimeString);
  const differenceInMilliseconds = now - targetDate;

  const differenceInMinutes = Math.abs(differenceInMilliseconds / 60_000); // Ensure positive difference

  if (differenceInMinutes >= 60) {
    const hours = Math.floor(differenceInMinutes / 60);
    return `${hours} hours`;
  } else {
    const minutes = Math.floor(differenceInMinutes);
    const seconds = Math.round((differenceInMilliseconds % 60000) / 1000);
    return `${minutes} minutes ${seconds} seconds`;
  }
}
