//import { unameCheck, emailCheck, passwordCheck, passwordControlCheck } from "../../api/loginApi";
import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../../context";
import { Form, Button } from "react-bootstrap";
import { register } from "../../api/authApi";

function Register() {
  const { setTitle, setToken } = useGlobalContext();
  
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
      console.log(res);
      setToken(res.token);
      setLoading(false);
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
        />
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
      <Form.Group controlId="formPasswordConfirmation">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Repeat password"
          value={password_confirmation}
          onChange={(e) => {
            setPasswordConf(e.target.value);
          }}
        />
      </Form.Group>

      <Form.Group controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="I agree" />
      </Form.Group>
      <Button variant="primary" type="submit">
        {loading ? "Loading" : "Submit" }
      </Button>
    </Form>
  );
}

export default Register;
