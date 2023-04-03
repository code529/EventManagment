const express = require("express");
const organizerControllers = require("../controllers/organizerController");
const authController = require("../controllers/authController_org");
const organizerRouter = express.Router();

organizerRouter.post("/event", organizerControllers.createEvent);
organizerRouter.post("/login", authController_org.login);
organizerRouter.post("/signup", authController_org.signup);
organizerRouter.get("/logout");
organizerRouter.post("/forgotPassword", authController_org.forgotPassword);
organizerRouter.patch("/resetPassword/:token", authController_org.resetPassword);

module.exports = organizerRouter;
