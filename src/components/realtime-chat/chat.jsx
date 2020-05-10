import React from "react";
import { Redirect } from "react-router-dom";
import Messages from "./messages";

const Chat = (props) => {
  if (!props.user) {
    return <Redirect to="signin" />;
  }

  return (
    <div className="chat-container">
      <div className="container">
        <Messages user={props.user} />
      </div>
    </div>
  );
};

export default Chat;
