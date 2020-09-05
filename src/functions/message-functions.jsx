import firebase from "../config/firebase";
const db = firebase.firestore();

export const createMessage = (value, user) => {
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

export const deleteMessage = (message) => {
  return db.collection("messages").doc(message.id).delete();
};

export const addDeletedMessageForCurrentUser = (user, message) => {
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

export const removeDeletedMessages = (message) => {
  return db
    .collection("users")
    .get()
    .then((res) => res.docs.map((doc) => doc.id))
    .then((userIds) =>
      userIds.map((userId) => {
        return db
          .collection("users")
          .doc(userId)
          .update({
            removedMessageIds: firebase.firestore.FieldValue.arrayRemove(
              message.id
            ),
          });
      })
    );
};

export const updateMessage = (message, title) => {
  return db.collection("messages").doc(message.id).set(
    {
      title,
    },
    { merge: true }
  );
};
