const URL = "http://127.0.0.1:8000/api/admin";
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

  export const admin = async (token) => {
      return await fetchData(token, "GET"); 
  }
  export const usersData = async (token) => {
      return await fetchData(token, "GET", "/users");
  }
  export const userInfo = async (token, id) => {
    return await fetchData(token, "GET", `/user/${id}`);
  }
  export const removeUser = async (token, id) => {
    return await fetchData(token, "DELETE", `/removeUser/${id}`);
}
export const removeAdmin = async (token, id) => {
    return await fetchData(token, "DELETE", `/removeAdmin/${id}`);
}
export const makeAdmin = async (token, id) => {
  return await fetchData(token, "GET", `/newAdmin/${id}`);
}


  export const addPost = async (post, token) => {
    return await fetchData(token, "POST", "/ablam/adfljkas",true, post);
  };