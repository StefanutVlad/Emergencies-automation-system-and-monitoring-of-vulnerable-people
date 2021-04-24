// // import React from "react";
// // import { useStateValue } from "./StateProvider";

// // function Login(props) {
// //   const [state, dispatch] = useStateValue();

// //   const loginToApp = () => {
// //     //login stuff

// //     //props.setName("Tonyy")
// //         //sau
// //     // dispatch({
// //     //   type: "SET_USER",
// //     //   Name: "TONYYy",
// //     // });
// //   };
// //   return (
// //     <div>
// //       <h1>Login component</h1>
// //       <button onClick={loginToApp}>Login</button>
// //     </div>
// //   );
// // }

// // export default Login;

import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import { login } from "../actions/auth";
import "./Login.scss";
//import { register } from "../actions/auth";
//import { auth } from "./firebase";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const Login = (props) => {
  //const history = useHistory();

  //const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  //const [showPassword, setShowPassword] = useState(false);
  //const [isSignup, setIsSignup] = useState(false);

  // const handleShowPassword = () =>
  //   setShowPassword((prevShowPassword) => !prevShowPassword);

  // const [required, setRequired] = useState(false);

  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { isLoggedIn } = useSelector((state) => state.AuthReducer);
  const { message } = useSelector((state) => state.MessageReducer);

  const dispatch = useDispatch();

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = (e) => {
    e.preventDefault(); //event prevents refreshing the page

    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      dispatch(login(username, password))
        .then(() => {
          props.history.push("/profile");
          window.location.reload();
        })
        .catch(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  };

  if (isLoggedIn) {
    return <Redirect to="/profile" />;
  }
  // const signIn = (e) => {
  //   //prevent page from refreshing
  //   e.preventDefault();

  //   // auth
  //   //   .signInWithEmailAndPassword(email, password)
  //   //   .then((auth) => {
  //   //     history.push("/");
  //   //   })
  //   //   .catch((error) => alert(error.message));
  //   //firebase login
  // };

  // const register = (e) => {
  //   //prevent page from refreshing
  //   e.preventDefault();

  //   //firebase register
  //   // auth
  //   //   //create a user
  //   //   .createUserWithEmailAndPassword(email, password)
  //   //   .then((auth) => {
  //   //     //if everything is ok
  //   //     console.log(auth);
  //   //     if (auth) {
  //   //       history.push("/");
  //   //     }
  //   //   })
  //   //   .catch((error) => alert(error.message));
  // };

  return (
    <div className="login">
      {/* <Link to="/">
        <img
          className="login__logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
          alt=""
        />
      </Link> */}
      <div className="login__container">
        <h1>Sign-in</h1>
        <Form onSubmit={handleLogin} ref={form}>
          {/* <h5>E-mail</h5>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            validations={[required]}
          /> */}

          <div className="form-group">
            <h5 htmlFor="username">Username</h5>
            <Input
              type="text"
              name="username"
              value={username}
              onChange={onChangeUsername}
              validations={[required]}
              className={"form_username"}
            />
          </div>

          <div className="form-group">
            <h5 htmlFor="password">Password</h5>
            <Input
              type="password"
              name="password"
              value={password}
              onChange={onChangePassword}
              validations={[required]}
              className={"form_password"}
            />
          </div>

          <button
            //className="login__signInButton"
            className="btn btn-primary btn-block"
            disabled={loading}
            // onClick={signIn} ????????????????????
            // type="submit"
          >
            {loading && (
              <span className="spinner-border spinner-border-sm"></span>
            )}
            Sign In
          </button>

          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>

        <div class="a-divider a-divider-break">
          <h5>New to Emergency System?</h5>
        </div>
        {/* <button className="login__registerButton"> */}
        {/* <nav className="navbar navbar-expand navbar-dark bg-dark">
          <div className="navbar-nav mr-auto"> */}
        <button className="btn btn-dark btn-block  mr-auto  ">
          {/* onClick={register} */}

          <Link to={"/register"} className="register_link">
            <li className="register_text">
              Create your Emergency system Account
            </li>
          </Link>
        </button>
        {/* </div> */}
        {/* </nav> */}
        <p>
          By signing-in you agree to Emergency system's Conditions of Use.
          Please see out Privacy Notice and our Cookies Notice.
        </p>
      </div>

      <div class="a-section a-spacing-top-extra-large auth-footer">
        <div class="a-divider a-divider-section">
          <div class="a-divider-inner"></div>
        </div>

        <div class="a-section a-spacing-small a-text-center a-size-mini">
          <span class="auth-footer-seperator"></span>

          <Link to={"/help/user/ConditionsOfUse"} className="register_link">
            Conditions of Use
          </Link>
          <span class="auth-footer-seperator"></span>

          <Link to={"/help/user/PrivacyNotice"} className="register_link">
            Privacy Notice
          </Link>

          <span class="auth-footer-seperator"></span>

          <Link to={"/help/user/Help"} className="register_link">
            Help
          </Link>
          <span class="auth-footer-seperator"></span>

          <Link to={"/help/user/CookiesNotice"} className="register_link">
            Cookies Notice
          </Link>
          <span class="auth-footer-seperator"></span>
        </div>

        <div class="a-section a-spacing-none a-text-center">
          <span class="a-size-mini a-color-secondary">
            © 2021, Emergency System, Inc. or its affiliates
          </span>
        </div>
      </div>
    </div>
  );
};
export default Login;

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

