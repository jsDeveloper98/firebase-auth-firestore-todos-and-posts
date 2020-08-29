import React, { useState, useEffect, useRef } from "react";
import Post from "./post";
import {
  deletePost,
  updatePost,
  subscribeToPosts,
} from "../../functions/post-functions";
import { Redirect } from "react-router-dom";
import { Spinner, Modal, Button } from "react-bootstrap";
const _ = require("lodash");

const Posts = ({ user }) => {
  const useIsMounted = () => {
    const isMounted = useRef(false);
    useEffect(() => {
      isMounted.current = true;
      return () => (isMounted.current = false);
    }, []);
    return isMounted;
  };

  const isMaunted = useIsMounted();

  const [state, setState] = useState({
    posts: [],
    filterPosts: false,
    showEdit: false,
    postToEdit: null,
    unsubscribeToPosts: null,
    search: "",
    changedTitle: "",
    changedDescription: "",
    loading: false,
  });

  useEffect(() => {
    if (isMaunted) {
      setState({ ...state, loading: true });
    }

    const callback = (posts) => {
      if (isMaunted) {
        setState({ ...state, posts, loading: false });
      }
    };

    const unsubsribe = subscribeToPosts(callback);
    return () => {
      if (_.isFunction(unsubsribe)) {
        unsubsribe();
      }
    };
  }, []);

  const removePost = (post) => {
    deletePost(post);
  };

  const showEditModal = (post) => {
    setState({
      ...state,
      showEdit: true,
      postToEdit: post,
    });
  };

  const hideEditModal = () => {
    setState({
      ...state,
      showEdit: false,
      postToEdit: null,
    });
  };

  const editPost = () => {
    const { postToEdit, changedTitle, changedDescription } = state;

    updatePost(postToEdit, changedTitle, changedDescription);

    setState({
      ...state,
      postToEdit: null,
      showEdit: false,
    });
  };

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheck = (e) => {
    setState({
      ...state,
      filterPosts: !state.filterPosts,
    });
  };

  const seletedPosts = state.posts
    ? state.posts.filter((post) => {
        if (state.filterPosts) {
          return post.user === user.uid;
        } else {
          return state.posts;
        }
      })
    : [];

  const filteredPosts = seletedPosts.filter((post) => {
    const { search } = state;

    if (!search) {
      return seletedPosts;
    } else {
      return (
        post.title.toLowerCase().indexOf(search.toLowerCase()) > -1 ||
        post.description.toLowerCase().indexOf(search.toLowerCase()) > -1 ||
        post.authorName.toLowerCase().indexOf(search.toLowerCase()) > -1
      );
    }
  });

  return (
    <>
      {!user ? <Redirect to="/signin" /> : null}

      <div className="posts">
        <div className="container post-filters">
          <input
            type="search"
            placeholder="Search Post by Title or Description..."
            className="search-posts"
            autoComplete="off"
            value={state.search}
            onChange={handleChange}
            name="search"
          />
          <label className="filter-posts-label">My Posts</label>
          <label>
            <div className="toggle">
              <input
                className="toggle-state"
                type="checkbox"
                onChange={handleCheck}
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
                  user={user}
                  onRemove={removePost}
                  onEdit={showEditModal}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-posts">
            {state.loading ? (
              <Spinner animation="border" variant="secondary" />
            ) : (
              <React.Fragment>
                {!state.search ? <h1>No Posts</h1> : <h1>No Search Result</h1>}
              </React.Fragment>
            )}
          </div>
        )}
      </div>
      {state.showEdit ? (
        <div className="modal-bg">
          <Modal.Dialog className="edit-post-modal">
            <Modal.Header>
              <input
                type="text"
                className="edit-post-input"
                onChange={handleChange}
                value={state.changedTitle}
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
                onChange={handleChange}
                value={state.changedDescription}
                name="changedDescription"
                placeholder="Description"
                autoComplete="off"
              />
            </Modal.Body>

            <Modal.Footer>
              <Button
                className="close-edit-post-modal-btn"
                variant="secondary"
                onClick={hideEditModal}
              >
                Close
              </Button>
              <Button
                variant="primary"
                className={disableBtn(
                  state.changedTitle,
                  state.changedDescription
                )}
                onClick={editPost}
              >
                Save changes
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </div>
      ) : null}
    </>
  );
};

const disableBtn = (changedTitle, changedDescription) => {
  let classes = "";
  classes += changedTitle && changedDescription ? "" : " -disabled";
  return classes;
};

export default Posts;
