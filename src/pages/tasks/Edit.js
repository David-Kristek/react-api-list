import { useHistory, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { update, getOnePost } from "../../api/tasksApi";
import { useGlobalContext } from "../../context";

function Add() {
  const { setTitle, token } = useGlobalContext();
  useEffect(() => {
    setTitle("Edit task");
  }, []);
  const { id } = useParams();
  const history = useHistory();

  const [loading, setLoading] = useState(true);
  const [loadUp, setLoadUp] = useState(false);
  const [title, setTitl] = useState("Loading");
  const [description, setDescription] = useState("Loading");
  const [postId, setPostId] = useState(0);

  useEffect(() => {
    getOnePost(id).then((data) => {
      setTitl(data.title);
      setDescription(data.description);
      setPostId(data.id);
      setLoading(false);
    });
  }, []);
  const onAddSubmit = async (e) => {
    e.preventDefault();
    if (title.length > 0 && description.length > 0 && loading === false) {
      setLoadUp(true);
      if (token === "") {
        history.push("/login");
        return;
      }
      await update(postId, { title, description });
      setLoadUp(false);
      history.push("/");
    }
  };
  return (
    <form onSubmit={onAddSubmit}>
      <div className="mb-3">
        <label className="form-label">Edit</label>
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
