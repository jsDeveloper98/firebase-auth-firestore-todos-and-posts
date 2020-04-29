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
  db.collection("todos").doc(todo.id).delete();
};

const toggleCheck = (todo) => {
  db.collection("todos").doc(todo.id).set(
    {
      done: !todo.done,
    },
    { merge: true }
  );
};

export { createTodo, fetchTodos, deleteTodo, toggleCheck };
