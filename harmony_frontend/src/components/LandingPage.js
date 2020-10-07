import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Col, Row, Navbar } from "react-bootstrap";
import { Lightning } from "react-bootstrap-icons";
import SignUp from "./SignUp";

function LandingPage() {
  return (
    <>
      <Navbar
        sticky="top"
        className="border justify-content-between noBorder text-light"
        bg="dark"
        expand="lg"
      >
        <Navbar.Brand className="ml-5 d-flex justify-self-center">
          {/* <img
            alt=""
            src="/favicon.ico"
            width="30"
            height="30"
            className="d-inline-block align-top"
          /> */}
        </Navbar.Brand>
        <h1 className="mx-2 align-self-center">Harmony</h1>
        <nav className="d-flex justify-self-center">
          <Link to="/login">
            <Button variant='secondary'>Login</Button>
          </Link>
        </nav>
      </Navbar>
      <Container fluid>
        <Row className="text-center align-items-start py-0 my-0 align-items-center sky">
          <Col className='text-center align-items-center justify-content-center'>
            <h1>Your place to talk</h1>
            <h6>
              Whether you're a part of a book club, gaming group, art community,
              or just a handful of friends that want to spend time together,
              Harmony makes it easy to talk and hang out more often.
            </h6>
          </Col>
          <Col>
            <img
              width="100%"
              className="align-self-end"
              height="auto"
              src="/images/splash-right.svg"
            />
          </Col>
        </Row>
        <Row className="text-center align-items-start py-0 my-0 align-items-center">
          <Col>
            <img
              width="100%"
              className="align-self-end"
              height="auto"
              src="/images/froggy.svg"
            />
          </Col>
          <Col>
            <h1>An invite-only place with plenty of space</h1>
            <h6>
              Harmony servers are organized into topic-based channels where you
              can collaborate, share, and just talk about your day without
              clogging up a group chat.
            </h6>
          </Col>
        </Row>
        <Row className="bg-dark text-center py-5 align-items-center">
          <Col>
            <h1 className="text-light">Sign up for Harmony Today</h1>
            <p className="text-light bigger-text">
              Chat with friends and colleagues with ease.
            </p>
          </Col>
          <Col>
            <SignUp />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default LandingPage;
