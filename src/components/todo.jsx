import React, { Component } from "react";
import TodoList from "./todo-list";
import { Redirect } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import {
  createTodo,
  fetchTodos,
  deleteTodo,
} from "../functions/todo-functions";

class Todo extends Component {
  _isMounted = false;
  state = {
    todos: [],
    title: "",
  };

  componentDidMount = () => {
    this._isMounted = true;

    this.setState({ loading: true }, () => {
      fetchTodos().then((todos) => {
        if (this._isMounted) {
          this.setState({
            todos,
            loading: false,
          });
        }
      });
    });
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleKeyDown = (e) => {
    const { todos, title } = this.state;

    if (e.key === "Enter" && title) {
      createTodo(title).then((res) => {
        const todo = {
          id: res.id,
          title,
          done: false,
        };

        this.setState({
          todos: [todo, ...todos],
        });
      });

      this.setState({
        title: "",
      });
    }
  };

  componentWillUnmount = () => {
    this._isMounted = false;
  };

  removeTodo = (todo) => {
    deleteTodo(todo);

    const todos = this.state.todos.filter((item) => todo.id !== item.id);

    this.setState({ todos });
  };

  render() {
    const { todos, title, loading } = this.state;

    if (!this.props.user) {
      return <Redirect to="/signin" />;
    }

    return (
      <div className="todo-container">
        <div className="todo-header">todos</div>
        <input
          type="text"
          name="title"
          onChange={this.handleChange}
          value={title}
          placeholder="What needs to be done?"
          onKeyDown={this.handleKeyDown}
          autoComplete="off"
        />
        <div className="todo-list">
          {loading ? (
            <Spinner
              className="loading-todos"
              animation="border"
              variant="secondary"
            />
          ) : (
            <TodoList todos={todos} onRemove={this.removeTodo} />
          )}
        </div>
      </div>
    );
  }
}

export default Todo;
