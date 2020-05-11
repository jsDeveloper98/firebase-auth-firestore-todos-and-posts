import firebase from "../config/firebase";
const db = firebase.firestore();

const createMessage = (value, user) => {
  return db
    .collection("users")
    .where("uid", "==", user.uid)
    .get()
    .then((res) => res.docs.map((doc) => doc.data().username))
    .then((username) => {
      return db.collection("messages").add({
        title: value,
        createdAt: new Date(),
        user: user.uid,
        authorName: username[0],
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

const deleteMessage = (message) => {
  return db.collection("messages").doc(message.id).delete();
};

const addDeletedMessageForCurrentUser = (user, message) => {
  return db
    .collection("users")
    .where("uid", "==", user.uid)
    .get()
    .then((res) => res.docs.map((doc) => doc.id))
    .then((userId) => {
      return db
        .collection("users")
        .doc(userId[0])
        .update({
          removedMessageIds: firebase.firestore.FieldValue.arrayUnion(
            message.id
          ),
        });
    });
};

const fetchDeletedMessagesForCurrentUser = (user) => {
  return db
    .collection("users")
    .where("uid", "==", user.uid)
    .get()
    .then((res) =>
      res.docs.map((doc) => {
        const { removedMessageIds } = doc.data();
        if (removedMessageIds) {
          return removedMessageIds;
        } else {
          return null;
        }
      })
    );
};

export {
  createMessage,
  fetchMessages,
  deleteMessage,
  addDeletedMessageForCurrentUser,
  fetchDeletedMessagesForCurrentUser,
};
