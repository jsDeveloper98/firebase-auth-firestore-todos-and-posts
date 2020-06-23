import firebase from "../config/firebase";
const db = firebase.firestore();
const _ = require("lodash");

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

const subscribeToMessages = (callback = null) => {
  const unsubscribe = db
    .collection("messages")
    .orderBy("createdAt", "asc")
    .onSnapshot((snap) => {
      const messages = [];

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

      if (_.isFunction(callback)) {
        callback(messages);
      }
    });
  return unsubscribe;
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

const subscribeToRemovedMessages = (user, callback) => {
  const unsubscribe = db
    .collection("users")
    .where("uid", "==", user.uid)
    .onSnapshot((snap) =>
      snap.docs.forEach((doc) => {
        const { removedMessageIds } = doc.data();

        if (_.isFunction(callback)) {
          callback(removedMessageIds);
        }
      })
    );
  return unsubscribe;
};

const removeDeletedMessages = (message) => {
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

const updateMessage = (message, title) => {
  return db.collection("messages").doc(message.id).set(
    {
      title,
    },
    { merge: true }
  );
};

export {
  createMessage,
  subscribeToMessages,
  deleteMessage,
  addDeletedMessageForCurrentUser,
  subscribeToRemovedMessages,
  removeDeletedMessages,
  updateMessage,
};
