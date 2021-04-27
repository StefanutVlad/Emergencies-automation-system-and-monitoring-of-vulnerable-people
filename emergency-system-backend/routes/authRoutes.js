// Authentication:
// POST / api / auth / signup;
// POST / api / auth / signin;

import verifySignUp from "../middlewares/verifySignUp.js";
import controller from "../controllers/authController.js";
import Users from "../models/dbUserData.js";

function authenticationRoutes(router) {
  router.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  //endpoint to add the data into the DB
  router.post("/user/data", (req, res) => {
    const dbData = req.body;

    Users.create(dbData, (err, data) => {
      if (err) {
        res.status(500).send(err); //internal server error
      } else {
        res.status(201).send(data); //data created successfully
      }
    });
  });

  router.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted,
    ],
    controller.signup
  );

  router.post("/api/auth/signin", controller.signin);
}
export default authenticationRoutes;
