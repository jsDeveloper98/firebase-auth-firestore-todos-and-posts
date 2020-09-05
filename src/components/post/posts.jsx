import React, { useState, useEffect } from "react";
import { deletePost, updatePost } from "../../functions/post-functions";
import { Redirect } from "react-router-dom";
import EditModal from "../../reusable-components/edit-modal";
import PostsInfo from "./posts-info";
import { useDispatch, useSelector } from "react-redux";
import { subscribeToPosts } from "../../redux/actions/post-actions";
const _ = require("lodash");

const Posts = ({ user }) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.app.loading);
  const posts = useSelector((state) => state.posts.posts);

  const [state, setState] = useState({
    filterPosts: false,
    showEdit: false,
    postToEdit: null,
    search: "",
    changedTitle: "",
    changedDescription: "",
  });

  useEffect(() => {
    let unsubscribe;

    const callback = (u) => {
      unsubscribe = u;
    };

    dispatch(subscribeToPosts(callback));
    return () => {
      if (_.isFunction(unsubscribe)) {
        unsubscribe();
      }
    };
  }, [dispatch]);

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

  const seletedPosts = posts
    ? posts.filter((post) => {
        if (state.filterPosts) {
          return post.user === user.uid;
        } else {
          return posts;
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
        loading={loading}
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
