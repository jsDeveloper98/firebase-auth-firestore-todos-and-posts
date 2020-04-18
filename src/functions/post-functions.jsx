import firebase from "../config/firebase";

const createPost = (title, description) => {
  return firebase.firestore().collection("posts").add({
    title,
    description,
    createdAt: new Date(),
  });
};

export { createPost };
