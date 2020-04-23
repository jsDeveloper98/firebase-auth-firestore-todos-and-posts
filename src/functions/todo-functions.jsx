import firebase from "../config/firebase";
const db = firebase.firestore();

const createTodo = (title) => {
  return db.collection("todos").add({
    title: title,
    done: false,
    createdAt: new Date(),
  });
};

export { createTodo };
