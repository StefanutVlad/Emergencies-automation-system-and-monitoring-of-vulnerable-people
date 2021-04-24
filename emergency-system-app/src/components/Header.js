import React, { useState, useEffect } from "react";
import "./Header.scss";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
//import { useStateValue } from "../StateProvider";
import BoardModerator from "./BoardModerator";
import BoardAdmin from "./BoardAdmin";
import { logout } from "../actions/auth";
import { clearMessage } from "../actions/message";
import { history } from "../helpers/history";

function Header() {
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
  // const [{ user }, dispatch] = useStateValue();

  // const handleAuthention = () => {
  //   if (user) {
  //     user.signOut();
  //   }
  // };

  return (
    // <div className="header">
    //   I am header
    //   <Link to="/">
    //     <img
    //       alt=""
    //       className="header__logo"
    //       src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
    //     />
    //   </Link>
    //   <div className="header__search">
    //     <input className="header__searchInput" type="text" />
    //     {/* <SearchIcon className="header__searchIcon" /> */}
    //   </div>
    //   <div className="header__nav">
    //     {/*//only redirect to login if there is no user  */}
    //     <Link to={!user && "/login"}>
    //       <div onClick={handleAuthention} className="header__option">
    //         <span className="header__optionLineOne">
    //           Hello {!user ? "Guest" : user?.email}
    //         </span>
    //         <span className="header__optionLineTwo">
    //           {user ? "Sign Out" : "Sign In"}
    //         </span>
    //       </div>
    //     </Link>

    //     <Link to="/orders">
    //       <div className="header__option">
    //         <span className="header__optionLineOne">Return</span>
    //         <span className="header__optionLineTwo">& Orders</span>
    //       </div>
    //     </Link>

    //     <div className="header__option">
    //       <span className="header__optionLineOne">Your</span>
    //       <span className="header__optionLineTwo">Prime</span>
    //     </div>

    //     <Link to="/checkout">
    //       <div className="header__optionBasket">
    //         {/* <ShoppingBasketIcon />
    //         <span className="header__optionLineTwo header__basketCount">
    //           {basket?.length}
    //         </span> */}
    //       </div>
    //     </Link>
    //   </div>
    // </div>
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/"} className="navbar-brand">
          Emergency system
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/home"} className="nav-link">
              Home
            </Link>
          </li>

          {showModeratorBoard && (
            <li className="nav-item">
              <Link to={"/mod"} className="nav-link">
                Moderator Board
              </Link>
            </li>
          )}

          {showAdminBoard && (
            <li className="nav-item">
              <Link to={"/admin"} className="nav-link">
                Admin Board
              </Link>
            </li>
          )}

          {currentUser && (
            <li className="nav-item">
              <Link to={"/user"} className="nav-link">
                User
              </Link>
            </li>
          )}
        </div>

        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                {currentUser.username}
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                LogOut
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>

            
          </div>
        )}
      </nav>
    </div>
  );
}

export default Header;
