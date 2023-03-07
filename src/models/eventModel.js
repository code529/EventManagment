const mongoose = require("mongoose");
const validator = require("validator");
const EventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A event must have a name"],
    trim: true,
    maxLength: [100, "A event name must be less than equal 100 characters"],
    minLength: [10, "A event name must be more than equal 10 characters"],
    // validate: validator.isAlpha,
  },
  date: [Date],

  location: String,
  description: {
    type: String,
    trim: true,
    maxLength: [
      500,
      "A event description must be less than equal 100 characters",
    ],
  },

  image: { type: [String], required: [true, "Must have a  img"] },
  organizer: { name: String, email: String, phone: String },
  category: String,
  price: { type: Number, required: [true, "A event must have a price"] },
  priceDiscount: {
    type: Number,
    validate: {
      validator: function (val) {
        // this only points to current doc on new document creation
        return val < this.price;
      },
      message: "Discount Price({VALUE}) should be below regular price",
    },
  },
  imageCover: {
    type: String,
    // required: [true, "Must have a cover img"],
  },
  ageLimits: {
    type: Number,
  },
  category: String,
  tags: [
    {
      type: String,
    },
  ],
});

const Event = mongoose.model("event", EventSchema);
module.exports = Event;
