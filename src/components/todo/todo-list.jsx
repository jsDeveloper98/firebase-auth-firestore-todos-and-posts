import React from "react";
import TodoItem from "./todo-item";

const TodoList = ({ onRemove, todos, toggleDone }) => {
  return (
    <>
      {todos.map((todo, i) => (
        <div className="todo-item" key={i}>
          <TodoItem
            key={todo.id}
            todo={todo}
            onRemove={onRemove}
            toggleDone={toggleDone}
          />
        </div>
      ))}
    </>
  );
};

export default TodoList;
