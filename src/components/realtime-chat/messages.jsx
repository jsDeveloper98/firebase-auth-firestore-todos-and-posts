import React, { Component } from "react";
import {
  createMessage,
  fetchMessages,
} from "../../functions/message-functions";
import firebase from "../../config/firebase";
import Message from "./message";
const _ = require("lodash");
const db = firebase.firestore();

class Messages extends Component {
  _isMounted = false;
  state = {
    value: "",
    messages: [],
    unsubscribeToMessages: null,
  };

  componentDidMount = () => {
    this._isMounted = true;

    const unsubscribeToMessages = this.subscribeToMessages();

    this.setState({ unsubscribeToMessages });

    fetchMessages().then((messages) => {
      if (this._isMounted) {
        this.setState({ messages });
      }
    });
  };

  subscribeToMessages = () => {
    const unsubscribe = db
      .collection("messages")
      .orderBy("createdAt", "asc")
      .onSnapshot((snap) => {
        const messages = [];
        snap.docs.map((doc) => {
          const { title, createdAt, user, authorName } = doc.data();

          return messages.push({
            id: doc.id,
            title,
            createdAt,
            user,
            authorName,
          });
        });

        if (this._isMounted) {
          this.setState({ messages });
        }
      });
    return unsubscribe;
  };

  componentWillUnmount = () => {
    this._isMounted = false;

    if (_.isFunction(this.state.unsubscribeToMessages)) {
      this.state.unsubscribeToMessages();
    }
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
      }, 400);

      this.setState({
        value: "",
      });
    }
  };

  render() {
    return (
      <div className="messages-main">
        <div className="read-container" id="container">
          {this.state.messages.map((message, i) => (
            <div className="message" key={i}>
              <Message
                key={message.id}
                message={message}
                user={this.props.user}
              />
            </div>
          ))}
        </div>
        <div className="write-container">
          <input
            type="text"
            placeholder="Write a message..."
            value={this.state.value}
            onChange={this.handleChange}
            name="value"
            onKeyDown={this.handleKeyDown}
          />
        </div>
      </div>
    );
  }
}

export default Messages;
