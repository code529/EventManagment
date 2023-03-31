const express = require("express");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const morgan = require("morgan");
require("dotenv").config("./.env");
const app = express();

const passport = require("passport");
require("./src/utils/passportConfig.js");
const cookieSession = require("cookie-session");

const testmodel = require("./src/controllers/userController.js");
const organizerRouter = require("./src/routes/organizerRouter.js");
const userRouter = require("./src/routes/userRoutes");
const eventRouter = require("./src/routes/eventRoutes");
const reviewRouter = require("./src/routes/reviewRoutes");

app.set("view engine", "ejs");
app.set("views", "./src/assets");
app.use(express.static("./src/assets"));
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use("/", homeRouter);

app.use("/api/v1/users", userRouter);
app.use("/api/v1/events", eventRouter);
app.use("/api/v1/organizer", organizerRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use(
  cookieSession({
    name: "google-auth-session",
    keys: ["key1", "key2"],
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("<button><a href='/auth'>Login With Google</a></button>");
});

// Auth
app.get(
  "/auth",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

// Auth Callback
app.get(
  "/auth/callback",
  passport.authenticate("google", {
    successRedirect: "/auth/callback/success",
    failureRedirect: "/auth/callback/failure",
  })
);

// Success
app.get("/auth/callback/success", (req, res) => {
  if (!req.user) res.redirect("/auth/callback/failure");
  res.send("Welcome " + req.user.email);
});

// failure
app.get("/auth/callback/failure", (req, res) => {
  res.send("Error");
});
module.exports = app;
