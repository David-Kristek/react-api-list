// var authHeaders = new Headers();
// authHeaders.set("Authorization", "Bearer " + token);
// authHeaders.set("Acccept", "application/json");

var headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

export const register = async (data) => {
  let resp = await fetch(`http://localhost:8000/api/register`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: headers,
  });
  let jsData = await resp.json();
  return jsData;
};
export const login = async (data) => {
  let resp = await fetch(`http://localhost:8000/api/login`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: headers,
  });
  let jsData = await resp.json();
  return jsData;
};
export const getUserData = async (token) => {
  let resp = await fetch(`http://localhost:8000/api/user/data`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
  let jsData = await resp.json();
  return jsData;
};

