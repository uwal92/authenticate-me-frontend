// frontend/src/store/store.js

import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { thunk } from "redux-thunk";
import logger from "redux-logger"; // Regular import for logger
import sessionReducer from "./session";

//const rootReducer = combineReducers({});

// sample to text redux
const testReducer = (state = {}, action) => {
  switch (action.type) {
    case "TEST_ACTION":
      return { message: "Redux is working!" };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  test: testReducer, // 👈 Add at least one reducer here
  session: sessionReducer,
});

// Middleware setup. // frontend/src/store/store.js

// ...

let enhancer;

if (import.meta.env.MODE === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

// Configure store function // frontend/src/store/store.js

// ...

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
