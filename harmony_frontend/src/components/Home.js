import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../actions/authentication";

const Home= () => {
    const name = useSelector(state=> state.authentication.userName)

    return (
        <>
            <h1>Welcome, {name} </h1>
            <p>test</p>
        </>
    )
}

export default Home;
