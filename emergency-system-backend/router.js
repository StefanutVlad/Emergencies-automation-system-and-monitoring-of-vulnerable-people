// import express, { Router } from "express";
// import Users from "./models/dbUserData.js";

// const router = Router();

// router.get("/", (req, res) => {
//   res.status(200).send({
//     title: "Node.js system app",
//     version: "1.0.0",
//   });
// });

// //endpoint to add the data into the DB
// router.post("/user/data", (req, res) => {
//   const dbData = req.body;

//   Users.create(dbData, (err, data) => {
//     if (err) {
//       res.status(500).send(err); //internal server error
//     } else {
//       res.status(201).send(data); //data created successfully
//     }
//   });
// });

// //endpoint to download all data from the DB collection
// router.get("/user/data", (req, res) => {
//   Users.find((err, data) => {
//     if (err) {
//       res.status(500).send(err);
//     } else {
//       res.status(200).send(data); //success status response
//     }
//   });
// });

// export default router;
