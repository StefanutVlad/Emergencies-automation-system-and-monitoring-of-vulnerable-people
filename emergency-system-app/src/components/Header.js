import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/auth";
import { clearMessage } from "../actions/message";
import { history } from "../helpers/history";
import "./Header.scss";

const Header = ({ sensorsData }) => {
  //hooks
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);

  const { user: currentUser } = useSelector((state) => state.AuthReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage()); // clear message when changing location
    });
  }, [dispatch]);

  useEffect(() => {
    if (currentUser) {
      setShowModeratorBoard(currentUser.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(currentUser.roles.includes("ROLE_ADMIN"));
    }
  }, [currentUser]);

  const logOut = () => {
    dispatch(logout());
  };

  return (
    <div className="presentation-page">
      <div className="container position-sticky z-index-sticky col-12">
        <nav className="navbar navbar-expand-lg  blur blur-rounded top-0 z-index-fixed shadow position-absolute my-3 py-2 start-0 end-0 mx-4">
          <div className="container-fluid">
            <Link
              to={"/"}
              className="text-gradient text-nav-primary font-weight-bolder ms-sm-3 "
            >
              Emergency system
            </Link>

            <button
              className="navbar-toggler shadow-none ms-2 collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navigation"
              aria-controls="navigation"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon mt-2">
                <span className="navbar-toggler-bar bar1"></span>
                <span className="navbar-toggler-bar bar2"></span>
                <span className="navbar-toggler-bar bar3"></span>
              </span>
            </button>

            <div
              className="collapse navbar-collapse pt-3 pb-2 py-lg-0 w-100 "
              id="navigation"
            >
              <ul className="navbar-nav navbar-nav-hover ps-lg-5 w-100 ">
                <div className="nana ">
                  <li className="nav-item mx-2">
                    <Link to={"/home"} className="nav-link text-decoration">
                      Home
                    </Link>
                  </li>
                </div>

                {currentUser ? (
                  <div className=" container">
                    <div className="nana">
                      {currentUser.roles == "ROLE_USER" ? (
                        <li className="nav-item-user mx-2">
                          <Link
                            to={"/user"}
                            className="nav-link"
                            // id="dropdownMenuPages"
                            // data-bs-toggle="dropdown"
                            // aria-expanded="false"
                          >
                            {currentUser.username} Profile
                          </Link>
                        </li>
                      ) : (
                        <li className="nav-item-admin mx-2">
                          <Link
                            to={"/user"}
                            className="nav-link"
                            // id="dropdownMenuPages"
                            // data-bs-toggle="dropdown"
                            // aria-expanded="false"
                          >
                            {currentUser.username} Profile
                          </Link>
                        </li>
                      )}

                      {showModeratorBoard && (
                        <li className="nav-item mx-2">
                          <Link to={"/mod"} className="nav-link">
                            Moderator Board
                          </Link>
                        </li>
                      )}

                      {showAdminBoard && (
                        <li className="nav-item mx-2 ">
                          <Link to={"/admin"} className="nav-link">
                            Admin Board
                          </Link>
                        </li>
                      )}
                    </div>

                    <div className="navbar-nav ml-auto ">
                      <li className="nav-item mx-2">
                        <Link to={"/profile"} className="nav-link">
                          {currentUser.username}
                        </Link>
                      </li>
                      <li className="nav-item ms-3 ms-lg-0">
                        <a href="/login" className="nav-link" onClick={logOut}>
                          LogOut
                        </a>
                      </li>
                    </div>
                  </div>
                ) : (
                  <div className="navbar-nav ml-auto ">
                    <li className="nav-item">
                      <Link to={"/login"} className="nav-link">
                        Login
                      </Link>
                    </li>
                  </div>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </div>

      <header className="bg-gradient-dark">
        <div className="a page-header section-height-75">
          <span className="mask bg-gradient-info opacity-8 bg"></span>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-8 text-center mx-auto my-auto">
                <h1 className="text-white">Emergency System</h1>
                <p className="lead mb-4 text-white opacity-8">
                  Emergencies automation system and monitoring of vulnerable
                  people
                </p>
                <button
                  type="submit"
                  className="btn-account bg-white text-dark"
                >
                  <Link to={"/register"}>Create Account</Link>
                </button>
              </div>
            </div>
          </div>

          <div className="position-absolute w-100 z-index-1 bottom-0">
            <svg
              className="waves"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 24 150 40"
              preserveAspectRatio="none"
              shapeRendering="auto"
            >
              <defs>
                <path
                  id="gentle-wave"
                  d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
                ></path>
              </defs>
              <g className="moving-waves">
                <use
                  xlinkHref="#gentle-wave"
                  x="48"
                  y="-1"
                  fill="rgba(255,255,255,0.40"
                ></use>
                <use
                  xlinkHref="#gentle-wave"
                  x="48"
                  y="3"
                  fill="rgba(255,255,255,0.35)"
                ></use>
                <use
                  xlinkHref="#gentle-wave"
                  x="48"
                  y="5"
                  fill="rgba(255,255,255,0.25)"
                ></use>
                <use
                  xlinkHref="#gentle-wave"
                  x="48"
                  y="8"
                  fill="rgba(255,255,255,0.20)"
                ></use>
                <use
                  xlinkHref="#gentle-wave"
                  x="48"
                  y="13"
                  fill="rgba(255,255,255,0.15)"
                ></use>
                <use
                  xlinkHref="#gentle-wave"
                  x="48"
                  y="16"
                  fill="rgba(255,255,255,1"
                ></use>
              </g>
            </svg>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
