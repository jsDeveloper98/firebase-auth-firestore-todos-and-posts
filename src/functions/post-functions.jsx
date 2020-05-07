import firebase from "../config/firebase";
const db = firebase.firestore();

const createPost = (title, description, user) => {
  return db
    .collection("users")
    .where("uid", "==", user.uid)
    .get()
    .then((res) => res.docs.map((doc) => doc.data().username[0]))
    .then((username) => {
      return db.collection("posts").add({
        title,
        description,
        createdAt: new Date(),
        user: user.uid,
        authorName: username,
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
        const { title, description, createdAt, user, authorName } = doc.data();

        return {
          id: doc.id,
          title,
          description,
          createdAt,
          user,
          authorName,
        };
      })
    );
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

export { createPost, fetchPosts, deletePost, updatePost };
