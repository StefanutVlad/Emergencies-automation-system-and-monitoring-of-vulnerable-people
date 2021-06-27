import React, { useState, useEffect } from "react";
//import { useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import UserService from "../services/UserService";
import axios from "../axios";
import UserCard from "./UserCard";
//import "./BoardAdmin.scss";

const BoardAdmin = ({ currentUser }) => {
  //hooks
  const [content, setContent] = useState("");
  const [users, setUsers] = useState([]);
  //const { user: currentUser } = useSelector((state) => state.AuthReducer);

  //set AdminBoard content
  useEffect(() => {
    UserService.getAdminBoard().then(
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

  //get request with db users
  useEffect(() => {
    axios.get("/user/data").then((response) => {
      console.log(response.data);
      const allUsers = response.data;
      setUsers(allUsers);
    });
  }, []);

  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="container-admin">
      <header className="">
        <div className="content-admin">
          <h4 className="admin-header-text">
            <strong>Users:</strong>
          </h4>
          <p className="admin-lead"></p>
          <div>
            {users.map((user, i) => (
              <div key={i}>
                <Link
                  to={`/${user.username}Board`}
                  currentuser={currentUser}
                  className="linkkk"
                >
                  <UserCard id={i} username={user.username} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </header>
    </div>
  );
};

export default BoardAdmin;
