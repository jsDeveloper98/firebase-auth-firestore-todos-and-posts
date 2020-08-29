import firebase from "../config/firebase";
const db = firebase.firestore();
const _ = require("lodash");

const createTodo = (title, user) => {
  return db.collection("todos").add({
    title,
    done: false,
    createdAt: new Date(),
    user: user.uid,
  });
};

const subscribeToTodos = (callback, userId) => {
  const unsubscribe = db
    .collection("todos")
    .where("user", "==", userId)
    .orderBy("createdAt", "desc")
    .onSnapshot((snap) => {
      const todos = [];

      snap.docs.forEach((doc) => {
        const { title, done, createdAt, user } = doc.data();

        todos.push({
          id: doc.id,
          title,
          done,
          createdAt,
          user,
        });
      });

      if (_.isFunction(callback)) {
        callback(todos);
      }
    });
  return unsubscribe;
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

const removeAllCompleted = (completedTodos) => {
  completedTodos.map((completedTodo) => {
    return db.collection("todos").doc(completedTodo.id).delete();
  });
};

const completeAllTodos = (activeTodos) => {
  activeTodos.map((activeTodo) => {
    return db.collection("todos").doc(activeTodo.id).set(
      {
        done: true,
      },
      { merge: true }
    );
  });
};

export {
  createTodo,
  subscribeToTodos,
  deleteTodo,
  toggleCheck,
  removeAllCompleted,
  completeAllTodos,
};
