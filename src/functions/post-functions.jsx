import firebase from "../config/firebase";
const db = firebase.firestore();

const createPost = (title, description, user) => {
  return db.collection("posts").add({
    title,
    description,
    createdAt: new Date(),
    user: user.uid,
  });
};

const fetchPosts = (user) => {
  return db
    .collection("posts")
    .where("user", "==", user.uid)
    .orderBy("createdAt", "desc")
    .get()
    .then((res) =>
      res.docs.map((doc) => {
        return {
          id: doc.id,
          title: doc.data().title,
          description: doc.data().description,
          createdAt: doc.data().createdAt,
          user: doc.data().user,
        };
      })
    );
};

const deletePost = (post) => {
  return db.collection("posts").doc(post.id).delete();
};

export { createPost, fetchPosts, deletePost };
