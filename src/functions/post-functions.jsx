import firebase from "../config/firebase";
const db = firebase.firestore();

const createPost = (title, description) => {
  return db.collection("posts").add({
    title,
    description,
    createdAt: new Date(),
  });
};

const fetchPosts = () => {
  return db
    .collection("posts")
    .orderBy("createdAt", "desc")
    .get()
    .then((res) => {
      return res.docs.map((doc) => {
        return {
          id: doc.id,
          title: doc.data().title,
          description: doc.data().description,
          createdAt: doc.data().createdAt,
        };
      });
    });
};

const deletePost = (post) => {
  return db.collection("posts").doc(post.id).delete();
};

export { createPost, fetchPosts, deletePost };
