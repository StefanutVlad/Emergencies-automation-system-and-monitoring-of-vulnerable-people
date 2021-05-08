import React from "react";
import { Link } from "react-router-dom";
import "./Footer.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faGoogle,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="footer pt-5 mt-5">
      <hr className="horizontal dark mb-5" />
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-4">
            <div>
              <h6 className="text-gradient text-footer footer-font-weight-bolder">
                Emergency System
              </h6>
            </div>
            <div>
              <h6 className="mt-3 mb-2 opacity-8">Social</h6>
              <ul className="d-flex flex-row ms-n3 social">
                <li className="social-item">
                  <Link to={"/"} className="social-link pe-1">
                    <FontAwesomeIcon
                      icon={faFacebook}
                      className="text-lg text-white opacity-8"
                      aria-hidden="true"
                    ></FontAwesomeIcon>
                  </Link>
                </li>
                <li className="social-item">
                  <Link to={"/"} className="social-link pe-1">
                    <FontAwesomeIcon
                      icon={faTwitter}
                      className="twitt text-lg text-white  opacity-8"
                      aria-hidden="true"
                    ></FontAwesomeIcon>
                  </Link>
                </li>
                <li className="social-item">
                  <Link to={"/"} className="social-link pe-1">
                    <FontAwesomeIcon
                      icon={faGoogle}
                      className="text-lg text-white  opacity-8"
                      aria-hidden="true"
                    ></FontAwesomeIcon>
                  </Link>
                </li>
                <li className="social-item">
                  <Link to={"/"} className="social-link pe-1">
                    <FontAwesomeIcon
                      icon={faInstagram}
                      className="text-lg text-white  opacity-8"
                      aria-hidden="true"
                    ></FontAwesomeIcon>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-1 col-sm-12 col-6 mb-2 text-center ">
            <div>
              <h6 className="text-white footer-text text-center">Company</h6>
            </div>

            <div className="a-footer-section a-spacing-small a-text-center a-size">
              <span className="auth-footer-seperator"></span>
              <div className="mt-2">
                <Link
                  to={"/help/user/ConditionsOfUse"}
                  className="text-white footer_link pe-3"
                >
                  Conditions of Use
                </Link>
                <span className="auth-footer-seperator"></span>

                <Link
                  to={"/help/user/PrivacyNotice"}
                  className="text-white footer_link pe-3"
                >
                  Privacy Notice
                </Link>

                <span className="auth-footer-seperator"></span>

                <Link
                  to={"/help/user/CookiesNotice"}
                  className="text-white footer_link pe-3"
                >
                  Cookies Notice
                </Link>
              </div>
              <span className="auth-footer-seperator"></span>
            </div>
          </div>

          <div className="col-12">
            <div className="text-center">
              <p className="my-4 text-white text-sm">
                All rights reserved. Copyright ©
                <script>document.write(new Date().getFullYear())</script>2021
                Emergency System by Vlad Antonio Stefanut.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
