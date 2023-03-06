const mongoose = require('mongoose'); 

const EventSchema = mongoose.Schema({
    id : Number , 
    name : String , 
    date : Date , 
    location : String, 
    description : String, 
    image : String , 
    organizer : {name : String, email : String , phone : String}, 
    category : String, 
    price : Number 
});

const Event = mongoose.model('Event' , EventSchema); 
module.exports = Event ; 
