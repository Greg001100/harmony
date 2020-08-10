import React from 'react';
import {Navbar, Nav, Form, Button, FormControl, Container, Col} from 'react-bootstrap'
import Logout from "./logout";
import {useParams} from 'react-router-dom'
import { useSelector } from "react-redux";

const TopNav = () => {
    const servers = useSelector((state) => state.servers[0]);
    const channels = useSelector((state) => state.channels[0]);
    const userName = useSelector((state) => state.authentication.user.userName);
    const {serverId, channelId} = useParams()

    if(channels && servers) {
        console.log(channels.channel, 'channels')
        console.log(servers.server, 'servers')
        console.log(serverId, 'serverid')

        let currentServer=[]
        servers.server.forEach(el => {
            if (serverId == el.id) {
                currentServer.push(el)
            }
        })
        const serverName = currentServer[0].name

        let currentChannel=[]
        channels.channel.forEach(el => {
            if (channelId == el.id) {
                currentChannel.push(el)
            }
        })
        const channelName = currentChannel[0].name
        return(
            <Navbar className="flex-fill" bg="dark" variant="dark">
                <Container fluid className="vw-100 d-flex justify-content-start border-darker">
                    <Col xs={1} className="pl-0">
                        <Navbar.Brand href="#home">Harmony</Navbar.Brand>
                    </Col>
                    <Col xs={2}>
                        <Navbar.Text>{serverName}</Navbar.Text>
                    </Col>
                    <Col className="d-flex justify-content-between">
                        <Navbar.Text># {channelName}</Navbar.Text>
                        <Navbar.Text>Welcome {userName}!</Navbar.Text>
                    </Col>
                    <Col xs={2}>
                        <Logout></Logout>
                    </Col>
                </Container>
            </Navbar>
        )
    }

    return(
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
    )
}

export default TopNav
