import React from "react";
import { Redirect } from "react-router-dom";
import BootstrapJumbotron from "../../reusable-components/bootstrap-jumbotreon";

const Post = ({ onEdit, onRemove, post, user }) => {
  return (
    <>
      {!user ? <Redirect to="/signin" /> : null}

      <BootstrapJumbotron
        onEdit={onEdit}
        onRemove={onRemove}
        post={post}
        user={user}
      />
    </>
  );
};

export default Post;
