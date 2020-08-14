import React, { Component } from "react";
import firebase from "../../config/firebase";
import { Redirect } from "react-router-dom";
import { createUser } from "../../functions/user-functions";
import HelperForm from "../../reusable-components/form";

class SignIn extends Component {
  state = {
    username: "",
    email: "",
    password: "",
  };

  signUp = (e) => {
    e.preventDefault();
    const { username, email, password } = this.state;

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

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { email, password, username } = this.state;

    if (this.props.user) {
      return <Redirect to="/" />;
    }

    return (
      <HelperForm
        val1={email}
        val2={password}
        val3={username}
        handleChange={this.handleChange}
        submit={this.signUp}
        prop="signup"
      />
    );
  }
}

export default SignIn;
