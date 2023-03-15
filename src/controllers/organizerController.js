const e = require("express")
const Events = require('../models/eventModel');
const APIFeatures = require("./../utils/apiFeatures");


exports.home = function(req , res){

    // Name and all that pages which are needed 



}



exports.getEvents = async (req, res) => {
  try {
    const event = await Event.findById(res.locals.id);
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

exports.createEvent = async (req, res) => {
  try {
    const newEvent = new Events(req.body);
    newEvent.save().then(()=>{console.log("Added")})
    .catch(err=>{console.log(err)});
    res.status(201).json({
      status: "success",
      data: {
        event: newEvent,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "Fail",
      message: err,
    });
  }
};


exports.events = async function(req , res){

    // List all the Events in a render file

}


// Create Event 