import firebase from "../config/firebase";
const db = firebase.firestore();
const _ = require("lodash");

const createPost = ({ title, description, user }) => {
  return db
    .collection("users")
    .where("uid", "==", user)
    .get()
    .then((res) => res.docs.map((doc) => doc.data().username))
    .then((username) => {
      return db.collection("posts").add({
        title,
        description,
        user,
        authorName: username[0],
        createdAt: Date.now(),
      });
    });
};

const deletePost = (post) => {
  return db.collection("posts").doc(post.id).delete();
};

const updatePost = (post, title, description) => {
  return db.collection("posts").doc(post.id).set(
    {
      title,
      description,
    },
    { merge: true }
  );
};

const subscribeToPosts = (callback = null) => {
  const unsubscribe = db
    .collection("posts")
    .orderBy("createdAt", "desc")
    .onSnapshot((snap) => {
      const posts = [];

      snap.docs.forEach((doc) => {
        const { title, description, createdAt, user, authorName } = doc.data();

        posts.push({
          id: doc.id,
          title,
          description,
          createdAt,
          user,
          authorName,
        });
      });

      if (_.isFunction(callback)) {
        callback(posts);
      }
    });
  return unsubscribe;
};

export { createPost, deletePost, updatePost, subscribeToPosts };
