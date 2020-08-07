import React, { useState } from "react";
import { Form, Button, Col, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, removeAuth } from "../actions/authentication";
import { Redirect, Switch } from 'react-router-dom';

const RegistrationForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [userName, setUserName] = useState("")
  const dispatch = useDispatch();
  const valErrors = useSelector(state => state.authentication.valErrors);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password===confirm) {
      dispatch(removeAuth());
      dispatch(registerUser(email, userName, password));
      return (
          <Redirect to="/home/1/1" />
      )
    } else {
      alert('Password and confirmation do not match!')
    }
  };

  const updateEmail = (e) => setEmail(e.target.value);
  const updateUserName = (e) => setUserName(e.target.value);
  const updatePassword = (e) => setPassword(e.target.value);
  const updateConfirm = (e) => setConfirm(e.target.value);

  return (
    <>
      {valErrors ? <Alert variant="danger">{valErrors.map((error, idx) => (<p key={idx}>{error}</p>))}</Alert>: null}
      <Form onSubmit ={handleSubmit}>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Enter Username" value = {userName} onChange={updateUserName} />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email"value={email} placeholder='Enter Email' onChange={updateEmail} />
          </Form.Group>
      </Form.Row>
      <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password: Must have at least one capital, number, special character" onChange={updatePassword} />
        </Form.Group>

      <Form.Group controlId="formBasicPasswordConf">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" placeholder="Confirm Password" onChange={updateConfirm} />
      </Form.Group>
      <Button variant="primary" type="submit">
          Submit
      </Button>
      </Form>
    </>
  )

}


export default RegistrationForm;
