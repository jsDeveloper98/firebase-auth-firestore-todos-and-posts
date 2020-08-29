import React, { Component } from "react";
import { subscribeToUsers } from "../../functions/user-functions";
import User from "./user";
const _ = require("lodash");

class Users extends Component {
  _isMounted = false;

  state = {
    users: [],
    unsubscribeToUsers: null,
  };

  componentDidMount = () => {
    this._isMounted = true;

    if (this._isMounted) {
      this.subscribeToUsers();
    }
  };

  subscribeToUsers = () => {
    if (_.isFunction(this.unsubscribeToUsers)) {
      this.unsubscribeToUsers();
    }

    const callback = (users) => {
      this.setState({ users });
    };

    const unsubscribeToUsers = subscribeToUsers(callback);
    this.setState({ unsubscribeToUsers });
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
