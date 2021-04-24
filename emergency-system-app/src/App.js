// import React, { useState } from "react";
// //import logo from "./logo.svg";
// import "./App.scss";
// import Header from "./components/Header";
// import ShowData from "./components/ShowData";
// import Map from "./components/Map";
// import Login from "./components/Login";
// import { useStateValue } from "./StateProvider";
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// function App() {
//   //Global state
//   const [state, dispatch] = useStateValue();

//   //autentificare

//   return (
//     //BEM class naming convention
//     <Router>
//       <div className="app">
//         <Switch>
//           <Route path="/login">
//             <h3>
//               {state.Name
//                 ? `The user logged in is ${state.Name}`
//                 : "no user logged in"}
//             </h3>
//             <Login />
//           </Route>

//           <Route path="/">
//             <Header />
//             <ShowData />

//             <Map />
//             <br />
//             <h1> LICCC </h1>
//           </Route>
//         </Switch>
//       </div>
//     </Router>
//   );
// }

// export default App;

import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { Router, Switch, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import BoardUser from "./components/BoardUser";
import BoardModerator from "./components/BoardModerator";
import BoardAdmin from "./components/BoardAdmin";
import Header from "./components/Header";

// import { logout } from "./actions/auth";
// import { clearMessage } from "./actions/message";

import { history } from "./helpers/history";
import ConditionsOfUse from "./components/help/ConditionsOfUse";

const App = () => {
  

  //?????????????????????????
  //const { currentUser, showModeratorBoard, showAdminBoard } = this.state;
  return (
    <Router history={history}>
      <Header />

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/home"]} component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/profile" component={Profile} />
          <Route path="/user" component={BoardUser} />
          <Route path="/mod" component={BoardModerator} />
          <Route path="/admin" component={BoardAdmin} />

          <Route path="/help/user/ConditionsOfUse" component={ConditionsOfUse} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
