import React, { useState } from "react";

function ShowData() {
  const [sensorData, setData] = useState([
    {
      //.........
    },
    {
      //........
    },
  ]);
  return (
    <div className="xxxx">
      {sensorData.map((data) => {
        // <h1>{data.name}</h1>
      })}
    </div>
  );
}

export default ShowData;
