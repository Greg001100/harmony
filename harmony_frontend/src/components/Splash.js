import React from "react";
import SignUp from "./SignUp";
import Login from "./Login";
import Home from "./Home"
import { BrowserRouter, NavLink, Switch, Route, Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import {Button, Container, Col, Row} from 'react-bootstrap'

import { PrivateRoute } from "../utilities/routesUtil"

function Splash() {
  const token = useSelector(state => state.authentication.token);

  return (
    <Container>
      <Row className="text-center justify-content-center">
          <h1>Harmony</h1>
      </Row>
      <Row className="text-center justify-content-center">
        <Col></Col>
        <Col><p>Your place to talk. Whether you're a part of a book club, gaming group, art community, or just a handful of friends that want to spend time together, Harmony makes it easy to talk and hang out more often.</p></Col>
        <Col></Col>
      </Row>
      <Row className="justify-content-center">
          <nav className="d-flex justify-content-center">
            {/* <Button className="mx-3" href="/signup">Sign up</Button>
            <Button className="mx-3" href="/login"></Button> */}
            <Link to='/login'>Login</Link>
          </nav>
      </Row>
    </Container>

  );
}

export default Splash;
