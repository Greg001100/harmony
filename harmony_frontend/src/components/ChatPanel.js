import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { wsUrl } from "../config";
import { useParams } from "react-router-dom";
import { getMessages, clearMessages } from "../actions/ServerActions";
import { Container, Form, Button } from "react-bootstrap";

const ChatPanel = () => {
  const userName = useSelector((state) => state.authentication.user.userName);
  const userId = useSelector((state) => state.authentication.user.id);
  const loadedMessages = useSelector((state) => state.messages[0]);
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
    if (loadedMessages) {
      const ws = new WebSocket(wsUrl);

      ws.onopen = (e) => {
        console.log(`Connection open: ${e}`);
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
      return function cleanup() {
        if (webSocket.current !== null) {
          webSocket.current.close();
          console.log("cleanup");
        }
      };
    }
  }, [loadedMessages, channelId]);

  useEffect(() => {
    return function cleanup() {
      if (webSocket.current !== null) {
        webSocket.current.close();
        setMessages([]);
        dispatch(clearMessages());
      }
    };
  }, [channelId]);

  useEffect(() => {
    if (webSocket.current !== null) {
      webSocket.current.onmessage = (e) => {
        console.log(`Processing incoming message ${e.data}...`);

        const chatMessage = JSON.parse(e.data);
        const message = chatMessage.data;

        setMessages([...messages, message]);
      };
    }
  }, [messages]);

  const handleSendMessage = (value) => {
    const newMessage = {
      value,
      userId,
      channelId,
    };

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

  const handleSendOnClick = (e) => {
    handleSendMessage(message);
    setMessage("");
    e.preventDefault();
  };

  const handleLeaveOnClick = () => {
    handleLeave();
  };

  if (messages.length) {
    return (
      <div className="bg-chat overflow-auto d-flex flex-column justify-content-end h-100">
        <div className="overflow-auto flex-grow-1 align-content-end">
          <Container className="overflow-auto partScreen">
            {messages.map((m) => (
              <p className="text-white-75" key={m.id}>
                <span className="small-letters">
                  {new Date(m.createdAt).toLocaleTimeString()}
                </span>
                <strong> {m.User.userName}:</strong> {m.value}
              </p>
            ))}
          </Container>
        </div>
        <Form className="d-flex mb-4">
          <Form.Control
            type="text"
            className="bg-chatbox border-0 mx-1"
            onChange={handleOnChange}
            placeholder="say something..."
            value={message}
          />
          <Button variant="secondary" onClick={handleSendOnClick} type="submit">
            Send
          </Button>
        </Form>
      </div>
    );
  } else {
    return (
      <Form className="d-flex mb-4">
        <Form.Control
          type="text"
          className="bg-chatbox border-0 mx-1"
          onChange={handleOnChange}
          placeholder="say something..."
        />
        <Button variant="secondary" onClick={handleSendOnClick} type="submit">
          Send
        </Button>
      </Form>
    );
  }
};

export default ChatPanel;
