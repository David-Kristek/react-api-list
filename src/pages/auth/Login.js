import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Button, Form, Alert } from "react-bootstrap";

import { useGlobalContext } from "../../context";
import { login } from "../../api/authApi";

function Login() {
  const { setTitle, setToken, setUser, user, token } = useGlobalContext();
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loadUp, setLoadUp] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setTitle("Login");
    if (token != "") {
      console.log("auth token");
      history.push("/");
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoadUp(true);
    login({ email, password }).then((res) => {
      if (res.hasOwnProperty("token")) {
        setToken(res.token);
        setUser(res.users);
        setLoadUp(false);
        setError("");
        history.push("/");
      } else if (res.hasOwnProperty("msg")) {
        setLoadUp(false);
        setError(res.msg);
      }
    });
  };

  return (
    <>
        <Alert
          variant="danger"
          onClose={() => setError("")}
          show={error !== ""}
          dismissible
        >
          {error}
        </Alert>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit">
          {loadUp ? "Loading" : "Submit"}
        </Button>
      </Form>
    </>
  );
}

export default Login;
