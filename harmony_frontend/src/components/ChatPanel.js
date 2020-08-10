import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import uuid from "uuid";
import { wsUrl } from "../config";
import { useParams } from "react-router-dom";
import { getMessages, createMessage, clearMessages } from "../actions/ServerActions";
import { Container, Form, Button, Col } from "react-bootstrap";
import SimpleBar from 'simplebar'

const ChatPanel = () => {
  const userName = useSelector((state) => state.authentication.user.userName);
  const userId = useSelector((state) => state.authentication.user.id);
  const loadedMessages = useSelector((state) => state.messages[0]);
  // const newMessages = useSelector((state) => state.messages[1]);
  const { channelId } = useParams();
  const dispatch = useDispatch();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const webSocket = useRef(null);

  useEffect(() => {
    const fetchMessages = async () => {
      dispatch(getMessages(channelId));
    };
    fetchMessages();
  }, [channelId]);


  useEffect(() => {
    // If we don't have a username
    // then we don't need to create a WebSocket.

    if (loadedMessages) {
      const ws = new WebSocket(wsUrl);

      ws.onopen = (e) => {
        console.log(`Connection open: ${e}`);
        // Set the messages state variable to trigger
        // the other effect to set the `onmessage` event listener.
        setMessages(loadedMessages.message);
      };

      ws.onerror = (e) => {
        console.error(e);
      };

      ws.onclose = (e) => {
        console.log(`Connection closed: ${e}`);
        webSocket.current = null;
        setMessages([]);
      };

      webSocket.current = ws;

      // This function will be called when the next time
      // that the `username` state variable changes.
      return function cleanup() {
        if (webSocket.current !== null) {
          webSocket.current.close();
          console.log('cleanup')
        }
      };
    }


  }, [loadedMessages, channelId]);

  // This effect will be called when the `App` component unmounts.
  useEffect(() => {
    return function cleanup() {
      if (webSocket.current !== null) {
        webSocket.current.close();
        setMessages([])
        dispatch(clearMessages())
      }
    };
  }, [channelId]);

  // This effect is called whenever the `messages` state variable is changed.
  useEffect(() => {
    if (webSocket.current !== null) {
      // Every time the messages state variable changes
      // we need to reassign the `onmessage` event listener
      // to wrap around the updated state variable value.
      webSocket.current.onmessage = (e) => {
        console.log(`Processing incoming message ${e.data}...`);

        const chatMessage = JSON.parse(e.data);
        const message = chatMessage.data;
        console.log('fifif',message)
        // message.created = new Date(message.created);

        setMessages([...messages, message]);
      };
    }
  }, [messages]);


  const handleSendMessage = (value) => {

      const newMessage = {
      value,
      userId,
      channelId
    };

    console.log('nm here',newMessage)

    const jsonNewMessage = JSON.stringify({
      type: "send-chat-message",
      data: newMessage,
    });

    console.log(`Sending message ${jsonNewMessage}...`);

    webSocket.current.send(jsonNewMessage);
  };


  const handleLeave = () => {};

  const handleOnChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendOnClick = () => {
    handleSendMessage(message);
    setMessage("");
  };

  const handleLeaveOnClick = () => {
    handleLeave();
  };

  if(loadedMessages) {
    return (
      <div className="bg-chat overflow-auto d-flex flex-column justify-content-end h-100">
        <div className='overflow-auto flex-grow-1 align-content-end'>
          <Container className="overflow-auto partScreen">
            {messages.map((m) => (

              <p className="text-white-75" key={m.id}>
                 <span className="small-letters">{new Date(m.createdAt).toLocaleTimeString()}</span><strong> {m.User.userName}:</strong>{" "}
                {m.value}
              </p>
            ))}
          </Container>
          <Form className='d-flex'>
            <Form.Control type='text' className='bg-chatbox border-0 mx-1' onChange={handleOnChange} placeholder="say something..." />
            <Button variant='secondary' onClick={handleSendOnClick} type="submit">Send</Button>
          </Form>
        </div>
      </div>
    );
  } else {
    return (
      <Form className='d-flex'>
        <Form.Control type='text' className='bg-chatbox border-0 mx-1' onChange={handleOnChange} placeholder="say something..." />
        <Button variant='secondary' onClick={handleSendOnClick} type="submit">Send</Button>
      </Form>
    )
  }
};

export default ChatPanel;
