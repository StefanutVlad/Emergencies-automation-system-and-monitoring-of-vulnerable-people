// Authorization:

// GET /api/test/all
// GET /api/test/user for loggedin users (user/moderator/admin)
// GET /api/test/mod for moderator
// GET /api/test/admin for admin

import authJwt from "../middlewares/authJwt.js";
import controller from "../controllers/userController.js";

function userRoutes(router) {
  router.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  router.get("/", (req, res) => {
    res.status(200).send({
      title: "Tony's Node.js system app",
      version: "1.0.0",
    });
  });

  //endpoint to download all data from the DB collection
  router.get("/user/data", (req, res) => {
    users.find((err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(data); //success status response
      }
    });
  });

  router.get("/api/test/all", controller.allAccess);

  router.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);

  router.get(
    "/api/test/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );

  router.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
}

export default userRoutes;
