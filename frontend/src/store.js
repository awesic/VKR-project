import thunk from "redux-thunk";
import { applyMiddleware, createStore, compose } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";

const initialState = {};

const middleware = [thunk];

// const store = createStore(
//     rootReducer,
//     initialState,
//     composeWithDevTools(applyMiddleware(...middleware))
// );
const store = configureStore({
  reducer: rootReducer,
  initialState,
  middleware: middleware,
});
export default store;
