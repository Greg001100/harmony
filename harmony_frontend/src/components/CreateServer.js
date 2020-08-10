import React, {useState} from "react";
import {Button, Modal, Form} from "react-bootstrap"
import { createServer } from "../actions/ServerActions";
import { useDispatch, useSelector } from "react-redux";


const CreateServer = () => {
  const [show, setShow] = useState(false);
  const [serverName, setServerName] = useState("")
  const userName = useSelector((state) => state.authentication.user.userName);
  const userId = useSelector((state) => state.authentication.user.id);
  const dispatch= useDispatch()

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(createServer(serverName, userId))
    handleClose()
  };

  const updateServerName= (e) => setServerName(e.target.value)

  return (
    <>
      <Button variant="secondary" onClick={handleShow}>
        Create Server
      </Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Create A Server!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Label>Enter Server Name</Form.Label>
                <Form.Control type="text" placeholder="Enter a name for your server" value = {serverName} onChange={updateServerName} />
            </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CreateServer;
