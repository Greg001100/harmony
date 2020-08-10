import React, { useEffect } from "react";
import { Container, Col, Row, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../actions/authentication";
import { useHistory } from 'react-router-dom';

import ChatPanel from "./ChatPanel";
import MemberList from "./MemberList";
import Channels from "./Channels";
import ServerList from "./ServerList";
import TopNav from "./TopNav";
import CreateServer from "./CreateServer";
import CreateChannel from "./CreateChannel";
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';



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
      <SimpleBar>
        <Container fluid className="vh-100 vw-100 bg-dark d-flex flex-column text-white-50 fullScreen">
          <Row className="bg-primary h-auto">
            <TopNav />
          </Row>
          <Row className="flex-grow-1">
            <Col xs={1} className="bg-darker rounded-lg">
              <ServerList></ServerList>
              <CreateServer />
            </Col>
            <Col xs={2} className="bg-dark">
              <Channels />
              <CreateChannel />
            </Col>
            <Col className="bg-chat flex d-flex flex-column justify-content-end overflow-y rounded-lg">
              <ChatPanel />
            </Col>
            <Col xs={2} className="bg-dark">
              <MemberList />
            </Col>
          </Row>
        </Container>
      </SimpleBar>
    </>
  );
};

export default Home;
