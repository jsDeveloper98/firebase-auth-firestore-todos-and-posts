import React, { Component } from "react";
import { createPost } from "../../functions/post-functions";
import { Redirect } from "react-router-dom";
import HelperForm from "../../reusable-components/form";

class CreatePost extends Component {
  state = {
    title: "",
    description: "",
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  createPost = (e) => {
    e.preventDefault();
    const { title, description } = this.state;

    if (title && description) {
      createPost(title, description, this.props.user);
    }
    this.setState({
      title: "",
      description: "",
    });
  };

  render() {
    const { title, description } = this.state;

    if (!this.props.user) {
      return <Redirect to="/signin" />;
    }

    return (
      <HelperForm
        val1={title}
        val2={description}
        handleChange={this.handleChange}
        submit={this.createPost}
        prop="post"
      />
    );
  }
}

export default CreatePost;
