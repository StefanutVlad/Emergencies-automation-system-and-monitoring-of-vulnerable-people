import React, { useState, useEffect } from "react";

//import { Redirect } from "react-router-dom";
// import { useSelector } from "react-redux";
import io from "socket.io-client";
import ShowData from "./ShowData";
import Map from "./Map";
import "./Profile.scss";

const Profile = ({ sensorsData }) => {
  return (
    <div className="container-profile">
      <h1>Your data</h1>
      <header>
        {/* <h1>aaa</h1> */}

        <ShowData sensorsData={sensorsData} className="sensor-data" />

        <Map sensorsData={sensorsData} className="google-map" />
        {/* <h3>  
          <strong>{currentUser.username}</strong> Profile
        </h3> */}
      </header>
      {/* <p>
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
      </ul> */}
    </div>
  );
};

export default Profile;
