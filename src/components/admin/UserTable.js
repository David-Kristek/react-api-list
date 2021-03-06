import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { useGlobalContext } from "../../context";
import { Link } from "react-router-dom"; 
import { usersData } from "../../api/adminApi";

function UserTable() {
  const { token } = useGlobalContext();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});

  useEffect(() => {
    usersData(token).then((res) => {
      setData(res);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <h4>Loading table ...</h4>;
  }
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Email</th>
          <th>Admin</th>
          <th>Info</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => {
          const { id, name, email, user_id, main} = item;
          return (
            <tr key={id}>
              <td>{id}</td>
              <td>{name}</td>
              <td>{email}</td>
              <td>{ main === null ? '' : "main"} { user_id === null ? 'user' : "admin"}</td>
              <td className="rowInfo">
                <Link to={`/admin/user/${id}`} className="btn btn-warning">
                  More info
                </Link>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

export default UserTable;
