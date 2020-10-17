import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getServers } from "../actions/ServerActions";
import { NavLink, useHistory } from "react-router-dom";

const ServerList = (props) => {

  const userId = useSelector((state) => state.authentication.user.id);
  // const servers = useSelector((state) => state.servers[state.servers.length-1]);
  const servers = useSelector((state) => state.servers[0]);
  const dispatch = useDispatch();
  const history= useHistory();

  useEffect(() => {
    dispatch(getServers(userId));
    props.setServers(servers);
  }, [userId, servers]);

  if (props.servers) {
    console.log(props.servers)
    return (
      <>
        <h4>Servers:</h4>
        {props.servers.server.map((server) => {
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
