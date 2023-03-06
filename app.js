const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const morgan = require("morgan");
require("dotenv").config("./.env");
const app = express();

const userRouter = require("./src/routes/userRoutes");
const eventRouter = require("./src/routes/userRoutes");

const DB = process.env.DB;
const PORT = process.env.PORT;

mongoose
  .connect(DB)
  .then(() => console.log("Connect to Database"))
  .catch((err) => console.log(err));
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("./src/assets"));
app.use("/", require("./src/routes"));
app.use("/api/v1/users/", userRouter);
app.use("/api/v1/events", eventRouter);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
