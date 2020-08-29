import React, { useState } from "react";
import { createPost } from "../../functions/post-functions";
import { Redirect } from "react-router-dom";
import HelperForm from "../../reusable-components/form";

const CreatePost = ({ user }) => {
  const [state, setState] = useState({
    title: "",
    description: "",
  });

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const addPost = (e) => {
    e.preventDefault();
    const { title, description } = state;

    if (title && description) {
      createPost(title, description, user);
    }

    setState({
      title: "",
      description: "",
    });
  };

  return (
    <>
      {!user ? <Redirect to="/signin" /> : null}

      <HelperForm
        val1={state.title}
        val2={state.description}
        handleChange={handleChange}
        submit={addPost}
        prop="post"
      />
    </>
  );
};

export default CreatePost;
