import firebase from "../config/firebase";
const db = firebase.firestore();

const createPost = (title, description, user) => {
  return db
    .collection("users")
    .where("uid", "==", user.uid)
    .get()
    .then((res) => res.docs.map((doc) => doc.data().username))
    .then((username) => {
      return db.collection("posts").add({
        title,
        description,
        createdAt: new Date(),
        user: user.uid,
        authorName: username[0],
      });
    });
};

const fetchPosts = () => {
  return db
    .collection("posts")
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
          authorName: doc.data().authorName,
        };
      })
    );
};

const deletePost = (post) => {
  return db.collection("posts").doc(post.id).delete();
};

export { createPost, fetchPosts, deletePost };
