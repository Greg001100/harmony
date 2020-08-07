import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getChannels } from "../actions/ServerActions";
import { NavLink } from "react-router-dom";

const Channels = () => {

  const servers = useSelector((state) => state.servers[0]);
  const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(getChannels());
//   }, []);

  if (servers) {
    return (
      <>
        {servers.server.map((server) => {
          return (
            <p key={server.id}>
              <NavLink to={`home/${server.id}`}>
                {server.name}
              </NavLink>
            </p>
          );
        })}
      </>
    );
  } else {
    return <h1>Server List</h1>;
  }
};

export default Channels;
