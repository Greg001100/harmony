import React, { useState } from "react";
import { Form, Button, Alert, Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector} from "react-redux";
import {useHistory, Link} from 'react-router-dom'
import { login, removeAuth } from "../actions/authentication";



const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false)
  const dispatch = useDispatch();
  const token = useSelector(state => state.authentication.token);
  const badCredentials = useSelector(state => state.authentication.badCredentials);
  const valErrors = useSelector(state => state.authentication.valErrors);
  const history= useHistory();

  if (valErrors) {
    history.push('/signup')
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(removeAuth());
    await dispatch(login(email, password));
    history.push('/home/1/1')
  };

  const fastLogin = async (e) => {
    e.preventDefault();
    await dispatch(removeAuth());
    await dispatch(login('demo@demo.com', 'P4ssword!'))
    history.push('/home/1/1')
  };

  const updateEmail = (e) => setEmail(e.target.value);
  const updatePassword = (e) => setPassword(e.target.value);

  return (
    <Container>
      <Row className='d-flex justify-content-center'>
        <Col></Col>
          <Col>
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
              <Button className="my-1" variant="primary" type="submit">
                Submit
              </Button>
            </Form>
              <Button className="my-1" variant="primary" type="submit" onClick={fastLogin}>
                Demo Login
              </Button>
              <br></br>
              <Link to="/signup">Don't have an account?</Link>
          </Col>
        <Col></Col>
      </Row>
    </Container>


  );
};

export default Login;
