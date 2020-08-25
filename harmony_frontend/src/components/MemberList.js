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
    const users = members.members.Users
    console.log(users)

    return (
      <>
        <h4>Members:</h4>
        {users.map((user) => {
          return (
            <p key={user.id}>
              {user.userName} {user.id}
            </p>
          );
        })}
      </>
    );
  } else {
    return <h4>Members:</h4>;
  }
};

export default MemberList;
