const mongoose = require("mongoose");
const validator = require("validator");
const Review = require('./reviewModel'); 
const Organizer = require('./organizer'); 
const Ticket = require('./tickets'); 



const EventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "An event must have a name"],
    trim: true,
    maxLength: [100, "An event name must be less than equal 100 characters"],
    minLength: [10, "An event name must be more than equal 10 characters"],
  },
  date: Date,
  location: String,
  description: {
    type: String,
    trim: true,
    maxLength: [
      500,
      "An event description must be less than equal 100 characters",
    ],
  },
  tickets : [
    {
      type : mongoose.Types.ObjectId, 
      ref : 'Ticket'
    }
  ],
  review : [
    {
      type : mongoose.Types.ObjectId,
      ref : 'Review'
    }
  ],
  image: { type: String, required: [true, "Must have an image"] },
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organizer',
    required: [true, 'An event must have an organizer'],
  },
  category: String,
  price: { type: Number, required: [true, "An event must have a price"] },
  tags: [
    {
      type: String,
    },
  ],
});

const Event = mongoose.model("Event", EventSchema);
module.exports = Event;
