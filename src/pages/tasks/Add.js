import { useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { addPost } from "../../api/tasksApi";
import { useGlobalContext } from "../../context";
import { Form, Button } from "react-bootstrap";

function Add() {
  const { setTitle, token } = useGlobalContext();
  useEffect(() => {
    setTitle("Add task");
  }, []);
  const history = useHistory();
  const [title, setTitl] = useState("");
  const [description, setDescription] = useState("");
  const [loadUp, setLoadUp] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    if (token === "") {
      history.push("/login");
      return;
    }
    setLoadUp(true);
    addPost({ title, description }, token).then((res) => {
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
        {loadUp ? "Loading" : "Add"}
      </Button>
    </Form>
  );
}

export default Add;
