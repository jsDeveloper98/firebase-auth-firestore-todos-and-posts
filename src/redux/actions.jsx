import { FETCH_POSTS } from "./types";
import firebase from "../config/firebase";
const db = firebase.firestore();
const _ = require("lodash");

export const subscribeToPosts = (callback) => {
  return async (dispatch) => {
    const unsubscribe = db
      .collection("posts")
      .orderBy("createdAt", "desc")
      .onSnapshot((snap) => {
        if (_.isFunction(callback)) {
          callback(unsubscribe);
        }
        const posts = [];

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
      });
  };
};
