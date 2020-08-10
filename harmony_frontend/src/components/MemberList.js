import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMembers } from "../actions/ServerActions";
import { useParams } from "react-router-dom";

const MemberList = () => {

  const {serverId} = useParams();
  const members = useSelector((state) => state.members[0]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMembers(serverId));
  },[serverId]);

  if (members) {

    return (
      <>
        <h4>Members:</h4>
        <p>Greg</p>
        <p>Matt</p>
        <p>Tyler</p>
        <p>Stephanie</p>
        <p>Steve</p>
        <p>Erik</p>
      </>
    );
  } else {
    return <h4>Members:</h4>;
  }
};

export default MemberList;
