const express = require("express");
const reviewController = require("./../controllers/reviewController");
const authController = require("./../controllers/authController");
const reviewRouter = express.Router({ mergeParams: true });
reviewRouter.use(authController.isLoggedIn);
reviewRouter
  .route("/")
  .get(reviewController.getAllReviews)
  .post(reviewController.createReview);
reviewRouter
  .route("/:id")
  .get(reviewController.getReviews)
  .patch(reviewController.updateReview)
  .delete(reviewController.deleteReview);
module.exports = reviewRouter;
