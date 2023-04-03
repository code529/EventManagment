const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

const Organizerlocals = function (req, res, next) {
  res.locals.role = "Organizer";
  next();
};
const UserLocals = function (req, res, next) {
  res.locals.role = "User";
  next();
};
const AdminLocals = function (req, res, next) {
  res.locals.role = "Admin";
  next();
};

const userRouter = express.Router();

userRouter.post("/login", authController.login);
userRouter.post("/signup", authController.signup);
userRouter.get("/logout");
userRouter.post("/forgotPassword", authController.forgotPassword);
userRouter.patch("/resetPassword/:token", authController.resetPassword);
userRouter.patch(
  "/updateMyPassword",
  authController.isLoggedIn,
  authController.updatePassword
);
userRouter.post("/organizers/login", Organizerlocals, authController.login);
userRouter.post("/organizers/signup", Organizerlocals, authController.signup);
userRouter.post("admin/login", AdminLocals, authController.login);
userRouter.post("admin/signup", AdminLocals, authController.signup);
userRouter.get("admin/logout");
userRouter.patch(
  "/updateMe",
  authController.isLoggedIn,
  userController.updateMe
);
userRouter.delete(
  "/deleteMe",
  authController.isLoggedIn,
  userController.deleteMe
);
userRouter.get("/me", authController.isLoggedIn, userController.getUser);
// user things :y

/**
 * -Login/signin
 * -Delete Account
 * -Forgot password
 * -signup
 */

module.exports = userRouter;
