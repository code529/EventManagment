const mongoose = require('mongoose'); 

const schema = new mongoose.Schema({
    eventId :{ 
    type : mongoose.Schema.Types.ObjectId , 
    required : [true , "Can't save userId without event"]
    }, 
    userId : [{
        type : {
            type : mongoose.Schema.Types.ObjectId, 
            ref : 'User'
        }  
    }]
});



const eventAndUser = mongoose.model('Eventanduser', schema); 
module.exports = eventAndUser; 
