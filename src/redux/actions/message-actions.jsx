import firebase from "../../config/firebase";
import { FETCH_MESSAGES, FETCH_REMOVED_MESSAGE_IDS } from "../types";
import { showLoading, hideLoading } from "./main-actions";
const db = firebase.firestore();
const _ = require("lodash");

export const subscribeToMessages = (callback = null) => {
  return async (dispatch) => {
    dispatch(showLoading());
    const unsubscribe = db
      .collection("messages")
      .orderBy("createdAt", "asc")
      .onSnapshot((snap) => {
        const messages = [];

        if (_.isFunction(callback)) {
          callback(unsubscribe);
        }

        snap.docs.forEach((doc) => {
          const { title, createdAt, user, authorName } = doc.data();

          messages.push({
            id: doc.id,
            title,
            createdAt,
            user,
            authorName,
          });
        });

        dispatch({
          type: FETCH_MESSAGES,
          payload: messages,
        });

        dispatch(hideLoading());
      });
  };
};

export const subscribeToRemovedMessages = (user, callback = null) => {
  return async (dispatch) => {
    const unsubscribe = db
      .collection("users")
      .where("uid", "==", user.uid)
      .onSnapshot((snap) => {
        if (_.isFunction(callback)) {
          callback(unsubscribe);
        }

        snap.docs.forEach((doc) => {
          const { removedMessageIds } = doc.data();

          dispatch({
            type: FETCH_REMOVED_MESSAGE_IDS,
            payload: removedMessageIds,
          });
        });
      });
  };
};
