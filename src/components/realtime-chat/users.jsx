import React, { useEffect } from "react";
import User from "./user";
import { useDispatch, useSelector } from "react-redux";
import { subscribeToUsers } from "../../redux/actions/user-actions";
const _ = require("lodash");

const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);

  useEffect(() => {
    let unsubscribe;

    const callback = (u) => {
      unsubscribe = u;
    };

    dispatch(subscribeToUsers(callback));
    return () => {
      if (_.isFunction(unsubscribe)) {
        unsubscribe();
      }
    };
  }, [dispatch]);

  return (
    <>
      <div className="users-list">
        {users.map((user, i) => (
          <div className="user" key={i}>
            <User key={user.id} user={user} />
          </div>
        ))}
      </div>
    </>
  );
};

export default Users;
