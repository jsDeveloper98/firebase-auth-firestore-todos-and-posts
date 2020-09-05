import React from "react";
import { Jumbotron, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import editIcon from "../images/edit.png";

const BootstrapJumbotron = ({
  onEdit,
  onRemove,
  post,
  user,
  detailedView = false,
}) => {
  return (
    <Jumbotron className="post-item-jumbotron">
      <h1 className="post-title">{post.title}</h1>
      <p className="post-description">{post.description}</p>

      {detailedView ? (
        <Link to="/posts">
          <Button className="close-post-btn" variant="secondary">
            Close Post
          </Button>
        </Link>
      ) : (
        <Link to={"/post/" + post.id}>
          <Button variant="secondary">Open Post</Button>
        </Link>
      )}
      {onEdit ? (
        <>
          {post.user !== user.uid ? (
            <div className="author">Created by {post.authorName}</div>
          ) : (
            <div className="author">Created by You</div>
          )}

          {post.user === user.uid ? (
            <div className="post-settings">
              <img
                className="edit-post"
                src={editIcon}
                alt="edit"
                onClick={() => onEdit(post)}
              />
              <div className="remove-post" onClick={() => onRemove(post)}>
                ✗
              </div>
            </div>
          ) : null}
        </>
      ) : null}
    </Jumbotron>
  );
};

export default BootstrapJumbotron;
