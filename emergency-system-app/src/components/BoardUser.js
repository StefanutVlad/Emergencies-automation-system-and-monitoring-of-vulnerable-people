import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import UserService from "../services/UserService";
import "./BoardUser.scss";

const BoardUser = () => {
  //hooks
  const [content, setContent] = useState("");
  const { user: currentUser } = useSelector((state) => state.AuthReducer);

  useEffect(() => {
    UserService.getUserBoard().then(
      (response) => {
        setContent(response.data);
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
  }, []);

  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="container-user">
      <header className="">
        <h3 classname="top">
          <strong>{currentUser.username}</strong> {content}
        </h3>
        <h4>
          <strong>{currentUser.username}</strong> private data:
        </h4>
        <div className="content-user">
          <p>
            <strong>Token sneak peek:</strong>{" "}
            {currentUser.accessToken.substring(0, 20)} ...{" "}
            {currentUser.accessToken.substr(
              currentUser.accessToken.length - 20
            )}
          </p>
          <p>
            <strong>Unique id:</strong> {currentUser.id}
          </p>
          <p>
            <strong>Email:</strong> {currentUser.email}
          </p>
          <strong className="user-authorities">Authorities:</strong>
          <ul>
            {currentUser.roles &&
              currentUser.roles.map((role, index) => (
                <li key={index}>{role}</li>
              ))}
          </ul>
        </div>
      </header>
    </div>
  );
};

export default BoardUser;
