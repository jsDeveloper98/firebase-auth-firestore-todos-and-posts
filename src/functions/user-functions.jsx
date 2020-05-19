import firebase from "../config/firebase";
const db = firebase.firestore();

const createUser = (user, username) => {
  return db.collection("users").add({
    uid: user.user.uid,
    username,
    email: user.user.email,
    isOnline: false,
  });
};

const fetchUsers = () => {
  return db
    .collection("users")
    .get()
    .then((res) =>
      res.docs.map((doc) => {
        const { email, username, uid, isOnline } = doc.data();

        return {
          id: doc.id,
          email,
          username,
          uid,
          isOnline,
        };
      })
    );
};

const setOnline = ({ user }) => {
  return db
    .collection("users")
    .where("uid", "==", user.uid)
    .get()
    .then((res) =>
      res.docs.map((doc) => {
        return db.collection("users").doc(doc.id).set(
          {
            isOnline: true,
          },
          { merge: true }
        );
      })
    );
};

const setOffline = (user) => {
  return db
    .collection("users")
    .where("uid", "==", user.uid)
    .get()
    .then((res) =>
      res.docs.map((doc) => {
        return db.collection("users").doc(doc.id).set(
          {
            isOnline: false,
          },
          { merge: true }
        );
      })
    );
};

export { createUser, fetchUsers, setOnline, setOffline };
