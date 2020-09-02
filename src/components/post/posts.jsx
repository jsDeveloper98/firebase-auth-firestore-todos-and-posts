import React, { useState, useEffect, useRef } from "react";
import {
  deletePost,
  updatePost,
  subscribeToPosts,
} from "../../functions/post-functions";
import { Redirect } from "react-router-dom";
import EditModal from "../../reusable-components/edit-modal";
import PostsInfo from "./posts-info";
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
    search: "",
    changedTitle: "",
    changedDescription: "",
    loading: false,
  });

  useEffect(() => {
    setState((state) => ({ ...state, loading: true }));

    const callback = (posts) => {
      if (isMaunted) {
        setState((state) => ({ ...state, posts, loading: false }));
      }
    };

    const unsubsribe = subscribeToPosts(callback);
    return () => {
      if (_.isFunction(unsubsribe)) {
        unsubsribe();
      }
    };
  }, [isMaunted]);

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

      <PostsInfo
        onChange={handleChange}
        onCheck={handleCheck}
        onRemove={removePost}
        onShow={showEditModal}
        value={state.search}
        posts={filteredPosts}
        user={user}
        isLoading={state.loading}
      />

      {state.showEdit ? (
        <EditModal
          onHide={hideEditModal}
          onChange={handleChange}
          onRemove={removePost}
          onEdit={editPost}
          changedTitle={state.changedTitle}
          changedDescription={state.changedDescription}
        />
      ) : null}
    </>
  );
};

export default Posts;
