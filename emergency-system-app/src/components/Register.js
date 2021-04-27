import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import { isEmail } from "validator";
import { rregister } from "../actions/auth";
import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as Yup from "yup";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const validUsername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const validPassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

const Register = () => {
  const form = useRef();
  const checkBtn = useRef();

  const [isError, setIsError] = useState(false);
  const [isErrorPass, setIsErrorPass] = useState(false);
  const [terms, setTerms] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  //  const checkPassword = useRef({});
  const [email, setEmail] = useState("");
  const [successful, setSuccessful] = useState(false);

  const { message } = useSelector((state) => state.MessageReducer);
  const dispatch = useDispatch();

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
    console.log("passsssss: " + password);
  };
  const onConfirmPassword = (e) => {
    setCheckPassword(e.target.value);
    console.log(" Confirmcheckpassowrd: " + checkPassword);
  };

  const onCheckTerms = (e) => {
    setTerms(true);
    console.log("terms: " + terms);
  };
  const onCheckPassword = (e) => {
    setPassword(e.target.value);
    if (checkPassword !== e.target.value) {
      setIsErrorPass(true);
      setIsError(true);
    } else {
      setIsErrorPass(false);
      setIsError(false);
    }
  };
  const onCheckConfirmPassword = (e) => {
    const a = e.target.value;
    setCheckPassword(a);
    if (password !== e.target.value) {
      setIsError(true);
    } else {
      setIsError(false);
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();

    setSuccessful(false);

    form.current.validateAll();

    if (!isError && checkBtn.current.context._errors.length === 0) {
      dispatch(rregister(username, email, password))
        .then(() => {
          setSuccessful(true);
        })
        .catch(() => {
          setSuccessful(false);
        });
    }
  };

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />

        <Form onSubmit={handleRegister} ref={form}>
          {!successful && (
            <div>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <Input
                  type="text"
                  name="username"
                  value={username}
                  className={"form-control"}
                  onChange={onChangeUsername}
                  validations={[required, validUsername]}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Input
                  type="text"
                  className="form-control"
                  name="email"
                  value={email}
                  onChange={onChangeEmail}
                  validations={[required, validEmail]}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Input
                  type="password"
                  className="form-control"
                  name="password"
                  value={password}
                  // ref={cp}
                  placeholder={"At least six characters"}
                  onChange={onCheckPassword}
                  validations={[required, validPassword]}
                />
              </div>
              <div className="form-group">
                <label htmlFor="confirmPassword">Re-enter password</label>
                <Input
                  name="checkPassword"
                  type="password"
                  className="form-control"
                  value={checkPassword}
                  onChange={onCheckConfirmPassword}
                  validations={[required]}
                />
                {isError && (
                  <div className="alert alert-danger" role="alert">
                    " Passwords do not match."
                  </div>
                )}
              </div>

              <div className="form-group">
                <button className="btn btn-primary btn-block">Sign Up</button>
              </div>
            </div>
          )}

          {message && (
            <div className="form-group">
              <div
                className={
                  successful && !isError
                    ? "alert alert-success"
                    : "alert alert-danger"
                }
                role="alert"
              >
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
};

export default Register;
