import React, { Component } from "react";
import firebase from "../../config/firebase";
import { Form, Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { createUser } from "../../functions/user-functions";

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
      <Form className="form-settings">
        <Form.Group controlId="formBasicUsername">
          <Form.Label className="label-settings">Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Username"
            name="username"
            onChange={this.handleChange}
            value={username}
            className="input-settings"
            autoComplete="off"
          />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label className="label-settings">Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            onChange={this.handleChange}
            value={email}
            autoComplete="off"
            className="input-settings"
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label className="label-settings">Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            onChange={this.handleChange}
            value={password}
            className="input-settings"
          />
        </Form.Group>
        <Button
          className="form-button"
          variant="secondary"
          type="submit"
          onClick={this.signUp}
        >
          Sign Up
        </Button>
      </Form>
    );
  }
}

export default SignIn;
