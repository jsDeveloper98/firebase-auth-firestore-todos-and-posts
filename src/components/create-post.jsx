import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import { createPost } from "../functions/post-functions";
import { Redirect } from "react-router-dom";

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
      createPost(title, description);
    }
    this.setState({
      title: "",
      description: "",
    });
  };

  render() {
    if (!this.props.user) {
      return <Redirect to="/signin" />;
    }
    return (
      <Form className="form-settings">
        <Form.Group controlId="formBasicEmail">
          <Form.Label className="label-settings">Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Title"
            name="title"
            onChange={this.handleChange}
            value={this.state.title}
            autoComplete="off"
            className="input-settings"
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label className="label-settings">Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Description"
            name="description"
            onChange={this.handleChange}
            value={this.state.description}
            autoComplete="off"
            className="input-settings"
          />
        </Form.Group>
        <Button
          className="form-button"
          variant="secondary"
          type="submit"
          onClick={this.createPost}
        >
          Create Post
        </Button>
      </Form>
    );
  }
}

export default CreatePost;
