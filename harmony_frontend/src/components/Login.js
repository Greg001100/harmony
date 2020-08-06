import React, { useState, useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from 'react-router-dom';
import { login } from "../actions/authentication";
import { saveState } from "../utilities/localStorage";
import Home from "./Home";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false)
  const dispatch = useDispatch();
  const token = useSelector(state => state.authentication.token);
  const badCredentials = useSelector(state => state.authentication.badCredentials);
  const history= useHistory();


  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(login(email, password));
    history.push('/home')
  };
  const fastLogin = async (e) => {
    await dispatch(login('gergdll@gmail.com', 'P4ssword!'))
    history.push('/home')
  };

  const updateEmail = (e) => setEmail(e.target.value);
  const updatePassword = (e) => setPassword(e.target.value);

  return (
    <>
      {badCredentials ? <Alert variant="danger">Invalid Credentials</Alert>: null}
      <Form onSubmit= {handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" value={email} onChange={updateEmail} />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" value={password} onChange={updatePassword} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>

        <Button variant="primary" type="submit" onClick={fastLogin}>
          fast login
        </Button>

    </>
  );
};

export default Login;
