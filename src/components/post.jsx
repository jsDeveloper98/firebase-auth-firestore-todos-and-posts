import React from "react";
import { Jumbotron, Button } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";

const Post = (props) => {
  if (!props.user) {
    return <Redirect to="/signin" />;
  }
  return (
    <Jumbotron>
      <h1 className="post-title">{props.post.title}</h1>
      <p className="post-decription">{props.post.description}</p>
      <Link
        to={{
          pathname: "/post/" + props.post.id,
          state: {
            selectedPost: props.post,
          },
        }}
      >
        <Button variant="primary">Open Post</Button>
      </Link>

      <div className="remove-post" onClick={() => props.onRemove(props.post)}>
        ✗
      </div>
    </Jumbotron>
  );
};

export default Post;
