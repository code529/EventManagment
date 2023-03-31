const mongoose = require("mongoose");
const validator = require("validator");
const Review = require('./reviewModel'); 


const EventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A event must have a name"],
    trim: true,
    maxLength: [100, "A event name must be less than equal 100 characters"],
    minLength: [10, "A event name must be more than equal 10 characters"],
  },
  date: Date,

  location: String,
  description: {
    type: String,
    trim: true,
    maxLength: [
      500,
      "A event description must be less than equal 100 characters",
    ],
  },
  review : [
    {
      type : mongoose.Types.ObjectId,
      ref : 'Review'
    }
  ],
  image: { type: String, required: [true, "Must have a  img"] },
  organizer: { name: String, email: String, phone: String },
  category: String,
  price: { type: Number, required: [true, "A event must have a price"] },

  category: String,
  tags: [
    {
      type: String,
    },
  ],
});

const Event = mongoose.model("event", EventSchema);
module.exports = Event;
