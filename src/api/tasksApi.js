export const allData = async () => {
  let resp = await fetch(`http://127.0.0.1:8000/api/posts`);
  let jsData = await resp.json();
  return jsData;
};
export const getOnePost = async (id) => {
  let resp = await fetch(`http://127.0.0.1:8000/api/posts/${id}/edit`);
  let jsData = await resp.json();
  return jsData;
};
export const addPost = async (post, token) => {
  let resp = await fetch(`http://127.0.0.1:8000/api/posts`, {
    method: "POST",
    body: JSON.stringify(post),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
  let jsData = await resp.json();
  return jsData;
};

export const update = async (id, post, token) => {
  await fetch(`http://127.0.0.1:8000/api/posts/${id}`, {
    method: "PUT",
    body: JSON.stringify(post),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
};
export const remove = async (id, token) => {
  await fetch(`http://127.0.0.1:8000/api/posts/${id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
};
