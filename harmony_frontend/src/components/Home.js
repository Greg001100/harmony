import React, { useState, useEffect } from "react";
import { Form, Button, Container, Col, Row, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, loadUser } from "../actions/authentication";
import { useHistory } from 'react-router-dom';

import ChatPanel from "./ChatPanel";
import Logout from "./logout";
import MemberList from "./MemberList";
import Channels from "./Channels";
import ServerList from "./ServerList";
import TopNav from "./TopNav";
import CreateServer from "./CreateServer";

const Home = () => {
  const dispatch = useDispatch();
  const history= useHistory();

  useEffect(() => {
    dispatch(loadUser());
  }, []);

  const token = useSelector((state) => state.authentication.token);
  const userName = useSelector((state) => state.authentication.user.userName);


  return (
    <>
      <Container fluid className="vh-100 vw-100 bg-dark d-flex flex-column">
        <Row className="bg-primary h-auto">
          <TopNav />
          <h1>Welcome, {userName} </h1>
        </Row>
        <Row className="flex-grow-1">
          <Col xs={1} className="bg-success">
            <ServerList></ServerList>
            <CreateServer />
            <Logout></Logout>
          </Col>
          <Col xs={2} className="bg-info">
            <Channels></Channels>
          </Col>
          <Col className="bg-warning d-flex flex-column overflow-auto">
            <ChatPanel />
          </Col>
          <Col xs={2} className="bg-danger">
            <MemberList />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;
