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
  completeAllTodos,
} from "../../functions/todo-functions";
const _ = require("lodash");

class Todo extends Component {
  _isMounted = false;
  state = {
    todos: [],
    title: "",
    filterParam: "all",
  };

  componentDidMount = () => {
    this._isMounted = true;
    const { user } = this.props;

    this.setState({ loading: true }, () => {
      if (!_.isEmpty(user)) {
        fetchTodos(user).then((todos) => {
          if (this._isMounted) {
            this.setState({
              todos,
              loading: false,
            });
          }
        });
      }
    });
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleKeyDown = (e) => {
    const { todos, title } = this.state;
    const { user } = this.props;

    if (e.key === "Enter" && title) {
      createTodo(title, user).then((res) => {
        const todo = {
          id: res.id,
          title,
          done: false,
          createdAt: res.createdAt,
          user: user.uid,
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
    const { todos } = this.state;
    let count = 0;

    const completedTodos = todos.filter((todo) => todo.done);
    const activeTodos = todos.filter((todo) => !todo.done);

    completedTodos.forEach((todo) => {
      removeAllCompleted(todo).then(() => {
        count++;
        if (count === completedTodos.length) {
          this.setState({ todos: activeTodos });
        }
      });
    });
  };

  toggleDone = (todo) => {
    toggleCheck(todo);

    const todos = this.state.todos.map((item) => {
      if (todo.id === item.id) {
        return {
          id: item.id,
          title: item.title,
          done: !item.done,
          createAt: item.createdAt,
        };
      } else {
        return item;
      }
    });

    this.setState({ todos });
  };

  doneAllTodos = () => {
    const { todos } = this.state;
    let count = 0;

    const activeTodos = todos.filter((todo) => !todo.done);
    const completedTodos = this.state.todos.map((todo) => {
      if (!todo.done) {
        return {
          id: todo.id,
          title: todo.title,
          done: true,
          createdAt: todo.createdAt,
        };
      } else {
        return todo;
      }
    });

    activeTodos.forEach((todo) => {
      completeAllTodos(todo).then(() => {
        count++;
        if (count === activeTodos.length) {
          this.setState({ todos: completedTodos });
        }
      });
    });
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

        <div className="input-container">
          <i className="arrow down" onClick={this.doneAllTodos}></i>

          <input
            type="text"
            name="title"
            onChange={this.handleChange}
            value={title}
            placeholder="What needs to be done?"
            onKeyDown={this.handleKeyDown}
            autoComplete="off"
          />
        </div>

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
