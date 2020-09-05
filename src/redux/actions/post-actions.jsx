import firebase from "../../config/firebase";
import { FETCH_POSTS } from "../types";
import { showLoading, hideLoading } from "./main-actions";
const db = firebase.firestore();
const _ = require("lodash");

export const subscribeToPosts = (callback) => {
  return async (dispatch) => {
    dispatch(showLoading());
    const unsubscribe = db
      .collection("posts")
      .orderBy("createdAt", "desc")
      .onSnapshot((snap) => {
        const posts = [];

        if (_.isFunction(callback)) {
          callback(unsubscribe);
        }

        snap.docs.forEach((doc) => {
          const {
            title,
            description,
            createdAt,
            user,
            authorName,
          } = doc.data();

          posts.push({
            id: doc.id,
            title,
            description,
            createdAt,
            user,
            authorName,
          });
        });

        dispatch({
          type: FETCH_POSTS,
          payload: posts,
        });

        dispatch(hideLoading());
      });
  };
};
