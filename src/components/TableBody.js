import React, { useState } from "react";
import { Link } from "react-router-dom";
import { remove } from "../api/tasksApi";
import { useGlobalContext } from "../context";

function TableBody({ data }) {
  const [datas, setDatas] = useState(data);
  const [delId, setDelId] = useState(-1);
  const { token } = useGlobalContext(); 
  if (datas.length > 0) {
    return (
      <tbody>
        {datas.map((item) => {
          return (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>{item.description}</td>
              <td>
                <Link to={`/edit/${item.id}`} className="btn btn-secondary">
                  Edit
                </Link>
                <button
                  onClick={() => {
                    if (delId === -1) {
                      setDelId(item.id);
                      remove(item.id, token)
                        .then(() => {
                          setDelId(-1);
                          setDatas(
                            datas.filter((datitem) => datitem.id !== item.id)
                          );
                        })
                        .catch((err) => {
                          alert("Failed to delete post");
                        });
                    }
                  }}
                  className="btn btn-danger ml-3"
                  key={item.id}
                >
                  {delId === item.id ? "Deleting" : "Delete"}
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    );
  } else {
    return (
      <tbody>
        <tr>
          <td>There are no posts yet</td>
        </tr>
      </tbody>
    );
  }
}

export default TableBody;
