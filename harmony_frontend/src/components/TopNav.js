import React, { useState, useEffect } from "react";
import { Navbar, Container, Col, NavDropdown } from "react-bootstrap";
import Logout from "./logout";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getName } from "../actions/ServerActions";

const TopNav = () => {
  const servers = useSelector((state) => state.servers[0]);
  const channels = useSelector((state) => state.channels[0]);
  const userName = useSelector((state) => state.authentication.user.userName);
  const { serverId, channelId } = useParams();
  const [channelName, setChannelName] = useState("Channel");
  const dispatch= useDispatch();

  //make useeffect that uses channel id to query db for the name of the channel
  useEffect(() => {
    const fetchName = async () => {
      let cName = await dispatch(getName(channelId));
      await setChannelName(cName.name)
    };
    fetchName();
  }, [channelId]);

  if (channels && servers.length) {
    let currentServer = [];
    servers.server.forEach((el) => {
      if (serverId == el.id) {
        currentServer.push(el);
      }
    });
    const serverName = currentServer[0].name;

    // let currentChannel=[]
    // channels.channel.forEach(el => {
    //     if (channelId == el.id) {
    //         currentChannel.push(el)
    //     }
    // })
    // const channelName = currentChannel[0].name

    return (
      <Navbar className="flex-fill font-weight-bold" bg="dark" variant="dark">
        <Container
          fluid
          className="vw-100 d-flex justify-content-start border-darker"
        >
          <Col xs={1} className="pl-0">
            <Navbar.Brand href="#home">Harmony</Navbar.Brand>
          </Col>
          <Col xs={2}>
            <Navbar.Text>{serverName}</Navbar.Text>
          </Col>
          <Col className="d-flex justify-content-between">
            <Navbar.Text># {channelName}</Navbar.Text>
            <Navbar.Text>Welcome {userName}!</Navbar.Text>
            <NavDropdown title="About the Developer" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.3" target="_blank">Resume/Portfolio</NavDropdown.Item>
                <NavDropdown.Item href="https://github.com/Greg001100" target="_blank">Github</NavDropdown.Item>
                <NavDropdown.Item href="https://www.linkedin.com/in/greglloyd1/" target="_blank">Linkedin</NavDropdown.Item>
            </NavDropdown>
          </Col>
          <Col xs={2}>
            <Logout></Logout>
          </Col>
        </Container>
      </Navbar>
    );
  }

  return (
    <Navbar className="flex-fill" bg="dark" variant="dark">
      <Container fluid className="vw-100 d-flex justify-content-start">
        <Col xs={1} className="pl-0">
          <Navbar.Brand href="#home">Harmony</Navbar.Brand>
        </Col>
        <Col xs={2}>
          <Navbar.Text>Server Name</Navbar.Text>
        </Col>
        <Col className="d-flex justify-content-between">
          <Navbar.Text>#Channel Name</Navbar.Text>
          <Navbar.Text>Welcome!</Navbar.Text>
        </Col>
        <Col xs={2}>
          <Logout></Logout>
        </Col>
      </Container>
    </Navbar>
  );
};

export default TopNav;
