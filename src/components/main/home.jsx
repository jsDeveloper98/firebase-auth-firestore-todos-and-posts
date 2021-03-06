import React from "react";
import { Redirect } from "react-router-dom";

const Home = ({ user }) => {
  return (
    <>
      {!user ? <Redirect to="/signin" /> : null}

      <div className="welcome-intro">
        <h1>Welcome to Our Web Page!</h1>
        <h3>
          On Our Page you can Create your Posts and Read the Posts of Other
          Users.
        </h3>
      </div>
    </>
  );
};

export default Home;
