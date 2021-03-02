import React, { useState } from "react";
import "./ShowData.scss";

function ShowData() {
  const [sensorData, setData] = useState([
    {
      name: "Stef Vlad",
      bpm: "55",
      temperature: "36",
      latitude: "47",
      longitude: "23",
      fall: "FALL DETECTED",
    },
    {
      name: "B B",
      bpm: "82",
      temperature: "34",
      latitude: "42",
      longitude: "19",
      fall: "-",
    },
  ]);

  return (
    <div className="xxxx">
      {sensorData.map((user) => (
        <div>
          <h1>tt {user.bpm}</h1>
          <br />
          <h1> {user.name}</h1>
        </div>
      ))}
    </div>
  );
}

export default ShowData;
