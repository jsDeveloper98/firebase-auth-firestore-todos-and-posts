import firebase from "../config/firebase";
const db = firebase.firestore();

const createTodo = (title, user) => {
  return db.collection("todos").add({
    title,
    done: false,
    createdAt: new Date(),
    user: user.uid,
  });
};

const fetchTodos = (user) => {
  return db
    .collection("todos")
    .where("user", "==", user.uid)
    .orderBy("createdAt", "desc")
    .get()
    .then((res) =>
      res.docs.map((doc) => {
        return {
          id: doc.id,
          title: doc.data().title,
          done: doc.data().done,
          createdAt: doc.data().createdAt,
          user: doc.data().user,
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
