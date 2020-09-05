import React, { useState, useEffect } from "react";
import TodoList from "./todo-list";
import FilterButtons from "./filter-buttons";
import { Redirect } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import {
  createTodo,
  deleteTodo,
  toggleCheck,
  removeAllCompleted,
  completeAllTodos,
} from "../../functions/todo-functions";
import { useDispatch, useSelector } from "react-redux";
import { subscribeToTodos } from "../../redux/actions/todo-actions";
const _ = require("lodash");

const Todo = ({ user }) => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.todos);
  const loading = useSelector((state) => state.app.loading);

  const [state, setState] = useState({
    title: "",
    filterParam: "all",
  });

  useEffect(() => {
    if (_.isEmpty(user)) {
      return;
    }

    let unsubscribe;

    const callback = (u) => {
      unsubscribe = u;
    };

    dispatch(subscribeToTodos(callback, user.uid));
    return () => {
      if (_.isFunction(unsubscribe)) {
        unsubscribe();
      }
    };
  }, [dispatch, user]);

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleKeyDown = (e) => {
    const { title } = state;

    if (e.key === "Enter" && title) {
      createTodo(title, user);

      setState({
        ...state,
        title: "",
      });
    }
  };

  const removeTodo = (todo) => {
    deleteTodo(todo);
  };

  const handleClick = (param) => {
    setState({ ...state, filterParam: param });
  };

  const removeCompletedTodos = () => {
    const completedTodos = todos.filter((todo) => todo.done);

    removeAllCompleted(completedTodos);
  };

  const toggleDone = (todo) => {
    toggleCheck(todo);
  };

  const doneAllTodos = () => {
    const activeTodos = todos.filter((todo) => !todo.done);

    completeAllTodos(activeTodos);
  };

  const filteredTodos = todos.filter((todo) => {
    if (state.filterParam === "active") {
      return !todo.done;
    } else if (state.filterParam === "completed") {
      return todo.done;
    }
    return todos;
  });

  const completedTodos = todos.filter((todo) => todo.done);

  const activeTodos = todos.filter((todo) => !todo.done);

  return (
    <>
      {!user ? <Redirect to="/signin" /> : null}

      <div className="todo-container">
        <div className="todo-header">todos</div>

        <div className="input-container">
          <i className="arrow down" onClick={doneAllTodos}></i>
          <input
            type="text"
            name="title"
            onChange={handleChange}
            value={state.title}
            placeholder="What needs to be done?"
            onKeyDown={handleKeyDown}
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
              onRemove={removeTodo}
              toggleDone={toggleDone}
            />
          )}
        </div>

        {todos.length ? (
          <div className="filter-buttons">
            <FilterButtons
              filterParam={state.filterParam}
              setFilter={handleClick}
              activeTodos={activeTodos}
              completedTodos={completedTodos}
              removeCompletedTodos={removeCompletedTodos}
            />
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Todo;
