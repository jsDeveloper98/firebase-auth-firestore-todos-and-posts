import React from "react";
import { Jumbotron, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const PostDetails = () => {
  return (
    <div className="post-item-details">
      <Jumbotron>
        <h1>hgjghjghj</h1>
        <p>jhkhjkhjk</p>
        <Link to="/posts">
          <p>
            <Button className="close-post-btn" variant="secondary">
              Close Post
            </Button>
          </p>
        </Link>
      </Jumbotron>
    </div>
  );
};

export default PostDetails;
