const URL = "http://127.0.0.1:8000/api/posts";

const fetchData = async (token, method, addUrl = "", body = false, bodyData = {}) => {
  let resp = await fetch(URL + addUrl, {
    method: method,
    ...(body && { body: JSON.stringify(bodyData)}),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
  let jsData = await resp.json();
  return jsData;
};

export const allData = async (token) => {
  return await fetchData(token, "GET");
};
export const getOnePost = async (id, token) => {
  return await fetchData(token, "GET", `/${id}/edit`);
};
export const addPost = async (post, token) => {
  return await fetchData(token, "POST", "",true, post);
};
export const update = async (id, post, token) => {
  return await fetchData(token, "PUT", `/${id}`,true, post);
};
export const remove = async (id, token) => {
  return await fetchData(token, "DELETE", `/${id}`); 
};
