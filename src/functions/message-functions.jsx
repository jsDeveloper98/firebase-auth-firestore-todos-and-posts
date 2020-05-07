import firebase from "../config/firebase";
const db = firebase.firestore();

const createMessage = (value, user) => {
  return db
    .collection("users")
    .where("uid", "==", user.uid)
    .get()
    .then((res) => res.docs.map((doc) => doc.data().username[0]))
    .then((username) => {
      return db.collection("messages").add({
        title: value,
        createdAt: new Date(),
        user: user.uid,
        authorName: username,
      });
    });
};

const fetchMessages = () => {
  return db
    .collection("messages")
    .orderBy("createdAt", "asc")
    .get()
    .then((res) =>
      res.docs.map((doc) => {
        const { title, createdAt, user, authorName } = doc.data();

        return {
          id: doc.id,
          title,
          createdAt,
          user,
          authorName,
        };
      })
    );
};

export { createMessage, fetchMessages };
