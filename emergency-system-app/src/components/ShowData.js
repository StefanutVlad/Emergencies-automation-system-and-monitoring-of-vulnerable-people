import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import "./ShowData.scss";
import axios from "../axios";
import { useSelector } from "react-redux";
import useGeoLocation from "../useGeoLocation";

import io from "socket.io-client";

import "./ShowData.scss";

function ShowData({ sensorsData }) {
  // const [sensorsData, setUsersData] = useState([]);
  const { user: currentUser } = useSelector((state) => state.AuthReducer);

  // const socket = io.connect("http://localhost:3004");

  // socket.on("connect", () => {
  //   if (socket.connected) {
  //     console.log("connected to the socket client");
  //   }
  // });

  // useEffect(() => {
  //   socket.once("message", (newData) => {
  //     console.log("SensorData: " + newData.Temperature);
  //     setUsersData([sensorsData, newData]);
  //   });
  // }, [sensorsData, socket]);

  //bbbbbbbbbbbbbbbbbbbbbb
  // //connection opened
  // socket.addEventListener("open", (event) => {
  //   socket.send("Hello Server! PING");
  //   console.log("connected to server");
  // });

  // //Listen for messages
  // socket.addEventListener("message", (event) => {
  //   console.log("msg from serv", event.data);
  // });

  //aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
  // const [socketUrl] = useState("ws://localhost:3004");
  // //setSocketUrl
  // const messageHistory = useRef([]);
  // //sendMessage
  // const { lastMessage, readyState } = useWebSocket(socketUrl);

  // messageHistory.current = useMemo(
  //   () => messageHistory.current.concat(lastMessage),
  //   [lastMessage]
  // );

  // const connectionStatus = {
  //   [ReadyState.CONNECTING]: "Connecting",
  //   [ReadyState.OPEN]: "Open",
  //   [ReadyState.CLOSING]: "Closing",
  //   [ReadyState.CLOSED]: "Closed",
  //   [ReadyState.UNINSTANTIATED]: "Uninstatntiated",
  // }[readyState];

  //const socket = new WebSocket("ws://localhost:3004"); ERA INAINTE

  // useEffect(() => {
  //   getGitHubUserWithFetch();
  // }, []);

  // const getGitHubUserWithFetch = async () => {
  //   const response = await fetch(link);
  //   const jsonData = await response.json();
  //   setUsersData(jsonData);
  // };

  // ADMIN BOARD: era  decomentat eventul asta. CE FACE???????????????????????? -> afiseaza intreaga DB -> BUN PT ADMIN BOARD
  // useEffect(() => {
  //   let mount = true;

  //   //intreaga db
  //   axios.get("/user/data").then((response) => {
  //     if (mount) {
  //       setUsersData(response.data);
  //     }
  //   });

  //   return () => {
  //     mount = false;
  //   };
  // }, []);
  // ??????????????????????????????????????????

  // useEffect(() => {
  //   async function fetchData() {
  //     const req = await axios.get("/user/data"); //await get endpoint

  //     setUsersData(req.data); //request the data
  //   }

  //   //useInterval(())....
  //   fetchData();
  // }, []);

  //useEffect(() => {
  // const pusher = new Pusher("3d40aeb32e847c4c28ef", {
  //   cluster: "eu",
  // });
  // const channel = pusher.subscribe("users");
  // channel.bind("update", (newData) => {
  //   alert("aaaa"+JSON.stringify(newData));
  //   setUsersData([...sensorsData, newData]);
  // });
  // //clean-up function
  // return () => {
  //  // channel.unbind_all();
  //  // channel.unsubscribe();
  // };
  //ALTA IDEEE
  // //connection opened
  // socket.addEventListener("open", (event) => {
  //   console.log("connected to ws server");
  // });
  // //Listen for messages
  // socket.addEventListener("message", (event) => {
  //   console.log("message from server", event.data);
  // });
  // }
  //}, [sensorsData]);

  //console.log(sensorsData);
  const location = useGeoLocation();
  let patientWaypoint = {};
  function getPatientLocation() {
    const a = sensorsData.map((user) => user.Latitude).join("");
    const b = sensorsData.map((user) => user.Longitude).join("");
    const c = location.coordinates.lat;
    const d = location.coordinates.lng;

    //console.log(" a: " + a + " b: " + b + " c: " + c + " d: " + d);
    if (a != 0.0 && b != 0.0) {
      patientWaypoint = {
        a,
        b,
      };
    } else {
      patientWaypoint = {
        c,
        d,
      };
    }
    return patientWaypoint;
  }

  console.log(
    "Rez A " +
      Object.values(getPatientLocation())[0] +
      " Rez B " +
      Object.values(getPatientLocation())[1]
  );

  return (
    <div className="xxxx">
      {/* senzorii sunt setati pe user */}
      {
        sensorsData.map(
          (user, i) =>
            currentUser.roles == "ROLE_USER" &&
            user.username && (
              <div key={i}>
                <h5>Name: {user.username} </h5>
                {/* <h1>Email: {currentUser.email}</h1>
          <h1>password: {currentUser.password}</h1> */}
                <h5>Role: {currentUser.roles}</h5>
                <h5>BPM: {user.BPM}</h5>
                <h5>Temperature: {user.Temperature}</h5>
                <h5>Latitude: {Object.values(getPatientLocation())[0]}</h5>
                <h5>Longitude: {Object.values(getPatientLocation())[1]}</h5>
                {/* <h1>Latitude: {user.Latitude}</h1>
              <h1>Longitude: {user.Longitude}</h1> */}
                <h5>Fall Detection: {user.Fall}</h5>
                <br />
              </div>
            )
        )
        //if admin???
      }

      {/* // !!!!!!!!!!   II BUN !!! */}
      {/* {currentUser && currentUser.roles == "ROLE_USER" && (
        <div>
          <h1>AAAAAName: {currentUser.username} </h1>
          <h1>Email: {currentUser.email}</h1>
          <h1>password: {currentUser.password}</h1>
          <h1>Role: {currentUser.roles}</h1>
          <h1>BPM: {currentUser.BPM}</h1>
          <h1>Temperature: {currentUser.Temperature}</h1>
          <h1>Latitude: {currentUser.Latitude}</h1>
          <h1>Longitude: {currentUser.Longitude}</h1>
          <h1>Fall Detection: {currentUser.Fall}</h1>
        </div>
      )} */}
      {/* TOATE DATELE DIN DB PT 443: USER ; 444: admin*/}
      {/* Daca suntem admin, ii afisam pe toti*/}
      {/* // TRELLLLLLOOOO aici ar trebui sa folosesc locatia din browser pt gps */}
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
}
export default ShowData;

// {
//       name: "Stef Vlad",
//       bpm: "55",
//       temperature: "36",
//       latitude: "47",
//       longitude: "23",
//       fall: "FALL DETECTED",
//     },
//     {name: String,
//       name: "B B",
//       bpm: "82",
//       temperature: "34",
//       latitude: "42",
//       longitude: "19",
//       fall: "-",
//     },
