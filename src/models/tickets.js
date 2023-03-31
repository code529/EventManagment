const mongoose = require("mongoose");

const TicketSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter a name for the ticket"],
  },
  price: {
    type: Number,
    required: [true, "Please enter a price for the ticket"],
  },
  description: {
    type: String,
    required: [true, "Please enter a description for the ticket"],
  },
});

const Ticket = mongoose.model("Ticket", TicketSchema);

module.exports = Ticket;
