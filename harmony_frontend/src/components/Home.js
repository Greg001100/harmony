import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../actions/authentication";
import ChatRoom from './ChatRoom'
import Logout from "./logout";

const Home= () => {
    const name = useSelector(state=> state.authentication.userName)

    return (
        <>
            <h1>Welcome, {name} </h1>
            <Logout></Logout>
            <ChatRoom />
        </>
    )
}

export default Home;
