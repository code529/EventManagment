const e = require("express")
const Events = require('../models/eventModel');
const APIFeatures = require("./../utils/apiFeatures");


exports.home = function(req , res){




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
    await newEvent.save();
    console.log("Added");
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


}

