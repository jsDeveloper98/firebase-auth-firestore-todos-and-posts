import React, { Component } from "react";
import TodoList from "./todo-list";
import FilterButtons from "./filter-buttons";
import { Redirect } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import {
  createTodo,
  fetchTodos,
  deleteTodo,
  toggleCheck,
  removeAllCompleted,
} from "../../functions/todo-functions";

class Todo extends Component {
  _isMounted = false;
  state = {
    todos: [],
    title: "",
    filterParam: "all",
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
          createdAt: res.createdAt,
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

  handleClick = (param) => {
    this.setState({ filterParam: param });
  };

  removeCompletedTodos = () => {
    removeAllCompleted().then(() => {
      const todos = this.state.todos.filter((todo) => !todo.done);

      this.setState({ todos });
    });
  };

  toggleDone = (todo) => {
    const { todos } = this.state;

    toggleCheck(todo);

    const changedTodo = todos.filter((item) => todo.id === item.id);
    changedTodo[0].done = !changedTodo[0].done;

    const changedTodoIndex = todos.indexOf(changedTodo[0]);
    const newTodos = todos;

    newTodos.splice(changedTodoIndex, 1, changedTodo[0]);

    this.setState({ todos: newTodos });
  };

  render() {
    const { todos, title, loading, filterParam } = this.state;

    if (!this.props.user) {
      return <Redirect to="/signin" />;
    }

    const filteredTodos = todos.filter((todo) => {
      if (filterParam === "active") {
        return !todo.done;
      } else if (filterParam === "completed") {
        return todo.done;
      }
      return todos;
    });

    const completedTodos = todos.filter((todo) => todo.done);

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
            <TodoList
              todos={filteredTodos}
              onRemove={this.removeTodo}
              toggleDone={this.toggleDone}
            />
          )}
        </div>
        {todos.length ? (
          <div className="filter-buttons">
            <FilterButtons
              filterParam={filterParam}
              setFilter={this.handleClick}
              filteredTodos={filteredTodos}
              completedTodos={completedTodos}
              removeCompletedTodos={this.removeCompletedTodos}
            />
          </div>
        ) : null}
      </div>
    );
  }
}

export default Todo;
