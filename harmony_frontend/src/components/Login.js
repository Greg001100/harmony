import React, { useState } from "react";
import { Form, Button, Alert, Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { login, removeAuth } from "../actions/authentication";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.authentication.token);
  const badCredentials = useSelector(
    (state) => state.authentication.badCredentials
  );
  const valErrors = useSelector((state) => state.authentication.valErrors);
  const history = useHistory();

  if (valErrors) {
    history.push("/signup");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(removeAuth());
    await dispatch(login(email, password));
    history.push("/home/1/1");
  };

  const fastLogin = async (e) => {
    e.preventDefault();
    await dispatch(removeAuth());
    await dispatch(login("demo@demo.com", "P4ssword!"));
    history.push("/home/1/1");
  };

  const updateEmail = (e) => setEmail(e.target.value);
  const updatePassword = (e) => setPassword(e.target.value);

  return (
    <Container
      fluid
      className="bg-dark d-flex align-items-center justify-content-center vh-100"
    >
      <Row className="bg-light shadow rounded d-flex justify-content-center">
        <Col
          sm
          className="p-5 d-flex flex-column align-items-center justify-content-center"
        >
          {badCredentials ? (
            <Alert variant="danger">Invalid Credentials</Alert>
          ) : null}
          <h1 className='mb-3'>Login</h1>
          <Form onSubmit={handleSubmit} className="d-flex flex-column align-items-center justify-content-center">
            <Form.Group controlId="formBasicEmail">
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={updateEmail}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={updatePassword}
              />
            </Form.Group>
            <Button className="my-3 align-self-center" variant="dark" type="submit">
              Submit
            </Button>
          </Form>
          <Button
            className="align-self-center"
            variant="dark"
            type="submit"
            onClick={fastLogin}
          >
            Demo Login
          </Button>
          <br></br>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
