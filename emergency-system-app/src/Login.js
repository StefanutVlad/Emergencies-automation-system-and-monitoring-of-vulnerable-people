// import React from "react";
// import { useStateValue } from "./StateProvider";

// function Login(props) {
//   const [state, dispatch] = useStateValue();

//   const loginToApp = () => {
//     //login stuff

//     //props.setName("Tonyy")
//         //sau
//     // dispatch({
//     //   type: "SET_USER",
//     //   Name: "TONYYy",
//     // });
//   };
//   return (
//     <div>
//       <h1>Login component</h1>
//       <button onClick={loginToApp}>Login</button>
//     </div>
//   );
// }

// export default Login;

import React, { useState } from "react";
import "./Login.scss";
import { Link, useHistory } from "react-router-dom";
//import { auth } from "./firebase";

function Login() {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);

  const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);
  
  
  const signIn = (e) => {
    //prevent page from refreshing
    e.preventDefault();

    // auth
    //   .signInWithEmailAndPassword(email, password)
    //   .then((auth) => {
    //     history.push("/");
    //   })
    //   .catch((error) => alert(error.message));
    //firebase login
  };

  const register = (e) => {
    //prevent page from refreshing
    e.preventDefault();

    //firebase register
    // auth
    //   //create a user
    //   .createUserWithEmailAndPassword(email, password)
    //   .then((auth) => {
    //     //if everything is ok
    //     console.log(auth);
    //     if (auth) {
    //       history.push("/");
    //     }
    //   })
    //   .catch((error) => alert(error.message));
  };
  return (
    <div className="login">
      <Link to="/">
        <img
          className="login__logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
          alt=""
        />
      </Link>

      <div className="login__container">
        <h1>Sign-in</h1>
        <form action="">
          <h5>E-mail</h5>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="login__signInButton"
            onClick={signIn}
            type="submit"
          >
            Sign In
          </button>
        </form>

        <p>
          By signing-in you agree to Emergency system's Conditions of Use.
          Please see out Privacy Notice, out Cookies Notice and our
          Interest-Based Ads
        </p>

        <button className="login__registerButton" onClick={register}>
          Create your Emergency system Account
        </button>
      </div>
    </div>
  );
};

export default Login;
