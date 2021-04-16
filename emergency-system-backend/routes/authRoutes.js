// Authentication:
// POST / api / auth / signup;
// POST / api / auth / signin;

import verifySignUp from "../middlewares/verifySignUp.js";
import controller from "../controllers/authController.js";

function test1(app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted,
    ],
    controller.signup
  );

  app.post("/api/auth/signin", controller.signin);
}
export default test1;
