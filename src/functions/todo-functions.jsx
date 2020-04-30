import firebase from "../config/firebase";
const db = firebase.firestore();
const _ = require("lodash");

const createTodo = (title) => {
  return db.collection("todos").add({
    title,
    done: false,
    createdAt: new Date(),
  });
};

const fetchTodos = () => {
  return db
    .collection("todos")
    .orderBy("createdAt", "desc")
    .get()
    .then((res) =>
      res.docs.map((doc) => {
        return {
          id: doc.id,
          title: doc.data().title,
          done: doc.data().done,
          createdAt: doc.data().createdAt,
        };
      })
    );
};

const deleteTodo = (todo) => {
  return db.collection("todos").doc(todo.id).delete();
};

const toggleCheck = (todo) => {
  return db.collection("todos").doc(todo.id).set(
    {
      done: !todo.done,
    },
    { merge: true }
  );
};

const removeAllCompleted = () => {
  return db
    .collection("todos")
    .get()
    .then((res) =>
      res.docs.map((doc) => {
        if (doc.data().done) {
          return doc.id;
        }
      })
    )
    .then((doneTodoIds) =>
      _.compact(doneTodoIds).map((doneTodoId) => {
        return db.collection("todos").doc(doneTodoId).delete();
      })
    );
};

export { createTodo, fetchTodos, deleteTodo, toggleCheck, removeAllCompleted };
