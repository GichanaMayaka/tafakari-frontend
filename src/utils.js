const init = {
  mode: "cors",
  headers: {
    "Content-Type": "application/json",
  },
  redirect: "follow",
  referrerPolicy: "no-referrer",
};

export async function postData(url = "", data = {}, method = "POST") {
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
