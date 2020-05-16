import React from "react";
import editIcon from "../../images/edit.png";

const Message = ({ message, user, onRemove, onEdit }) => {
  return (
    <div className={detectCurrentUsersMessages(user, message)}>
      <div className="message-author-name">{message.authorName}</div>

      <div className="alert alert-dark message-title" role="alert">
        <div className={detectCurrentUsersArrow(user, message)}></div>
        {message.title}
      </div>

      <div className="message-settings">
        <div className="remove-message" onClick={() => onRemove(message)}>
          ✗
        </div>
        <img
          className="edit-message"
          src={editIcon}
          alt="edit"
          onClick={() => onEdit(message)}
        />
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
