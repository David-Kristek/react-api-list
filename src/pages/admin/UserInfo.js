import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useGlobalContext } from "../../context";
import { useHistory, useParams } from "react-router-dom";
import {
  userInfo,
  removeAdmin,
  makeAdmin,
  removeUser,
} from "../../api/adminApi";

function UserInfo() {
  const { setTitle, token } = useGlobalContext();
  const { id } = useParams();
  const history = useHistory();

  const [loading, setLoading] = useState(true);
  const [isAdmin, setAdmin] = useState(true);
  const [data, setData] = useState({});
  const [rel, setRel] = useState(false);
  const [notFound, setNotFound] = useState(false);
  useEffect(() => {
    setTitle("Admin page");
    userInfo(localStorage.getItem("token"), id).then((res) => {
      if ("errorAuth" in res || !"msg" in res) {
        setLoading(false);
        setAdmin(false);
      } else if (res.userInfo === null) {
        setNotFound(true);
      } else {
        console.log(res);
        setData(res);
        setLoading(false);
      }
    });
  }, [rel]);
  if (notFound) {
    return <h2 className="text-center">User not found</h2>;
  } else if (isAdmin == false) {
    return <h2 className="text-center">You are not admin!</h2>;
  } else {
    return (
      <div>
        {!loading ? (
          <>
            <h3 className="text-center pb-3">User: {data.userInfo.name}</h3>
            <div style={{ padding: "0 35%" }}>
              <div className="d-flex justify-content-between">
                <span className="font-weight-bold">User id : </span>
                <span>{data.userInfo.id}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span className="font-weight-bold">Email : </span>
                <span>{data.userInfo.email}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span className="font-weight-bold">Number of post: </span>
                <span>{data.userPosts.length}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span className="font-weight-bold">Admin : </span>
                <span>
                  {data.admin === null
                    ? ""
                    : data.admin.main == null
                    ? ""
                    : "main"}{" "}
                  {data.admin === null ? "user" : "admin"}
                </span>
              </div>
              <div className="d-flex justify-content-between mt-4">
                <Button
                  variant="danger"
                  onClick={() => {
                    removeUser(token, id);
                    history.push("/admin");
                  }}
                >
                  Remove user
                </Button>
                {data.admin === null ? (
                  <Button
                    variant="success"
                    onClick={() => {
                      makeAdmin(token, id);
                      setRel(!rel);
                    }}
                  >
                    Make admin
                  </Button>
                ) : (
                  <Button
                    variant="danger"
                    onClick={() => {
                      removeAdmin(token, id);
                      setRel(!rel);
                    }}
                  >
                    Remove admin
                  </Button>
                )}
              </div>
            </div>
            <div className="mt-5">
              <table className="table table-striped mt-4">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {data.userPosts.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.title}</td>
                      <td>{item.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <h3>Loading...</h3>
        )}
      </div>
    );
  }
}

export default UserInfo;
