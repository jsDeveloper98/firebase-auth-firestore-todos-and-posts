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

const removeAllCompleted = () => {
  return db
    .collection("todos")
    .where("done", "==", true)
    .get()
    .then((res) => res.docs.map((doc) => doc.id))
    .then((doneTodoIds) =>
      doneTodoIds.map((doneTodoId) => {
        return db.collection("todos").doc(doneTodoId).delete();
      })
    );
};

const completeAllTodos = () => {
  return db
    .collection("todos")
    .where("done", "==", false)
    .get()
    .then((res) => res.docs.map((doc) => doc.id))
    .then((activeTodoIds) =>
      activeTodoIds.map((activeTodoId) => {
        return db.collection("todos").doc(activeTodoId).set(
          {
            done: true,
          },
          { merge: true }
        );
      })
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
