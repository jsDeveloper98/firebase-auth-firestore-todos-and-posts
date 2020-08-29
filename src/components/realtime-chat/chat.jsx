import React from "react";
import { Redirect } from "react-router-dom";
import Messages from "./messages";
import Users from "./users";

const Chat = ({ user }) => {
  return (
    <>
      {!user ? <Redirect to="signin" /> : null}

      <div className="chat-container">
        <div className="container">
          <Messages user={user} />
        </div>
        <div className="users-container">
          <Users user={user} />
        </div>
      </div>
    </>
  );
};

export default Chat;
