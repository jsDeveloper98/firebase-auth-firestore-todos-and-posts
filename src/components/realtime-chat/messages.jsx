import React, { Component } from "react";
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

class Messages extends Component {
  _isMounted = false;

  state = {
    value: "",
    changedTitle: "",
    messages: [],
    removedMessageIds: [],
    unsubscribeToMessages: null,
    showRemoveModal: false,
    showEditModal: false,
    messageToRemove: null,
    messageToEdit: null,
  };

  componentDidMount = () => {
    this._isMounted = true;

    if (this._isMounted) {
      this.setState({ loading: true }, () => {
        this.subscribeToMessages();
        this.subscribeToRemovedMessages();
      });
    }
  };

  subscribeToMessages = () => {
    this.unsubscribeMessages();

    const callback = (messages) => {
      this.setState({ messages, loading: false });
    };

    const unsubscribeToMessages = subscribeToMessages(callback);
    this.setState({ unsubscribeToMessages });
  };

  unsubscribeMessages = () => {
    const { unsubscribeToMessages } = this.state;

    if (_.isFunction(unsubscribeToMessages)) {
      unsubscribeToMessages();
    }
  };

  subscribeToRemovedMessages = () => {
    const { user } = this.props;
    this.unsubscribeRemovedMessages();

    if (_.isEmpty(user)) {
      return;
    }

    const callback = (removedMessageIds) => {
      this.setState({ removedMessageIds });
    };

    const unsubscribeToRemovedMessages = subscribeToRemovedMessages(
      user,
      callback
    );
    this.setState({ unsubscribeToRemovedMessages });
  };

  unsubscribeRemovedMessages = () => {
    const { unsubscribeToRemovedMessages } = this.state;

    if (_.isFunction(unsubscribeToRemovedMessages)) {
      unsubscribeToRemovedMessages();
    }
  };

  componentWillUnmount = () => {
    this._isMounted = false;
    this.unsubscribeMessages();
    this.unsubscribeRemovedMessages();
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleKeyDown = (e) => {
    const { value } = this.state;

    if (e.key === "Enter" && value) {
      createMessage(value, this.props.user);

      setTimeout(() => {
        const container = document.getElementById("container");
        container.scrollTop = container.scrollHeight;
      }, 500);

      this.setState({
        value: "",
      });
    }
  };

  removeMessage = () => {
    const { messageToRemove } = this.state;

    deleteMessage(messageToRemove);
    removeDeletedMessages(messageToRemove);

    this.setState({
      showRemoveModal: false,
      messageToRemove: null,
    });
  };

  showRemoveMessageModal = (message) => {
    this.setState({
      showRemoveModal: true,
      messageToRemove: message,
    });
  };

  hideRemoveMessageModal = () => {
    this.setState({
      showRemoveModal: false,
      messageToRemove: null,
    });
  };

  removeMessageForCurrentUser = () => {
    addDeletedMessageForCurrentUser(
      this.props.user,
      this.state.messageToRemove
    );
    this.setState({
      showRemoveModal: false,
      messageToRemove: null,
    });
  };

  showEditMessageModal = (message) => {
    this.setState({
      showEditModal: true,
      messageToEdit: message,
    });
  };

  hideEditMessageModel = () => {
    this.setState({
      showEditModal: false,
      messageToEdit: null,
    });
  };

  editMessage = () => {
    const { messageToEdit, changedTitle } = this.state;

    updateMessage(messageToEdit, changedTitle);

    this.setState({
      showEditModal: false,
      messageToEdit: null,
    });
  };

  render() {
    const {
      messages,
      removedMessageIds,
      showRemoveModal,
      showEditModal,
      value,
      messageToRemove,
      changedTitle,
      loading,
    } = this.state;

    const { user } = this.props;

    const filteredMessages = messages.filter((message) => {
      if (removedMessageIds) {
        return !removedMessageIds.includes(message.id);
      } else {
        return messages;
      }
    });

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
                    onRemove={this.showRemoveMessageModal}
                    onEdit={this.showEditMessageModal}
                  />
                </div>
              ))}
            </>
          ) : (
            <div className="empty-messages">
              {loading ? (
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
            value={value}
            onChange={this.handleChange}
            name="value"
            onKeyDown={this.handleKeyDown}
            autoComplete="off"
          />
        </div>

        {showRemoveModal ? (
          <div className="delete-message-conf-background">
            <Modal.Dialog className="delete-message-confirmation">
              <Modal.Header closeButton onClick={this.hideRemoveMessageModal}>
                <Modal.Title>Delete this Message?</Modal.Title>
              </Modal.Header>

              <Modal.Footer>
                <Button
                  onClick={this.removeMessageForCurrentUser}
                  variant="secondary"
                >
                  Only for me
                </Button>
                {messageToRemove.user === user.uid ? (
                  <Button onClick={this.removeMessage} variant="secondary">
                    Delete for Everyone
                  </Button>
                ) : null}
              </Modal.Footer>
            </Modal.Dialog>
          </div>
        ) : null}

        {showEditModal ? (
          <div className="modal-bg">
            <Modal.Dialog className="edit-post-modal">
              <Modal.Header>
                <input
                  type="text"
                  className="edit-post-input"
                  onChange={this.handleChange}
                  value={changedTitle}
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
                  onClick={this.hideEditMessageModel}
                >
                  Close
                </Button>
                <Button
                  variant="primary"
                  className={this.disableBtn(changedTitle)}
                  onClick={this.editMessage}
                >
                  Save changes
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </div>
        ) : null}
      </div>
    );
  }

  disableBtn(changedTitle) {
    let classes = "";
    classes += changedTitle ? "" : " -disabled";
    return classes;
  }
}

export default Messages;
