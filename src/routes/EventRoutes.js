const express = require("express");

const eventRouter = express.Router();
const eventController = require("../controllers/eventController");
eventRouter
  .route("/")
  .post(eventController.createEvent)
  .get(eventController.getAllevents);
eventRouter
  .route("/:id")
  .get(eventController.getEvents)
  .delete(eventController.deleteEvent)
  .patch(eventController.updateEvent);

module.exports = eventRouter;
