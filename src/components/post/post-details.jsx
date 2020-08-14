import React from "react";
import BootstrapJumbotron from "../../reusable-components/bootstrap-jumbotreon";

const PostDetails = ({ location }) => {
  const { selectedPost } = location.state;

  return (
    <div className="post-item-details">
      <BootstrapJumbotron post={selectedPost} detailedView={true} />
    </div>
  );
};

export default PostDetails;
