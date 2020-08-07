import React, {useState} from "react";
import {Button, Modal, Form} from "react-bootstrap"
import { createChannel } from "../actions/ServerActions";
import { useDispatch, useSelector } from "react-redux";
import {useParams} from 'react-router-dom';


const CreateChannel = () => {
  const [show, setShow] = useState(false);
  const [channelName, setChannelName] = useState("")
  const dispatch= useDispatch()
  const {serverId} = useParams()

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('submitted', serverId)
    await dispatch(createChannel(channelName, serverId))
    handleClose()
  };

  const updateChannelName= (e) => setChannelName(e.target.value)

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Create a new Channel
      </Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Create A Channel!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Label>Enter Channel Name</Form.Label>
                <Form.Control type="text" placeholder="Enter a name for your Channel" value = {channelName} onChange={updateChannelName} />
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

export default CreateChannel;
