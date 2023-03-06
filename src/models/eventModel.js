const mongoose = require('mongoose'); 

const EventSchema = mongoose.Schema({
    Title : String 



});

const Event = mongoose.model('Event' , EventSchema); 
module.exports = Event ; 
