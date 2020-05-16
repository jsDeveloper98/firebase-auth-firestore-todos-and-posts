import React from "react";
import { Redirect } from "react-router-dom";
import Messages from "./messages";

const Chat = ({ user }) => {
  if (!user) {
    return <Redirect to="signin" />;
  }

  return (
    <div className="chat-container">
      <div className="container">
        <Messages user={user} />
      </div>
    </div>
  );
};

export default Chat;
