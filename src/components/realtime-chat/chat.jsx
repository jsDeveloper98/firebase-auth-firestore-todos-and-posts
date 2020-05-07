import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Messages from "./messages";

class Chat extends Component {
  state = {};
  render() {
    if (!this.props.user) {
      return <Redirect to="signin" />;
    }

    return (
      <div className="chat-container">
        <div className="container">
          <Messages user={this.props.user} />
        </div>
      </div>
    );
  }
}

export default Chat;
