import React, { Component } from "react";
import { Jumbotron, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { fetchPosts } from "../functions/post-functions";

class PostDetails extends Component {
  state = {
    selectedPost: {},
  };

  componentDidMount = () => {
    fetchPosts().then((posts) => {
      const selectedPost = posts.filter(
        (post) => post.id === this.props.match.params.id
      );
      this.setState({ selectedPost: selectedPost[0] });
    });
  };

  render() {
    return (
      <div className="post-item-details">
        <Jumbotron>
          <h1 className="post-details-title">
            {this.state.selectedPost.title}
          </h1>
          <p>{this.state.selectedPost.description}</p>
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
  }
}

export default PostDetails;
