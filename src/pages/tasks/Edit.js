import { useHistory, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { update, getOnePost } from "../../api/tasksApi";
import { useGlobalContext } from "../../context";
import { Form, Button } from "react-bootstrap";

function Add() {
  const { setTitle, token } = useGlobalContext();
  const { id } = useParams();
  const history = useHistory();

  const [loading, setLoading] = useState(true);
  const [loadUp, setLoadUp] = useState(false);
  const [title, setTitl] = useState("Loading");
  const [description, setDescription] = useState("Loading");
  const [postId, setPostId] = useState(0);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setTitle("Edit task");

    getOnePost(id, token).then((data) => {
      setTitl(data.title);
      setDescription(data.description);
      setPostId(data.id);
      setLoading(false);
    });
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoadUp(true);
    if (token === "") {
      history.push("/login");
      return;
    }
    update(postId, { title, description }, token).then((res) => {
      if (res.hasOwnProperty("errors")) {
        setErrors(res.errors);
        setLoadUp(false);
      } else {
        setLoadUp(false);
        history.push("/");
      }
    });
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <label className="form-label">Name</label>
        <Form.Control
          type="text"
          className="form-control"
          value={title}
          onChange={(e) => setTitl(e.target.value)}
          isInvalid={"title" in errors}
        />
        {"title" in errors && (
          <Form.Control.Feedback type="invalid">
            {errors.title}
          </Form.Control.Feedback>
        )}
      </Form.Group>
      <Form.Group>
        <label className="form-label">Text</label>
        <Form.Control
          type="text"
          className="form-control"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          isInvalid={"description" in errors}
        />
        {"description" in errors && (
          <Form.Control.Feedback type="invalid">
            {errors.description}
          </Form.Control.Feedback>
        )}
      </Form.Group>
      <Button variant="primary" type="submit">
        {loadUp ? "Loading" : "Edit"}
      </Button>
    </Form>
  );
}

export default Add;
