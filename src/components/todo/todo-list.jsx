import React from "react";
import TodoItem from "./todo-item";

const TodoList = (props) => {
  return (
    <React.Fragment>
      {props.todos.map((todo, i) => (
        <div className="todo-item" key={i}>
          <TodoItem
            key={todo.id}
            todo={todo}
            onRemove={props.onRemove}
            toggleDone={props.toggleDone}
          />
        </div>
      ))}
    </React.Fragment>
  );
};

export default TodoList;
