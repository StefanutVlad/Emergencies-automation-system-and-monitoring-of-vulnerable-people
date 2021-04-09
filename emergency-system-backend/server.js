import express from "express";
import mongoose from "mongoose";
import Cors from "cors";
import middlewares from "middlewares";
import SerialPort from "serialport";
import ReadLine from "@serialport/parser-readline";
import Pusher from "pusher";
import router from "./router.js";
import { createServer } from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
//App config
dotenv.config();
//console.log(process.env);
const app = express();

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

app.use(express.json()); //using exp w/ body parser
app.use(
  Cors({
    origin: "http://localhost:3000",
  })
);


//Listener

const Readline = SerialPort.parsers.Readline;
const port = new SerialPort("COM5", {
  baudRate: 9600,
  dataBits: 8,
  parity: "none",
  stopBits: 1,
  flowControl: false,
});

const parser = new Readline("\r\n");
port.pipe(parser);

//const port = process.env.PORT || 3000;
//const port = io("192.168.1.103:1337");
const connection_url = process.env.MONGO_URI;

//DB config - connect to DB
mongoose.connect(connection_url, {
  useNewUrlParser: true, //parameters for smooth connection
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Connection Error:"));

io.sockets.once("connection", (socket) => {
  console.log("Socket.io connection established!");
  sendData(socket);
});

function sendData(socket) {
  parser.once("data", (data) => {
    const dataObj = {
      Name: "tone", //NUMELE USERULUI !!!!!!!!
      ...JSON.parse(data),
    };

    db.collection("users").updateOne({ Name: "tone" }, { $set: dataObj });

    console.log(dataObj);

    io.emit("message", dataObj);

    setTimeout(() => {
      sendData(socket);
    }, 500);
  });
}

// db.collection("users").insertOne({
//   Name: "tone",
//   BPM: "4",
//   Temperature: "a",
//   Latitude: "a",
//   Longitude: "0a",
//   Fall: " noooo ",
// });
//db.collection("users").deleteMany({});

//API endpoints -> router
app.use("/", router);

//could add

server.listen(3004, () => console.log("Server is running on port ${port}"));
