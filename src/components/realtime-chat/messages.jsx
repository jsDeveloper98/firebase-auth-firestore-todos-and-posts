import React, { Component } from "react";

class Messages extends Component {
  state = {};
  render() {
    return (
      <div className="messages-main">
        <div className="read-container"></div>
        <div className="write-container"></div>
      </div>
    );
  }
}

export default Messages;
