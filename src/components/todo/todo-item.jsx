import React from "react";

const TodoItem = (props) => {
  return (
    <React.Fragment>
      <div className="todo-toggle" onClick={() => props.toggleDone(props.todo)}>
        {props.todo.done ? <span>✓</span> : null}
      </div>
      <div className={doneTodo(props)}>{props.todo.title}</div>
      <div className="remove-todo" onClick={() => props.onRemove(props.todo)}>
        ✗
      </div>
    </React.Fragment>
  );
};

export default TodoItem;

function doneTodo(props) {
  let classes = "todo-title";
  classes += props.todo.done ? " -done" : "";
  return classes;
}
