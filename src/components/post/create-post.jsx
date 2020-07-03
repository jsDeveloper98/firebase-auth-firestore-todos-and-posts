import React, { Component } from "react";
import { createPost } from "../../functions/post-functions";
import { Redirect } from "react-router-dom";
import HelperForm from "../../reusable-components/Form";

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
        title={title}
        description={description}
        handleChange={this.handleChange}
        disableBtn={this.disableBtn}
        createPost={this.createPost}
      />
    );
  }

  disableBtn(title, description) {
    let classes = "form-button";
    classes += title && description ? "" : " -disabled";
    return classes;
  }
}

export default CreatePost;
