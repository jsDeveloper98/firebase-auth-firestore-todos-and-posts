import React, { Component } from "react";
import "./App.scss";
import firebase from "./config/firebase";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import NavBar from "./components/navbar";
import SignIn from "./components/sign-in";
import SignUp from "./components/sign-up";
import Home from "./components/home";
import CreatePost from "./components/create-post";
import Posts from "./components/posts";

class App extends Component {
  state = {
    user: {},
  };

  componentDidMount = () => {
    this.authListener();
  };

  authListener = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      } else {
        this.setState({ user: null });
      }
    });
  };

  logOut = () => {
    firebase.auth().signOut();
  };

  render() {
    const { user } = this.state;
    return (
      <Router>
        <div className="main-nav-bar">
          <NavBar user={user} logOut={this.logOut} />
        </div>
        {!user ? <Redirect from="/" to="/signin" /> : null}
        {user ? <Redirect from="/signin" to="/" /> : null}
        <Route exact path="/" component={Home} />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route path="/createpost" component={CreatePost} />
        <Route path="/posts" component={Posts} />
      </Router>
    );
  }
}

export default App;
