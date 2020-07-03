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
import firebase from "../../config/firebase";
const _ = require("lodash");
const db = firebase.firestore();

class Todo extends Component {
  _isMounted = false;

  state = {
    todos: [],
    title: "",
    filterParam: "all",
    unsubscribeToTodos: null,
  };

  componentDidMount = () => {
    this._isMounted = true;
    const { user } = this.props;

    this.setState({ loading: true }, () => {
      if (!_.isEmpty(user)) {
        const unsubscribeToTodos = this.subscribeToTodos(user);

        this.setState({ unsubscribeToTodos });

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

  subscribeToTodos = (user) => {
    const unsubscribe = db
      .collection("todos")
      .where("user", "==", user.uid)
      .orderBy("createdAt", "desc")
      .onSnapshot((snap) => {
        const todos = [];
        snap.docs.map((doc) => {
          const { title, done, createdAt, user } = doc.data();

          return todos.push({
            id: doc.id,
            title,
            done,
            createdAt,
            user,
          });
        });

        this.setState({ todos });
      });
    return unsubscribe;
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleKeyDown = (e) => {
    const { title } = this.state;

    if (e.key === "Enter" && title) {
      createTodo(title, this.props.user);

      this.setState({
        title: "",
      });
    }
  };

  componentWillUnmount = () => {
    this._isMounted = false;
    const { unsubscribeToTodos } = this.state;

    if (_.isFunction(unsubscribeToTodos)) {
      unsubscribeToTodos();
    }
  };

  removeTodo = (todo) => {
    deleteTodo(todo);
  };

  handleClick = (param) => {
    this.setState({ filterParam: param });
  };

  removeCompletedTodos = () => {
    const completedTodos = this.state.todos.filter((todo) => todo.done);

    removeAllCompleted(completedTodos);
  };

  toggleDone = (todo) => {
    toggleCheck(todo);
  };

  doneAllTodos = () => {
    const activeTodos = this.state.todos.filter((todo) => !todo.done);

    completeAllTodos(activeTodos);
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

    const activeTodos = todos.filter((todo) => !todo.done);

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
              activeTodos={activeTodos}
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
