import React from "react";
import ShowData from "./ShowData";
import Map from "./Map";
import "./Profile.scss";

const Profile = ({ sensorsData }) => {
  return (
    <div className="container-profile">
      <h1>Your data</h1>
      <header>
        <ShowData sensorsData={sensorsData} className="sensor-data" />
        <Map sensorsData={sensorsData} className="google-map" />
      </header>
    </div>
  );
};

export default Profile;
