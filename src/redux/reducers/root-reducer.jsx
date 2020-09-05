import { combineReducers } from "redux";
import { postsReducer } from "./post-reducer";
import { appReducer } from "./app-reducer";
import { messagesReducer } from "./message-reducer";
import { userReducer } from "./user-reducer";
import { todoReducer } from "./todo-reducer";

export const rootReducer = combineReducers({
  posts: postsReducer,
  messages: messagesReducer,
  app: appReducer,
  users: userReducer,
  todos: todoReducer,
});
