import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import "./ShowData.scss";
import axios from "./axios";
//import Pusher from "pusher-js";
//import WebSocket from "ws";
//import useWebSocket, { ReadyState } from "react-use-websocket";
//import { Server, Socket } from "socket.io";
import io from "socket.io-client";

function ShowData() {
  const [sensorsData, setUsersData] = useState([]);

  const socket = io.connect("http://localhost:3004");

  socket.on("connect", () => {
    if (socket.connected) {
      //     //console.log("connected to the socket client");
    }
  });

  useEffect(() => {
    socket.once("message", (newData) => {
      //console.log(newData);
      setUsersData([sensorsData, newData]);
    });
  }, [sensorsData, socket]);

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

  //React hook

  useEffect(() => {
    axios.get("/user/data").then((response) => {
      setUsersData(response.data);
    });
  }, []);

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

  return (
    <div className="xxxx">
      {sensorsData.map(
        (user) =>
          typeof user.Name !== "undefined" && (
            <div>
              <h1>Name: {user.username} </h1>
              <h1>Email: {user.email}</h1>
              <h1>password: {user.password}</h1>
              <h1>Role: {user.roles}</h1>
              <h1>BPM: {user.data.BPM}</h1>
              <h1>Temperature: {user.data.Temperature}</h1>
              <h1>Latitude: {user.data.Latitude}</h1>
              <h1>Longitude: {user.data.Longitude}</h1>
              <h1>Fall Detection: {user.data.Fall}</h1>
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
