import React, { Component } from "react";
import Post from "./post";
import { fetchPosts, deletePost } from "../functions/post-functions";
import { Redirect } from "react-router-dom";

class Posts extends Component {
  _isMounted = false;
  state = {
    posts: [],
  };

  componentDidMount = () => {
    this._isMounted = true;
    fetchPosts().then((posts) => {
      if (this._isMounted) {
        this.setState({ posts });
      }
    });
  };

  componentWillUnmount = () => {
    this._isMounted = false;
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
      <React.Fragment>
        {this.state.posts.length ? (
          <div className="container posts-list">
            {this.state.posts.map((post, i) => (
              <div className="post-item" key={i}>
                <Post
                  key={post.id}
                  post={post}
                  user={this.props.user}
                  onRemove={this.removePost}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-posts">
            <h1>No Posts</h1>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default Posts;
