//Message reducer - updates message state when message action is dispatched from anywhere in the application.

import { SET_MESSAGE, CLEAR_MESSAGE } from "../actions/types.js";

const initialState = {};

export default function fooMes(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_MESSAGE:
      return { message: payload };

    case CLEAR_MESSAGE:
      return { message: "" };

    default:
      return state;
  }
}
