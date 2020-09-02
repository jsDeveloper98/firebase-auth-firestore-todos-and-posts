import React, { useState, useEffect, useRef } from "react";
import {
  createMessage,
  deleteMessage,
  subscribeToMessages,
  addDeletedMessageForCurrentUser,
  subscribeToRemovedMessages,
  removeDeletedMessages,
  updateMessage,
} from "../../functions/message-functions";
import Message from "./message";
import { Modal, Button, Spinner } from "react-bootstrap";
const _ = require("lodash");

const Messages = ({ user }) => {
  const useIsMounted = () => {
    const isMounted = useRef(false);
    useEffect(() => {
      isMounted.current = true;
      return () => (isMounted.current = false);
    }, []);
    return isMounted;
  };

  const isMaunted = useIsMounted();

  const [state, setState] = useState({
    value: "",
    changedTitle: "",
    messages: [],
    removedMessageIds: [],
    showRemoveModal: false,
    showEditModal: false,
    messageToRemove: null,
    messageToEdit: null,
  });

  useEffect(() => {
    if (_.isEmpty(user)) {
      return;
    }

    setState((state) => ({ ...state, loading: true }));

    const messagesCallback = (messages) => {
      if (isMaunted) {
        setState((state) => ({ ...state, messages, loading: false }));
      }
    };

    const removedMessagesCallback = (removedMessageIds) => {
      if (isMaunted) {
        setState((state) => ({ ...state, removedMessageIds }));
      }
    };

    const unsubscribeToMessages = subscribeToMessages(messagesCallback);
    const unsubscribeToRemovedMessages = subscribeToRemovedMessages(
      user,
      removedMessagesCallback
    );

    return () => {
      [unsubscribeToMessages, unsubscribeToRemovedMessages].forEach((u) => {
        if (_.isFunction(u)) {
          u();
        }
      });
    };
  }, [user, isMaunted]);

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleKeyDown = (e) => {
    const { value } = state;

    if (e.key === "Enter" && value) {
      createMessage(value, user);

      setTimeout(() => {
        const container = document.getElementById("container");
        container.scrollTop = container.scrollHeight;
      }, 500);

      setState({
        ...state,
        value: "",
      });
    }
  };

  const removeMessage = () => {
    const { messageToRemove } = state;

    deleteMessage(messageToRemove);
    removeDeletedMessages(messageToRemove);

    setState({
      ...state,
      showRemoveModal: false,
      messageToRemove: null,
    });
  };

  const showRemoveMessageModal = (message) => {
    setState({
      ...state,
      showRemoveModal: true,
      messageToRemove: message,
    });
  };

  const hideRemoveMessageModal = () => {
    setState({
      ...state,
      showRemoveModal: false,
      messageToRemove: null,
    });
  };

  const removeMessageForCurrentUser = () => {
    addDeletedMessageForCurrentUser(user, state.messageToRemove);
    setState({
      ...state,
      showRemoveModal: false,
      messageToRemove: null,
    });
  };

  const showEditMessageModal = (message) => {
    setState({
      ...state,
      showEditModal: true,
      messageToEdit: message,
    });
  };

  const hideEditMessageModel = () => {
    setState({
      ...state,
      showEditModal: false,
      messageToEdit: null,
    });
  };

  const editMessage = () => {
    const { messageToEdit, changedTitle } = state;

    updateMessage(messageToEdit, changedTitle);

    setState({
      ...state,
      showEditModal: false,
      messageToEdit: null,
    });
  };

  const filteredMessages = state.messages.filter((message) => {
    if (state.removedMessageIds) {
      return !state.removedMessageIds.includes(message.id);
    } else {
      return state.messages;
    }
  });

  return (
    <>
      return (
      <div className="messages-main">
        <div className="read-container" id="container">
          {filteredMessages.length ? (
            <>
              {filteredMessages.map((message, i) => (
                <div className="message" key={i}>
                  <Message
                    key={message.id}
                    message={message}
                    user={user}
                    onRemove={showRemoveMessageModal}
                    onEdit={showEditMessageModal}
                  />
                </div>
              ))}
            </>
          ) : (
            <div className="empty-messages">
              {state.loading ? (
                <Spinner animation="border" variant="secondary" />
              ) : (
                <h1>No Messages</h1>
              )}
            </div>
          )}
        </div>
        <div className="write-container">
          <input
            type="text"
            placeholder="Write a message..."
            value={state.value}
            onChange={handleChange}
            name="value"
            onKeyDown={handleKeyDown}
            autoComplete="off"
          />
        </div>

        {state.showRemoveModal ? (
          <div className="delete-message-conf-background">
            <Modal.Dialog className="delete-message-confirmation">
              <Modal.Header closeButton onClick={hideRemoveMessageModal}>
                <Modal.Title>Delete this Message?</Modal.Title>
              </Modal.Header>

              <Modal.Footer>
                <Button
                  onClick={removeMessageForCurrentUser}
                  variant="secondary"
                >
                  Only for me
                </Button>
                {state.messageToRemove.user === user.uid ? (
                  <Button onClick={removeMessage} variant="secondary">
                    Delete for Everyone
                  </Button>
                ) : null}
              </Modal.Footer>
            </Modal.Dialog>
          </div>
        ) : null}

        {state.showEditModal ? (
          <div className="modal-bg">
            <Modal.Dialog className="edit-post-modal">
              <Modal.Header>
                <input
                  type="text"
                  className="edit-post-input"
                  onChange={handleChange}
                  value={state.changedTitle}
                  name="changedTitle"
                  placeholder="Title"
                  autoComplete="off"
                  autoFocus="on"
                />
              </Modal.Header>

              <Modal.Footer>
                <Button
                  className="close-edit-post-modal-btn"
                  variant="secondary"
                  onClick={hideEditMessageModel}
                >
                  Close
                </Button>
                <Button
                  variant="primary"
                  className={disableBtn(state.changedTitle)}
                  onClick={editMessage}
                >
                  Save changes
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Messages;

const disableBtn = (changedTitle) => {
  let classes = "";
  classes += changedTitle ? "" : " -disabled";
  return classes;
};
