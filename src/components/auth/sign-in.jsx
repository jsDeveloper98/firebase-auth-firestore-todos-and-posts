import React, { Component } from "react";
import firebase from "../../config/firebase";
import { Redirect } from "react-router-dom";
import HelperForm from "../../reusable-components/form";

class SignIn extends Component {
  state = {
    email: "",
    password: "",
  };

  signIn = (e) => {
    e.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((user) => {
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
    const { email, password } = this.state;

    if (this.props.user) {
      return <Redirect to="/" />;
    }

    return (
      <HelperForm
        val1={email}
        val2={password}
        handleChange={this.handleChange}
        submit={this.signIn}
        prop="signin"
      />
    );
  }
}

export default SignIn;
