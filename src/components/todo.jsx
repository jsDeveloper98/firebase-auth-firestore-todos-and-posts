import React, { Component } from "react";
import { createTodo } from "../functions/todo-functions";

class Todo extends Component {
  state = {
    title: "",
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleKeyDown = (e) => {
    if (e.key === "Enter" && this.state.title) {
      createTodo(this.state.title);
      this.setState({ title: "" });
    }
  };

  render() {
    return (
      <div className="todo-form">
        <div className="todo-header">todos</div>
        <input
          type="text"
          name="title"
          onChange={this.handleChange}
          value={this.state.title}
          placeholder="What needs to be done?"
          onKeyDown={this.handleKeyDown}
        />
      </div>
    );
  }
}

export default Todo;
