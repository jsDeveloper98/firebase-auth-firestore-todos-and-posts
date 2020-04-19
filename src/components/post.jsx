import React from "react";
import { Jumbotron, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Post = (props) => {
  return (
    <Jumbotron>
      <h1 className="post-title">{props.post.title}</h1>
      <p className="post-decription">{props.post.description}</p>
      <Link to={"/post/" + props.post.id}>
        <p>
          <Button variant="primary">Open Post</Button>
        </p>
      </Link>
      <div className="remove-post" onClick={() => props.onRemove(props.post)}>
        ✗
      </div>
    </Jumbotron>
  );
};

export default Post;
