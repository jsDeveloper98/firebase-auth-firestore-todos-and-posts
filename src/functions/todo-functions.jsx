import firebase from "../config/firebase";
const db = firebase.firestore();
const _ = require("lodash");

export const createTodo = (title, user) => {
  return db.collection("todos").add({
    title,
    done: false,
    createdAt: new Date(),
    user: user.uid,
  });
};

export const deleteTodo = (todo) => {
  return db.collection("todos").doc(todo.id).delete();
};

export const toggleCheck = (todo) => {
  return db.collection("todos").doc(todo.id).set(
    {
      done: !todo.done,
    },
    { merge: true }
  );
};

export const removeAllCompleted = (completedTodos) => {
  completedTodos.map((completedTodo) => {
    return db.collection("todos").doc(completedTodo.id).delete();
  });
};

export const completeAllTodos = (activeTodos) => {
  activeTodos.map((activeTodo) => {
    return db.collection("todos").doc(activeTodo.id).set(
      {
        done: true,
      },
      { merge: true }
    );
  });
};
