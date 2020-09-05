import { FETCH_MESSAGES, FETCH_REMOVED_MESSAGE_IDS } from "../types";

const initialState = {
  messages: [],
  removedMessageIds: [],
};

export const messagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MESSAGES:
      return { ...state, messages: action.payload };
    case FETCH_REMOVED_MESSAGE_IDS:
      return { ...state, removedMessageIds: action.payload };
    default:
      return state;
  }
};
