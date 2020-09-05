import { combineReducers } from "redux";
import { postsReducer } from "./post-reducer";
import { appReducer } from "./app-reducer";
import { messagesReducer } from "./message-reducer";

export const rootReducer = combineReducers({
  posts: postsReducer,
  messages: messagesReducer,
  app: appReducer,
});
