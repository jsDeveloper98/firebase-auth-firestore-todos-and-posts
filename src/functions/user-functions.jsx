import firebase from "../config/firebase";
const db = firebase.firestore();

const createUser = (user, username) => {
  return db.collection("users").add({
    uid: user.user.uid,
    username,
    email: user.user.email,
  });
};

export { createUser };
