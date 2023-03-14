const express = require("express");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const morgan = require("morgan");
require("dotenv").config("./.env");
const app = express();
const testmodel = require('./src/controllers/userController.js');


const userRouter = require("./src/routes/userRoutes");
const eventRouter = require("./src/routes/eventRoutes");
const organizerRouter = require('./src/routes/organizerRouter');

app.set("view engine" , "ejs");
app.set("views" , path.join(__dirname , 'assets'));

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("./src/assets"));
app.use("/", require("./src/routes"));

app.use("/api/v1/users", userRouter);
app.use("/api/v1/events", eventRouter);
app.use("/organizer" , organizerRouter);

module.exports = app;
