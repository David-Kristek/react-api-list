import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useGlobalContext } from "../../context";

import UserTable from "../../components/admin/UserTable";
import { admin, usersData } from "../../api/adminApi";

function AdminPage() {
  const { setTitle, token, user } = useGlobalContext();

  const [isAdmin, setAdmin] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTitle("Adminpage");
    admin(localStorage.getItem("token")).then((res) => {
      console.log(res);
      if ("errorAuth" in res || !"msg" in res) {
        setLoading(false);
        setAdmin(false);
      } else {
        setLoading(false);
      }
    });
  }, []);
  if (isAdmin == false) {
    return <h2 className="text-center">You are not admin!</h2>;
  } else {
    return (
      <div>
        {!loading ? (
          <>
            <h2 className="text-center">
              Welcome to Admin page
              <span className="text-primary"> {user.name}</span>
            </h2>
            <div className="adminBox">
              <div className="buttons">
                <Button variant="primary">Users</Button>
                <Button variant="secondary">Pages</Button>
                <Button variant="secondary">Next admin</Button>
              </div>
              <UserTable className="right" />
            </div>
          </>
        ) : (
          <h3>Loading...</h3>
        )}
      </div>
    );
  }
}

export default AdminPage;
