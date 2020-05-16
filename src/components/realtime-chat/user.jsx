import React from "react";

const User = ({ user }) => {
  return (
    <React.Fragment>
      {user.username}
      <span className={listenOnline(user)}></span>
    </React.Fragment>
  );
};

export default User;

function listenOnline(user) {
  let classes = "status";
  classes += user.isOnline ? " -online" : "";
  return classes;
}
