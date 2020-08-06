import React, {useState} from "react";
import {Button, Modal, Form, Col} from "react-bootstrap"
import e from "express";

const CreateServer = () => {
  const [show, setShow] = useState(false);
//   const [serverName, setServerName] = useState("")

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(`submitted with ${serverName}` )
//   };

//   const updateServerName= (e) => setServerName(e.target.value)
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Create A Server!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        {/* <Modal.Body>
            <Form onSubmit={handleSubmit}>
                <Form.Group as={Col} controlId="formGridUsername">
                    <Form.Label>Enter Server Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter Username" value = {serverName} onChange={updateServerName} />
                </Form.Group>
            </Form>
        </Modal.Body> */}
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CreateServer;
