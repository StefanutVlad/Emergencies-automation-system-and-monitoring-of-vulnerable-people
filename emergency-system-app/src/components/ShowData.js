import React from "react";
import { useSelector } from "react-redux";
import useGeoLocation from "../useGeoLocation";
//import "./ShowData.scss";

const ShowData = ({ sensorsData }) => {
  const { user: currentUser } = useSelector((state) => state.AuthReducer);
  const location = useGeoLocation();
  let patientWaypoint = {};

  function getPatientLocation() {
    const userLatitude = sensorsData.map((user) => user.Latitude).join("");
    const userLongitude = sensorsData.map((user) => user.Longitude).join("");
    const geolocationLatitude = location.coordinates.lat;
    const geolocationLongitude = location.coordinates.lng;

    if (userLatitude != 0.0 && userLongitude != 0.0) {
      patientWaypoint = {
        userLatitude,
        userLongitude,
      };
    } else {
      patientWaypoint = {
        geolocationLatitude,
        geolocationLongitude,
      };
    }
    return patientWaypoint;
  }

  return (
    <div>
      {/* 443: USER ; 444: admin*/}
      {/* senzorii sunt setati pe user */}
      {sensorsData.map(
        (user, i) =>
          currentUser.roles == "ROLE_USER" &&
          user.username && (
            <div key={i}>
              <h5>Name: {user.username} </h5>
              <h5>Role: {currentUser.roles}</h5>
              <h5>BPM: {user.BPM}</h5>
              <h5>Temperature: {user.Temperature}</h5>
              <h5>Latitude: {Object.values(getPatientLocation())[0]}</h5>
              <h5>Longitude: {Object.values(getPatientLocation())[1]}</h5>
              <h5>Fall Detection: {user.Fall}</h5>
              <br />
            </div>
          )
      )}

      {/* senzorii sunt setati pe user */}
      {sensorsData.map(
        (user, i) =>
          currentUser.roles == "ROLE_ADMIN" &&
          user.username && (
            <div key={i}>
              <h5>Name: {currentUser.username} </h5>
              <h5>Email: {currentUser.email}</h5>
              <h5>Role: {currentUser.roles}</h5>
              <h5>BPM: {currentUser.BPM}</h5>
              <h5>Temperature: {currentUser.Temperature}</h5>
              <h5>Latitude: {currentUser.Latitude}</h5>
              <h5>Longitude: {currentUser.Longitude}</h5>
              <h5>Fall Detection: {currentUser.Fall}</h5>
              <br />
            </div>
          )
      )}
      <br />
      <br />
    </div>
  );
};
export default ShowData;
