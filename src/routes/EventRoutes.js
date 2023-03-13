const express = require("express");

const eventRouter = express.Router();
const eventController = require("../controllers/eventController");
const authControllers = require("../controllers/authController");
eventRouter
  .route("/")
  .post(eventController.createEvent)
  .get(authControllers.isLoggedIn, eventController.getAllevents);
eventRouter
  .route("/:id")
  .get(eventController.getEvents)
  .delete(eventController.deleteEvent)
  .patch(eventController.updateEvent);

module.exports = eventRouter;
