import React, { Component } from "react";
import Post from "./post";

class Posts extends Component {
  state = {};
  render() {
    return (
      <div className="posts-list">
        <div className="post-item">
          <Post />
        </div>
      </div>
    );
  }
}

export default Posts;
