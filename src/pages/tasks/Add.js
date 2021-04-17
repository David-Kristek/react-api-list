import { useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { addPost } from "../../api/tasksApi";
import { useGlobalContext } from "../../context";

function Add() {
  const { setTitle, token } = useGlobalContext();
  useEffect(() => {
    setTitle("Add task");
  }, []);
  const history = useHistory();
  const [title, setTitl] = useState("");
  const [description, setDescription] = useState("");
  const [loadUp, setLoadUp] = useState(false);
  const onAddSubmit = async (e) => {
    e.preventDefault();
    if (title.length > 0 && description.length > 0) {
      if (token === "") {
        history.push("/login");
        return;
      }
      setLoadUp(true);
      let a = await addPost({ title, description }, token);
      console.log(a);
      setLoadUp(false);
      history.push("/");
    }
  };
  return (
    <form onSubmit={onAddSubmit}>
      <div className="mb-3">
        <label className="form-label">Name</label>
        <input
          type="text"
          className="form-control"
          value={title}
          onChange={(e) => setTitl(e.target.value)}
        />
        <div id="emailHelp" className="form-text">
          We'll never share your email with anyone else.
        </div>
      </div>
      <div className="mb-3">
        <label className="form-label">Text</label>
        <input
          type="text"
          className="form-control"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        {loadUp ? "Loading" : "Add"}
      </button>
    </form>
  );
}

export default Add;
