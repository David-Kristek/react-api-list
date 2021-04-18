//import { unameCheck, emailCheck, passwordCheck, passwordControlCheck } from "../../api/loginApi";
import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../../context";
import { useHistory } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { register } from "../../api/authApi";

function Register() {
  const { setTitle, setToken } = useGlobalContext();
  const history = useHistory();

  const [errors, setErrors] = useState({});

  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConf] = useState("");

  useEffect(() => {
    setTitle("Register");
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    register({ name, email, password, password_confirmation }).then((res) => {
      if (res.hasOwnProperty("errors")) {
        setLoading(false);
        setErrors(res.errors);
      } else {
        setErrors({}); 
        setToken(res.token);
        setLoading(false);
        history.push("/");
      }
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter username"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          isInvalid={"name" in errors}
        />
        {"name" in errors && (
          <Form.Control.Feedback type="invalid">
            {errors.name}
          </Form.Control.Feedback>
        )}
      </Form.Group>
      <Form.Label>Email address</Form.Label>
      <Form.Group controlId="formBasicEmail">
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          isInvalid={"email" in errors}
        />
        {"email" in errors && (
          <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>
        )}
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
          isInvalid={"password" in errors}
        />
        {"password" in errors && (
          <Form.Control.Feedback type="invalid">
            {errors.password}
          </Form.Control.Feedback>
        )}
      </Form.Group>
      <Form.Group controlId="formPasswordConfirmation">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Repeat password"
          value={password_confirmation}
          onChange={(e) => {
            setPasswordConf(e.target.value);
          }}
          isInvalid={"password" in errors}
        />
        {"password" in errors && (
          <Form.Control.Feedback type="invalid">
            {errors.password}
          </Form.Control.Feedback>
        )}
      </Form.Group>

      <Form.Group controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="I agree" />
      </Form.Group>
      <Button variant="primary" type="submit">
        {loading ? "Loading" : "Submit"}
      </Button>
    </Form>
  );
}

export default Register;
