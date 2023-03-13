const express = require("express");
const userController = require("../controllers/userController");
const authControllers = require("../controllers/authController");

const userRouter = express.Router();

userRouter.post("/login", authControllers.login);
userRouter.post("/signup", authControllers.signup);
userRouter.get("/logout");
userRouter.post("/organizers/login", authControllers.login);
userRouter.post("/organizers/signup", authControllers.signup);

// user things :
/**
 * -Login/signin
 * -Delete Account
 * -Forgot password
 * -signup
 */

module.exports = userRouter;
