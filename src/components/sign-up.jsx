import React, { Component } from "react";
import firebase from "../config/firebase";
import { Form, Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";

class SignIn extends Component {
  state = {
    email: "",
    password: "",
  };

  signUp = (e) => {
    e.preventDefault();
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
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
    if (this.props.user) {
      return <Redirect to="/" />;
    }
    return (
      <Form className="form-settings">
        <Form.Group controlId="formBasicEmail">
          <Form.Label className="label-settings">Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            onChange={this.handleChange}
            value={this.state.email}
            autoComplete="off"
            className="input-settings"
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label className="label-settings">Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            onChange={this.handleChange}
            value={this.state.password}
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
