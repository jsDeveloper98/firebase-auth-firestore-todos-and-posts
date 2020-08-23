import React, { useState } from "react";
import firebase from "../../config/firebase";
import { Redirect } from "react-router-dom";
import { createUser } from "../../functions/user-functions";
import HelperForm from "../../reusable-components/form";

const SignIn = ({ user }) => {
  const [state, setState] = useState({
    username: "",
    email: "",
    password: "",
  });

  const signUp = (e) => {
    e.preventDefault();
    const { username, email, password } = state;

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        createUser(user, username);
        console.log(user);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      {user ? <Redirect to="/" /> : null}

      <HelperForm
        val1={state.email}
        val2={state.password}
        val3={state.username}
        handleChange={handleChange}
        submit={signUp}
        prop="signup"
      />
    </>
  );
};

export default SignIn;
