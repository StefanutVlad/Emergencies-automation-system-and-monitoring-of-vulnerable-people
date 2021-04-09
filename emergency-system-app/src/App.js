import React from "react";
//import logo from "./logo.svg";
import "./App.scss";
import Header from "./Header";
import ShowData from "./ShowData";
import Map from "./Map";
function App() {
  return (
    //BEM class naming convention
    <div className="app">
      <Header />
      <ShowData />
      <Map />
      
      <br />
      <h1> LICCC </h1>
    </div>
  );
}

export default App;
