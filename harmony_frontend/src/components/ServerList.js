import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getServers } from "../actions/ServerActions";
import { NavLink, useHistory } from "react-router-dom";

const ServerList = () => {

  const userId = useSelector((state) => state.authentication.user.id);
  // const servers = useSelector((state) => state.servers[state.servers.length-1]);
  const servers = useSelector((state) => state.servers[0]);
  const dispatch = useDispatch();
  const history= useHistory();

  useEffect(() => {
    dispatch(getServers(userId));
  }, [userId, servers]);

  if (servers) {
    return (
      <>
        <h4>Servers:</h4>
        {servers.server.map((server) => {
          return (
            <p key={server.id}>
              <NavLink className='text-secondary font-weight-bold' to={`/home/${server.id}/${server.Channels[0].id}`}>
                {server.name}
              </NavLink>
            </p>
          );
        })}
      </>
    );
  } else {
    return <h4>Servers:</h4>;
  }
};

export default ServerList;
