import firebase from "../config/firebase";
const db = firebase.firestore();

export const createUser = ({ user }, username) => {
  return db.collection("users").add({
    uid: user.uid,
    username,
    email: user.email,
    createdAt: new Date(),
  });
};
