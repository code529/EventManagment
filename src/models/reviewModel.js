const mongoose = require("mongoose");
const Event = require("./eventModel");
const User = require("./userModel");
const reviewSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    review: {
      type: String,
      required: [true, "Review cant be empty"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    event: {
      type: mongoose.Schema.ObjectId,
      ref: "Event",
      required: [true, "Review must belong to a event"],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Review must belong to a user"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
reviewSchema.pre("/^find/", function (next) {
  this.populate({
    path: "event",
    select: "name",
  }).populate({
    path: "user",
    select: "name",
  });
  next();
});
const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
