import firebase from "../config/firebase";
const db = firebase.firestore();
const _ = require("lodash");

const createUser = ({ user }, username) => {
  return db.collection("users").add({
    uid: user.uid,
    username,
    email: user.email,
    createdAt: new Date(),
  });
};

const subscribeToUsers = (callback = null) => {
  const unsubscribe = db
    .collection("users")
    .orderBy("createdAt", "desc")
    .onSnapshot((snap) => {
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

      if (_.isFunction(callback)) {
        callback(users);
      }
    });
  return unsubscribe;
};

export { createUser, subscribeToUsers };
