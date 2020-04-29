import React, { Component } from "react";
import { toggleCheck } from "../functions/todo-functions";

class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todo: props.todo,
    };
  }

  toggleDone = () => {
    toggleCheck(this.state.todo);

    this.setState((prevState) => {
      const todo = Object.assign({}, prevState.todo);

      todo.done = !todo.done;

      return { todo };
    });
  };

  render() {
    const { todo } = this.state;

    return (
      <React.Fragment>
        <div className="todo-toggle" onClick={this.toggleDone}>
          {todo.done ? <span>✓</span> : null}
        </div>
        <div className={this.doneTodo()}>{todo.title}</div>
        <div className="remove-todo" onClick={() => this.props.onRemove(todo)}>
          ✗
        </div>
      </React.Fragment>
    );
  }

  doneTodo() {
    let classes = "todo-title";
    classes += this.state.todo.done ? " -done" : "";
    return classes;
  }
}

export default TodoItem;
