import firebase from "../../config/firebase";
import { showLoading, hideLoading } from "./main-actions";
import { FETCH_TODOS } from "../types";
const db = firebase.firestore();
const _ = require("lodash");

export const subscribeToTodos = (callback = null, userId) => {
  return async (dispatch) => {
    dispatch(showLoading());
    const unsubscribe = db
      .collection("todos")
      .where("user", "==", userId)
      .orderBy("createdAt", "desc")
      .onSnapshot((snap) => {
        const todos = [];

        if (_.isFunction(callback)) {
          callback(unsubscribe);
        }

        snap.docs.forEach((doc) => {
          const { title, done, createdAt, user } = doc.data();

          todos.push({
            id: doc.id,
            title,
            done,
            createdAt,
            user,
          });
        });

        dispatch({
          type: FETCH_TODOS,
          payload: todos,
        });

        dispatch(hideLoading());
      });
  };
};
