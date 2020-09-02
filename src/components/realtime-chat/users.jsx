import React, { useState, useEffect, useRef } from "react";
import { subscribeToUsers } from "../../functions/user-functions";
import User from "./user";
const _ = require("lodash");

const Users = () => {
  const useIsMounted = () => {
    const isMounted = useRef(false);
    useEffect(() => {
      isMounted.current = true;
      return () => (isMounted.current = false);
    }, []);
    return isMounted;
  };

  const isMaunted = useIsMounted();

  const [state, setState] = useState({
    users: [],
  });

  useEffect(() => {
    const callback = (users) => {
      if (isMaunted) {
        setState((state) => ({ ...state, users }));
      }
    };

    const unsubscribeToUsers = subscribeToUsers(callback);
    return () => {
      if (_.isFunction(unsubscribeToUsers)) {
        unsubscribeToUsers();
      }
    };
  }, [isMaunted]);

  return (
    <>
      <div className="users-list">
        {state.users.map((user, i) => (
          <div className="user" key={i}>
            <User key={user.id} user={user} />
          </div>
        ))}
      </div>
    </>
  );
};

export default Users;
