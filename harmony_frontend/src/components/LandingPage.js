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
        className="border justify-content-between"
        bg="light"
        expand="lg"
      >
        <Navbar.Brand className="ml-5 d-flex align-items-center">
          <img
            alt=""
            src="/favicon.ico"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />
          <h1 className="mx-2">Makimono</h1>
        </Navbar.Brand>
        <nav className="d-flex justify-content-center">
          <Link to="/signin">
            <Button>Login</Button>
          </Link>
        </nav>
      </Navbar>
      <Container fluid>
        <Row className="text-center align-items-start py-0 my-0 align-items-center">
          <Col>
            <h1>Simplify your life</h1>
            <h4>
              Makimono is the home for everything you need to remember, and
              everything you want to achieve.
            </h4>
          </Col>
          <Col>
            <img
              width="100%"
              className='align-self-end'
              height="auto"
              src="/images/splash-right.svg"
            />
          </Col>
        </Row>
        <Row className="d-flex flex-column bg-light text-center">
          <Col>
            <Lightning className="text-primary lightning my-5" />
            <h2>Focus on what matters most</h2>
          </Col>
          <Row className="my-5">
            <Col className="mx-3">
              <p className="sp-text bigger-text">
                Manage everything from big projects to personal moments.
              </p>
            </Col>
            <Col>
              <p className="sp-text bigger-text">
                Capture ideas and inspiration in notes, video, and pictures.
              </p>
            </Col>
            <Col className="mx-3">
              <p className="sp-text bigger-text">
                Never lose track of your tasks and deadlines.
              </p>
            </Col>
          </Row>
        </Row>
        <Row className="bg-primary text-center py-5 align-items-center">
          <Col>
            <h1 className="text-light">Sign up for Makimono Today</h1>
            <p className="text-light bigger-text">
              Capture ideas and inspiration from anywhere and manage tasks with
              ease.
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
