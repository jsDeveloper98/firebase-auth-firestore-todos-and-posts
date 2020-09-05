import firebase from "../config/firebase";
const db = firebase.firestore();

export const createPost = ({ title, description, user }) => {
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

export const deletePost = (post) => {
  return db.collection("posts").doc(post.id).delete();
};

export const updatePost = (post, title, description) => {
  return db.collection("posts").doc(post.id).set(
    {
      title,
      description,
    },
    { merge: true }
  );
};
