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
        const { title, done, createdAt, user } = doc.data();

        return {
          id: doc.id,
          title,
          done,
          createdAt,
          user,
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
  fetchTodos,
  deleteTodo,
  toggleCheck,
  removeAllCompleted,
  completeAllTodos,
};
