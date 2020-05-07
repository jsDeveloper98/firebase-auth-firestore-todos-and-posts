import React from "react";

const Message = ({ message, user }) => {
  return (
    <div className={detectCurrentUsersMessages(user, message)}>
      <div className="message-author-name">{message.authorName}</div>

      <div className="alert alert-dark message-title" role="alert">
        <div className={detectCurrentUsersArrow(user, message)}></div>
        {message.title}
      </div>
    </div>
  );
};

export default Message;

function detectCurrentUsersArrow(user, message) {
  let classes = "message-arrow";
  classes += user.uid === message.user ? " -current-users-arrow" : "";
  return classes;
}

function detectCurrentUsersMessages(user, message) {
  let classes = "message-wrapper";
  classes += user.uid === message.user ? " -current-users-message" : "";
  return classes;
}
