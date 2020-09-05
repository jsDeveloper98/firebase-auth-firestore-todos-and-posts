import firebase from "../../config/firebase";
import { showLoading, hideLoading } from "./main-actions";
import { FETCH_USERS } from "../types";
const db = firebase.firestore();
const _ = require("lodash");

export const subscribeToUsers = (callback = null) => {
  return async (dispatch) => {
    dispatch(showLoading());
    const unsubscribe = db
      .collection("users")
      .orderBy("createdAt", "desc")
      .onSnapshot((snap) => {
        const users = [];

        if (_.isFunction(callback)) {
          callback(unsubscribe);
        }

        snap.docs.forEach((doc) => {
          const { email, username, uid } = doc.data();

          users.push({
            id: doc.id,
            email,
            username,
            uid,
          });
        });

        dispatch({
          type: FETCH_USERS,
          payload: users,
        });

        dispatch(hideLoading());
      });
  };
};
