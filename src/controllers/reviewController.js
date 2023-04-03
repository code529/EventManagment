const Review = require("./../models/reviewModel");

exports.getAllReviews = async (req, res, next) => {
  let temp = {};
  if (req.params.eventId) temp = { event: req.params.eventId };
  const reviews = await Review.find(temp);
  res.status(200).json({
    status: "success",
    results: reviews.length,
    data: {
      reviews,
    },
  });
};
exports.createReview = async (req, res, next) => {
  if (!req.body.event) req.body.event = req.params.eventId;
  if (!req.body.user) req.body.user = req.user.id;
  const newReview = await Review.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      review: newReview,
    },
  });
};
exports.getReviews = async (req, res) => {
  try {
    const event = await Review.findById(req.params.id);
    res.status(201).json({
      status: "success",
      data: {
        event: event,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "Fail",
      message: err,
    });
  }
};
exports.updateReview = async (req, res) => {
  try {
    const review = await Review.findbyIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(201).json({
      status: "success",
      data: {
        review,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
exports.deleteReview = async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "Fail",
      message: err,
    });
  }
};
