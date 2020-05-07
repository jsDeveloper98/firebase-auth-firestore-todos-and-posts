import React, { Component } from "react";
import Post from "./post";
import {
  fetchPosts,
  deletePost,
  updatePost,
} from "../../functions/post-functions";
import { Redirect } from "react-router-dom";
import { Spinner, Modal, Button } from "react-bootstrap";
import firebase from "../../config/firebase";
const _ = require("lodash");
const db = firebase.firestore();

class Posts extends Component {
  _isMounted = false;
  state = {
    posts: [],
    search: "",
    filterPosts: false,
    showEdit: false,
    postToEdit: null,
    unsubscribeToPosts: null,
    changedTitle: "",
    changedDescription: "",
  };

  componentDidMount = () => {
    this._isMounted = true;

    this.setState({ loading: true }, () => {
      const unsubscribeToPosts = this.subscribeToPosts();

      this.setState({ unsubscribeToPosts });

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

  subscribeToPosts = () => {
    const unsubscribe = db
      .collection("posts")
      .orderBy("createdAt", "desc")
      .onSnapshot((snap) => {
        const posts = [];
        snap.docs.map((doc) => {
          const {
            title,
            description,
            createdAt,
            user,
            authorName,
          } = doc.data();

          return posts.push({
            id: doc.id,
            title,
            description,
            createdAt,
            user,
            authorName,
          });
        });
        if (this._isMounted) {
          this.setState({ posts });
        }
      });
    return unsubscribe;
  };

  componentWillUnmount = () => {
    this._isMounted = false;

    if (_.isFunction(this.state.unsubscribeToPosts)) {
      this.state.unsubscribeToPosts();
    }
  };

  removePost = (post) => {
    deletePost(post);
  };

  showEditModal = (post) => {
    this.setState({
      showEdit: true,
      postToEdit: post,
    });
  };

  hideEditModal = () => {
    this.setState({
      showEdit: false,
      postToEdit: null,
    });
  };

  editPost = () => {
    const { postToEdit, changedTitle, changedDescription } = this.state;

    updatePost(postToEdit, changedTitle, changedDescription);

    this.setState({
      postToEdit: null,
      showEdit: false,
    });
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
    const {
      posts,
      search,
      loading,
      filterPosts,
      showEdit,
      changedTitle,
      changedDescription,
    } = this.state;

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
      <React.Fragment>
        <div className="posts">
          <div className="container post-filters">
            <input
              type="search"
              placeholder="Search Post by Title or Description..."
              className="search-posts"
              autoComplete="off"
              value={search}
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
                    onEdit={this.showEditModal}
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
        {showEdit ? (
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

              <Modal.Body>
                <input
                  type="text"
                  className="edit-post-input"
                  onChange={this.handleChange}
                  value={changedDescription}
                  name="changedDescription"
                  placeholder="Description"
                  autoComplete="off"
                />
              </Modal.Body>

              <Modal.Footer>
                <Button variant="secondary" onClick={this.hideEditModal}>
                  Close
                </Button>
                <Button
                  variant="primary"
                  className={this.disableBtn(changedTitle, changedDescription)}
                  onClick={this.editPost}
                >
                  Save changes
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </div>
        ) : null}
      </React.Fragment>
    );
  }

  disableBtn(changedTitle, changedDescription) {
    let classes = "";
    classes += changedTitle && changedDescription ? "" : " -disabled";
    return classes;
  }
}

export default Posts;
