import React, { useState, useEffect } from "react";
import "../styles/App.scss";
import firebase from "../config/firebase";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from "./main/Navbar";
import SignIn from "./auth/Sign-in";
import SignUp from "./auth/Sign-up";
import Home from "./main/Home";
import CreatePost from "./post/create-post";
import Posts from "./post/posts";
import PostDetails from "./post/post-details";
import Todo from "./todo/todo";
import Chat from "./realtime-chat/chat";

const App = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    authListener();
  }, [user]);

  const authListener = () => {
    firebase.auth().onAuthStateChanged((user) => {
      user ? setUser(user) : setUser(null);
    });
  };

  const logOut = () => {
    firebase.auth().signOut();
  };

  return (
    <Router>
      <div className="main-nav-bar">
        <NavBar user={user} logOut={logOut} />
      </div>
      <Switch>
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
      </Switch>
    </Router>
  );
};

export default App;
