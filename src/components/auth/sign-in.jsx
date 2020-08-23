import React, { useState } from "react";
import firebase from "../../config/firebase";
import { Redirect } from "react-router-dom";
import HelperForm from "../../reusable-components/form";

const SignIn = ({ user }) => {
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const signIn = (e) => {
    e.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(state.email, state.password)
      .then((user) => {
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
        handleChange={handleChange}
        submit={signIn}
        prop="signin"
      />
    </>
  );
};

export default SignIn;
