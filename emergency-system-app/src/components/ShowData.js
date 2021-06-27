import React from "react";

import useGeoLocation from "../useGeoLocation";

const ShowData = ({ currentUser, sensorsData }) => {
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
      {/* sensors set on user */}
      {sensorsData.map(
        (user, i) =>
          user.username && (
            <div key={i}>
              <h5>Name: {user.username} </h5>
              {/* <h5>Role: {currentUser.roles}</h5> */}
              <h5>Role: ROLE_USER</h5>
              <h5>BPM: {user.BPM}</h5>
              <h5>Temperature: {user.Temperature}</h5>
              <h5>Latitude: {Object.values(getPatientLocation())[0]}</h5>
              <h5>Longitude: {Object.values(getPatientLocation())[1]}</h5>
              <h5>Fall Detection: {user.Fall}</h5>
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
