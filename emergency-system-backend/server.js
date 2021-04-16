import express from "express";
import mongoose from "mongoose";
import Cors from "cors";
import bodyParser from "body-parser";
import middlewares from "middlewares";
import SerialPort from "serialport";
import ReadLine from "@serialport/parser-readline";
import Pusher from "pusher";
//import router from "./router.js";
import { createServer } from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import db from "./models/index.js";
import test1 from "./routes/authRoutes.js";
import test2 from "./routes/userRoutes.js";
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

//app.use(express.json()); //using exp w/ body parser
app.use(
  Cors({
    origin: "http://localhost:3000",
  })
);
// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
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

const Role = db.role;

//DB config - connect to DB
db.mongoose
  .connect(connection_url, {
    useNewUrlParser: true, //parameters for smooth connection
    //useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });

// const dbb = mongoose.connection;

// dbb.on("error", console.error.bind(console, "Connection Error:"));

// io.sockets.once("connection", (socket) => {
//   console.log("Socket.io connection established!");
//   sendData(socket);
// });

// function sendData(socket) {
//   parser.once("data", (data) => {
//     const dataObj = {
//       Name: "tone", //NUMELE USERULUI !!!!!!!!
//       ...JSON.parse(data),
//     };

//     //db.collection("users").updateOne({ Name: "tone" }, { $set: dataObj });

//     //console.log(dataObj);

//     io.emit("message", dataObj);

//     setTimeout(() => {
//       sendData(socket);
//     }, 500);
//   });
// }

// db.collection("users").insertOne({
//   Name: "tone",
//   BPM: "4",
//   Temperature: "a",
//   Latitude: "a",
//   Longitude: "0a",
//   Fall: " noooo ",
// });
//db.collection("users").deleteMany({});

test1(app);
test2(app);

//API endpoints -> router
//app.use("/", router);
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to tone application." });
});
//could add

server.listen(3004, () => console.log("Server is running on port ${port}"));

// {
//    "username": "a",
//    "email": "x",
//    "password": "a",
//    "data": [
//        {
//         "BPM": "x",
//         "Temperature": "a",
//         "Latitude": "a",
//         "Longitude": "x",
//         "Fall": " noooo "
//         }
//     ],
//    "roles": [{"name":"user"}]
// }

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "moderator",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'moderator' to roles collection");
      });

      new Role({
        name: "admin",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}
