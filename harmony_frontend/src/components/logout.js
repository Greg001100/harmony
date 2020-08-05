import React from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { logout } from "../actions/authentication";

const Logout = () => {
    const dispatch = useDispatch();
    const handleClick = () => dispatch(logout())

    return (
        <>
            <Button variant="secondary" onClick={handleClick}>Logout</Button>
        </>
    )
}

export default Logout;
