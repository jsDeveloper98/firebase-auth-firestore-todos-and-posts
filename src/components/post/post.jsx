import React from "react";
import { Jumbotron, Button } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";

const Post = ({ onRemove, post, user }) => {
  if (!user) {
    return <Redirect to="/signin" />;
  }

  return (
    <Jumbotron className="post-item-jumbotron">
      <h1 className="post-title">{post.title}</h1>
      <p className="post-description">{post.description}</p>
      <Link
        to={{
          pathname: "/post/" + post.id,
          state: {
            selectedPost: post,
          },
        }}
      >
        <Button variant="secondary">Open Post</Button>
      </Link>
      {post.user !== user.uid ? (
        <div className="author">Created by {post.authorName}</div>
      ) : (
        <div className="author">Created by You</div>
      )}

      {post.user === user.uid ? (
        <div className="remove-post" onClick={() => onRemove(post)}>
          ✗
        </div>
      ) : null}
    </Jumbotron>
  );
};

export default Post;
