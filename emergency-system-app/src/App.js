import React, { useState } from "react";
//import logo from "./logo.svg";
import "./App.scss";
import Header from "./Header";
import ShowData from "./ShowData";
import Map from "./Map";
import Login from "./Login";
import { useStateValue } from "./StateProvider";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  //Global state
  const [state, dispatch] = useStateValue();

  //autentificare

  return (
    //BEM class naming convention
    <Router>
      <div className="app">
        <Switch>
          <Route path="/login">
            <h3>
              {state.Name
                ? `The user logged in is ${state.Name}`
                : "no user logged in"}
            </h3>
            <Login />
          </Route>

          <Route path="/">
            <Header />
            <ShowData />
            <Map />
            <br />
            <h1> LICCC </h1>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
