import React from "react";
import BootstrapJumbotron from "../../reusable-components/bootstrap-jumbotreon";
import { connect } from "react-redux";

const PostDetails = ({ post }) => {
  return (
    <div className="post-item-details">
      <BootstrapJumbotron post={post} detailedView={true} />
    </div>
  );
};

const mapStateToProps = (state, { match }) => {
  const { id } = match.params;

  return {
    post: state.posts.posts.find((post) => post.id === id),
  };
};

export default connect(mapStateToProps)(PostDetails);
