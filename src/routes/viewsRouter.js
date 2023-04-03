const express = require("express");
const viewsRouter = express.Router();
const viewController = require("../controllers/viewsController");
viewsRouter.get("/login", viewController.getLoginForm);

module.exports = viewsRouter;
