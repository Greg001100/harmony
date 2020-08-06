import React, { useState, useEffect, useRef } from "react";
import {useSelector} from "react-redux"
import uuid from 'uuid';
import {wsUrl} from '../config'


const ChatPanel = () => {
  const userName = useSelector(state=> state.authentication.user.userName)
  const [username, setUsername] = useState(userName);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const webSocket = useRef(null);

  useEffect(() => {
    // If we don't have a username
    // then we don't need to create a WebSocket.
    if (!username) {
      return;
    }

    const ws = new WebSocket(wsUrl);

    ws.onopen = (e) => {
      console.log(`Connection open: ${e}`);
      // Set the messages state variable to trigger
      // the other effect to set the `onmessage` event listener.
      setMessages([]);
    };

    ws.onerror = (e) => {
      console.error(e);
    };

    ws.onclose = (e) => {
      console.log(`Connection closed: ${e}`);
      webSocket.current = null;
      setUsername("");
      setMessages([]);
    };

    webSocket.current = ws;

    // This function will be called when the next time
    // that the `username` state variable changes.
    return function cleanup() {
      if (webSocket.current !== null) {
        webSocket.current.close();
      }
    };
  }, [username]);

  // This effect will be called when the `App` component unmounts.
  useEffect(() => {
    return function cleanup() {
      if (webSocket.current !== null) {
        webSocket.current.close();
      }
    };
  }, []);

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
        message.created = new Date(message.created);

        setMessages([chatMessage.data, ...messages]);
      };
    }
  }, [messages]);

  const updateUsername = (username) => {
    setUsername(username);
  };

  const handleSendMessage = (message) => {
    const newMessage = {
      id: uuid(),
      username,
      message,
      created: new Date(),
    };

    const jsonNewMessage = JSON.stringify({
      type: "send-chat-message",
      data: newMessage,
    });

    console.log(`Sending message ${jsonNewMessage}...`);

    webSocket.current.send(jsonNewMessage);
  };

  const handleLeave = () => {
    setUsername("");
  };
  //--------------------------------------


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

  return (
    <div className="border border-dark bg-secondary overflow-auto flex-grow-1" >
      <div className="align-bottom" >
        <input type="text" value={message} onChange={handleOnChange} />
        <button type="button" onClick={handleSendOnClick}>
          Send
        </button>
        <button type="button" onClick={handleLeaveOnClick}>
          Leave
        </button>
        <div className="overflow-auto">
          {messages.map((m) => (
            <p className="text-info" key={m.id}>
              ({m.created.toLocaleTimeString()}) <strong>{m.username}:</strong>{" "}
              {m.message}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatPanel;
