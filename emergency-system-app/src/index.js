import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import reportWebVitals from "./reportWebVitals";
// import { StateProvider } from "./StateProvider";
// import reducer, { initialState } from "./reducer";

import "./sass/index.scss";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  /* Wrapper to prepare for async rendering */

  // <React.StrictMode>
  //   <StateProvider initialState={initialState} reducer={reducer}>
  //     <App />
  //   </StateProvider>
  // </React.StrictMode>,

  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// If you want your app to work offline and load faster, you can chađinge
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
