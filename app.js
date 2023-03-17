const express = require("express");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const morgan = require("morgan");
require("dotenv").config("./.env");
const app = express();
const testmodel = require("./src/controllers/userController.js");
const organizerRouter = require("./src/routes/organizerRouter.js");

const userRouter = require("./src/routes/userRoutes");
const eventRouter = require("./src/routes/eventRoutes");

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

module.exports = app;