// import React, { Component } from "react";
// import "./Login.scss";
// import { Link, useHistory,Redirect } from "react-router-dom";

// import Form from "react-validation/build/form";
// import Input from "react-validation/build/input";
// import CheckButton from "react-validation/build/button";

// import { connect } from "react-redux";
// import { login } from "../actions/auth";
// //import { auth } from "./firebase";

// const required = (value) => {
//   if (!value) {
//     return (
//       <div className="alert alert-danger" role="alert">
//         This field is required!
//       </div>
//     );
//   }
// };

// class Login extends Component {
//   constructor(props) {
//     super(props);
//     this.handleLogin = this.handleLogin.bind(this);
//     this.onChangeUsername = this.onChangeUsername.bind(this);
//     this.onChangePassword = this.onChangePassword.bind(this);

//     this.state = {
//       username: "",
//       password: "",
//       loading: false,
//     };
//   }

//   onChangeUsername(e) {
//     this.setState({
//       username: e.target.value,
//     });
//   }

//   onChangePassword(e) {
//     this.setState({
//       password: e.target.value,
//     });
//   }

//   handleLogin(e) {
//     e.preventDefault();

//     this.setState({
//       loading: true,
//     });

//     this.form.validateAll();

//     const { dispatch, history } = this.props;

//     if (this.checkBtn.context._errors.length === 0) {
//       dispatch(login(this.state.username, this.state.password))
//         .then(() => {
//           history.push("/profile");
//           window.location.reload();
//         })
//         .catch(() => {
//           this.setState({
//             loading: false,
//           });
//         });
//     } else {
//       this.setState({
//         loading: false,
//       });
//     }
//   }

//   render() {
//     const { isLoggedIn, message } = this.props;

//     if (isLoggedIn) {
//       return <Redirect to="/profile" />;
//     }

//     return (
//       <div className="col-md-12">
//         <div className="card card-container">
//           <img
//             src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
//             alt="profile-img"
//             className="profile-img-card"
//           />

//           <Form
//             onSubmit={this.handleLogin}
//             ref={(c) => {
//               this.form = c;
//             }}
//           >
//             <div className="form-group">
//               <label htmlFor="username">Username</label>
//               <Input
//                 type="text"
//                 className="form-control"
//                 name="username"
//                 value={this.state.username}
//                 onChange={this.onChangeUsername}
//                 validations={[required]}
//               />
//             </div>

//             <div className="form-group">
//               <label htmlFor="password">Password</label>
//               <Input
//                 type="password"
//                 className="form-control"
//                 name="password"
//                 value={this.state.password}
//                 onChange={this.onChangePassword}
//                 validations={[required]}
//               />
//             </div>

//             <div className="form-group">
//               <button
//                 className="btn btn-primary btn-block"
//                 disabled={this.state.loading}
//               >
//                 {this.state.loading && (
//                   <span className="spinner-border spinner-border-sm"></span>
//                 )}
//                 <span>Login</span>
//               </button>
//             </div>

//             {message && (
//               <div className="form-group">
//                 <div className="alert alert-danger" role="alert">
//                   {message}
//                 </div>
//               </div>
//             )}
//             <CheckButton
//               style={{ display: "none" }}
//               ref={(c) => {
//                 this.checkBtn = c;
//               }}
//             />
//           </Form>
//         </div>
//       </div>
//     );
//   }
// }

// function mapStateToProps(state) {
//   const { isLoggedIn } = state.auth;
//   const { message } = state.message;
//   return {
//     isLoggedIn,
//     message,
//   };
// }

// export default connect(mapStateToProps)(Login);
