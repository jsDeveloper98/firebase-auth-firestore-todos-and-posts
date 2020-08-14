import React from "react";
import { Redirect } from "react-router-dom";
import BootstrapJumbotron from "../../reusable-components/bootstrap-jumbotreon";

const Post = ({ onEdit, onRemove, post, user }) => {
  if (!user) {
    return <Redirect to="/signin" />;
  }

  return (
    <BootstrapJumbotron
      onEdit={onEdit}
      onRemove={onRemove}
      post={post}
      user={user}
    />
  );
};

export default Post;
