const express = require("express");
const organizerControllers = require("../controllers/organizerController");

const organizerRouter = express.Router();

organizerRouter.post('/event' , organizerControllers.createEvent); 

module.exports = organizerRouter;
