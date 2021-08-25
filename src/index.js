import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import logger from "redux-logger";
import rootReducer from "./redux/reducers"; // imports ./redux/reducers/index.js
import rootSaga from "./redux/sagas"; // imports ./redux/sagas/index.js
import App from "./components/App/App";
import "./tailwind.css";
import axios from "axios";

const config = {
  withCredentials: true,
  headers: {},
};
// axios.interceptors.request.use((request) => {
//   if (request.url === "authenticate/userState" || "authenticate/login") {
//     console.log("AXIOS TYO fuckssssssssss", request);
//     //request.headers.Poopie = "pooopie";
//   }

//   return request;
// });
// axios.interceptors.response.use((response) => {
//   console.log("INTerceptor RESPONSE", response);

//   return response;
// });
const sagaMiddleware = createSagaMiddleware();

// this line creates an array of all of redux middleware you want to use
// we don't want a whole ton of console logs in our production code
// logger will only be added to your project if your in development mode
const middlewareList =
  process.env.NODE_ENV === "development"
    ? [sagaMiddleware, logger]
    : [sagaMiddleware];

const store = createStore(rootReducer, applyMiddleware(...middlewareList));

// tells the saga middleware to use the rootSaga
// rootSaga contains all of our other sagas
sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("react-root")
);
