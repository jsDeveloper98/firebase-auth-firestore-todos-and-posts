import React from "react";
import { Form, Button } from "react-bootstrap";

const HelperForm = ({
  title,
  description,
  handleChange,
  disableBtn,
  createPost,
}) => {
  return (
    <Form className="form-settings">
      <Form.Group controlId="formBasicEmail">
        <Form.Label className="label-settings">Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Title"
          name="title"
          onChange={handleChange}
          value={title}
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
          onChange={handleChange}
          value={description}
          autoComplete="off"
          className="input-settings"
        />
      </Form.Group>
      <Button
        className={disableBtn(title, description)}
        variant="secondary"
        type="submit"
        onClick={createPost}
      >
        Create Post
      </Button>
    </Form>
  );
};

export default HelperForm;
