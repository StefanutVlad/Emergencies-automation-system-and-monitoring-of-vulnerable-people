import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import UserService from "../services/UserService";

const BoardUser = () => {
  //hooks
  const [content, setContent] = useState("");
  const { user: currentUser } = useSelector((state) => state.AuthReducer);

  useEffect(() => {
    let mounted = true;

    UserService.getUserBoard().then(
      (response) => {
        if (mounted) {
          setContent(response.data);
        }
      },
      (error) => {
        setContent(
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString()
        );
      }
    );

    return () => (mounted = false);
  }, []);

  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>{content}</h3>
        <h3>
          <strong>{currentUser.username}</strong> Profile
        </h3>
      </header>

      <p>
        <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)} ...{" "}
        {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
      </p>
      <p>
        <strong>Id:</strong> {currentUser.id}
      </p>
      <p>
        <strong>Email:</strong> {currentUser.email}
      </p>
      <strong>Authorities:</strong>
      <ul>
        {currentUser.roles &&
          currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
      </ul>
    </div>
  );
};

export default BoardUser;
