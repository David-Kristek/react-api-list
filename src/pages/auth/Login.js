import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
// import { login } from "../../api/loginApi";
import { useGlobalContext } from "../../context";
import { login } from "../../api/authApi";
function Login() {
  const { setTitle, setToken, setUser, user, token } = useGlobalContext();
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loadUp, setLoadUp] = useState(false);
  useEffect(() => {
    setTitle("Login");
    if( token != ""){
      console.log("auth token");
      history.push("/"); 
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoadUp(true);
      login({ email, password}).then((res) => {
        console.log(res.users);
        setToken(res.token); 
        setUser(res.users); 
        setLoadUp(false);
      });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => {setEmail(e.target.value)}}/>
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password"  value={password} onChange={e => {setPassword(e.target.value)}}/>
      </Form.Group>
      <Form.Group controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" type="submit">
        {loadUp ? "Loading" : "Submit"}
      </Button>
    </Form>
  );
}

export default Login;
