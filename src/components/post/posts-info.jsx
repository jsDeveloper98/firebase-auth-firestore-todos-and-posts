import React from "react";
import Post from "./post";
import { Spinner } from "react-bootstrap";

const PostsInfo = ({
  value,
  onChange,
  onCheck,
  posts,
  user,
  loading,
  onRemove,
  onShow,
}) => {
  return (
    <div className="posts">
      <div className="container post-filters">
        <input
          type="search"
          placeholder="Search Post by Title or Description..."
          className="search-posts"
          autoComplete="off"
          value={value}
          onChange={onChange}
          name="search"
        />
        <label className="filter-posts-label">My Posts</label>
        <label>
          <div className="toggle">
            <input
              className="toggle-state"
              type="checkbox"
              onChange={onCheck}
            />
            <div className="toggle-inner">
              <div className="indicator"></div>
            </div>
            <div className="active-bg"></div>
          </div>
          <div className="label-text"></div>
        </label>
      </div>

      {posts.length ? (
        <div className="container posts-list">
          {posts.map((post, i) => (
            <div className="post-item" key={i}>
              <Post
                key={post.id}
                post={post}
                user={user}
                onRemove={onRemove}
                onEdit={onShow}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-posts">
          {loading ? (
            <Spinner animation="border" variant="secondary" />
          ) : (
            <>{!value ? <h1>No Posts</h1> : <h1>No Search Result</h1>}</>
          )}
        </div>
      )}
    </div>
  );
};

export default PostsInfo;
