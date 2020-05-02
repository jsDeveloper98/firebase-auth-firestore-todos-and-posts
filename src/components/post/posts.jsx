import React, { Component } from "react";
import Post from "./post";
import { fetchPosts, deletePost } from "../../functions/post-functions";
import { Redirect } from "react-router-dom";
import { Spinner } from "react-bootstrap";
const _ = require("lodash");

class Posts extends Component {
  _isMounted = false;
  state = {
    posts: [],
    search: "",
  };

  componentDidMount = () => {
    this._isMounted = true;
    const { user } = this.props;

    this.setState({ loading: true }, () => {
      if (!_.isEmpty(user)) {
        fetchPosts(user).then((posts) => {
          if (this._isMounted) {
            this.setState({
              posts,
              loading: false,
            });
          }
        });
      }
    });
  };

  componentWillUnmount = () => {
    this._isMounted = false;
  };

  removePost = (post) => {
    deletePost(post);

    const posts = this.state.posts.filter((item) => post.id !== item.id);

    this.setState({ posts });
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { posts, search } = this.state;

    if (!this.props.user) {
      return <Redirect to="/signin" />;
    }

    const filteredPosts = posts.filter((post) => {
      if (!search) {
        return [];
      } else {
        return (
          post.title.indexOf(search) > -1 ||
          post.description.indexOf(search) > -1
        );
      }
    });

    return (
      <React.Fragment>
        {posts.length ? (
          <div className="container posts-list">
            <input
              type="search"
              placeholder="Search Post by Title or Description..."
              className="search-posts"
              autoComplete="off"
              value={this.state.search}
              onChange={this.handleChange}
              name="search"
            />

            {filteredPosts.map((post, i) => (
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
            {this.state.loading ? (
              <Spinner animation="border" variant="secondary" />
            ) : (
              <h1>No Posts</h1>
            )}
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default Posts;
