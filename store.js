import { legacy_createStore as createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import thunk from "redux-thunk"; // Import Redux Thunk middleware
import rootReducer from "./reducer"; // Import your root reducer
import rootSaga from "./sagas"; // Import your root saga

// Create Saga middleware
const sagaMiddleware = createSagaMiddleware();

// Create the Redux store with middleware (including Redux Thunk)
const store = createStore(
  rootReducer, // Your root reducer
  applyMiddleware(thunk, sagaMiddleware) // Add Redux Thunk middleware
);

// Run your root saga
sagaMiddleware.run(rootSaga);

export default store;
