import React, { Component } from "react";
import { fetchUsers } from "../../functions/user-functions";
import User from "./user";
import firebase from "../../config/firebase";
const _ = require("lodash");
const db = firebase.firestore();

class Users extends Component {
  _isMounted = false;

  state = {
    users: [],
    unsubscribeToUsers: null,
  };

  componentDidMount = () => {
    this._isMounted = true;

    const unsubscribeToUsers = this.subscribeToUsers();

    if (this._isMounted) {
      this.setState({ unsubscribeToUsers });
    }

    if (this._isMounted) {
      fetchUsers().then((users) => {
        if (this._isMounted) {
          this.setState({ users });
        }
      });
    }
  };

  subscribeToUsers = () => {
    const unsubscribe = db.collection("users").onSnapshot((snap) => {
      const users = [];

      snap.docs.forEach((doc) => {
        const { email, username, uid } = doc.data();

        users.push({
          id: doc.id,
          email,
          username,
          uid,
        });
      });

      if (this._isMounted) {
        this.setState({ users });
      }
    });
    return unsubscribe;
  };

  componentWillUnmount = () => {
    this._isMounted = false;

    const { unsubscribeToUsers } = this.state;

    if (_.isFunction(unsubscribeToUsers)) {
      unsubscribeToUsers();
    }
  };

  render() {
    const { users } = this.state;

    return (
      <div className="users-list">
        {users.map((user, i) => (
          <div className="user" key={i}>
            <User key={user.id} user={user} />
          </div>
        ))}
      </div>
    );
  }
}

export default Users;
