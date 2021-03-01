import React from "react";
//import logo from "./logo.svg";
import "./App.scss";
import Header from "./Header";
import ShowData from "./ShowData";

function App() {
  return (
    //BEM class naming convention
    <div className="app">
      <Header />
      <ShowData />
      {/*    */}
      <br />
      <h1> LICCC </h1>
    </div>
  );
}

export default App;
