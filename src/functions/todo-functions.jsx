import firebase from "../config/firebase";
const db = firebase.firestore();

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

const removeAllCompleted = (todo) => {
  return db.collection("todos").doc(todo.id).delete();
};

const completeAllTodos = (todo) => {
  return db.collection("todos").doc(todo.id).set(
    {
      done: true,
    },
    { merge: true }
  );
};

export {
  createTodo,
  fetchTodos,
  deleteTodo,
  toggleCheck,
  removeAllCompleted,
  completeAllTodos,
};
