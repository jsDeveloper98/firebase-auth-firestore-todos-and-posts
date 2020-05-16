import React, { Component } from "react";
import "./App.scss";
import firebase from "./config/firebase";
import { BrowserRouter as Router, Route } from "react-router-dom";
import NavBar from "./components/navbar";
import SignIn from "./components/auth/sign-in";
import SignUp from "./components/auth/sign-up";
import Home from "./components/home";
import CreatePost from "./components/post/create-post";
import Posts from "./components//post/posts";
import PostDetails from "./components/post/post-details";
import Todo from "./components/todo/todo";
import Chat from "./components/realtime-chat/chat";
import { setOffline, setOnline } from "./functions/user-functions";
const _ = require("lodash");

class App extends Component {
  constructor(props) {
    super(props);
    this.wrapper = React.createRef();

    this.state = {
      user: {},
    };
  }

  componentDidMount = () => {
    this.authListener();
  };

  authListener = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
        setOnline({ user });
      } else {
        const { user } = this.state;

        if (user && !_.isEmpty(user)) {
          setOffline(user);
        }
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
      <Router ref={this.wrapper}>
        <div className="main-nav-bar">
          <NavBar user={user} logOut={this.logOut} />
        </div>
        <Route exact path="/" component={() => <Home user={user} />} />
        <Route path="/signin" component={() => <SignIn user={user} />} />
        <Route path="/signup" component={() => <SignUp user={user} />} />
        <Route
          path="/createpost"
          component={() => <CreatePost user={user} />}
        />
        <Route path="/posts" component={() => <Posts user={user} />} />
        <Route path="/post/:id" component={PostDetails} />
        <Route path="/todo" component={() => <Todo user={user} />} />
        <Route path="/chat" component={() => <Chat user={user} />} />
      </Router>
    );
  }
}

export default App;
