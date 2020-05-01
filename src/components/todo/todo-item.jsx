import React from "react";

const TodoItem = ({ onRemove, todo, toggleDone }) => {
  return (
    <React.Fragment>
      <div className="todo-toggle" onClick={() => toggleDone(todo)}>
        {todo.done ? <span>✓</span> : null}
      </div>
      <div className={doneTodo(todo)}>{todo.title}</div>
      <div className="remove-todo" onClick={() => onRemove(todo)}>
        ✗
      </div>
    </React.Fragment>
  );
};

export default TodoItem;

function doneTodo(todo) {
  let classes = "todo-title";
  classes += todo.done ? " -done" : "";
  return classes;
}
