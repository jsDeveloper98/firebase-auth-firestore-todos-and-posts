import React, { Component } from "react";
import Post from "./post";
import { fetchPosts, deletePost } from "../../functions/post-functions";
import { Redirect } from "react-router-dom";
import { Spinner } from "react-bootstrap";

class Posts extends Component {
  _isMounted = false;
  state = {
    posts: [],
    search: "",
    filterPosts: false,
  };

  componentDidMount = () => {
    this._isMounted = true;

    this.setState({ loading: true }, () => {
      fetchPosts().then((posts) => {
        if (this._isMounted) {
          this.setState({
            posts,
            loading: false,
          });
        }
      });
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

  handleCheck = (e) => {
    this.setState({
      filterPosts: !this.state.filterPosts,
    });
  };

  render() {
    const { posts, search, loading, filterPosts } = this.state;

    if (!this.props.user) {
      return <Redirect to="/signin" />;
    }

    const selectedPosts = posts.filter((post) => {
      if (filterPosts) {
        return post.user === this.props.user.uid;
      } else {
        return posts;
      }
    });

    const filteredPosts = selectedPosts.filter((post) => {
      if (!search) {
        return [];
      } else {
        return (
          post.title.toLowerCase().indexOf(search.toLowerCase()) > -1 ||
          post.description.toLowerCase().indexOf(search.toLowerCase()) > -1 ||
          post.authorName.toLowerCase().indexOf(search.toLowerCase()) > -1
        );
      }
    });

    return (
      <div className="posts">
        <div className="container post-filters">
          <input
            type="search"
            placeholder="Search Post by Title or Description..."
            className="search-posts"
            autoComplete="off"
            value={this.state.search}
            onChange={this.handleChange}
            name="search"
          />

          <label className="filter-posts-label">My Posts</label>

          <label>
            <div className="toggle">
              <input
                className="toggle-state"
                type="checkbox"
                onChange={this.handleCheck}
              />
              <div className="toggle-inner">
                <div className="indicator"></div>
              </div>
              <div className="active-bg"></div>
            </div>
            <div className="label-text"></div>
          </label>
        </div>

        {filteredPosts.length ? (
          <div className="container posts-list">
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
            {loading ? (
              <Spinner animation="border" variant="secondary" />
            ) : (
              <React.Fragment>
                {!search ? <h1>No Posts</h1> : <h1>No Search Result</h1>}
              </React.Fragment>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default Posts;
