import React, { Component } from "react";
import Post from "./post";
import { fetchPosts, deletePost } from "../functions/post-functions";
import { Redirect } from "react-router-dom";

class Posts extends Component {
  state = {
    posts: [],
  };

  componentDidMount = () => {
    fetchPosts().then((posts) => {
      this.setState({ posts });
    });
  };

  removePost = (post) => {
    deletePost(post).then(() => {
      const posts = this.state.posts.filter((item) => post.id !== item.id);
      this.setState({ posts });
    });
  };

  render() {
    if (!this.props.user) {
      return <Redirect to="/signin" />;
    }
    return (
      <div className="container posts-list">
        {this.state.posts.map((post, i) => (
          <div className="post-item" key={i}>
            <Post key={post.id} post={post} onRemove={this.removePost} />
          </div>
        ))}
      </div>
    );
  }
}

export default Posts;
