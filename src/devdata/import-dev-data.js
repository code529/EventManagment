const fs = require('fs');
const mongoose = require('mongoose'); 
const eventModel = require('../models/eventModel');
require('dotenv').config({path : '../../.env'}); 

const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
);

connection = async function(){
    await mongoose.connect(DB); 
    console.log("Database connected");
}

connection(); 

const Event = JSON.parse(fs.readFileSync(`${__dirname}/Event.json` , 'utf-8'));

const importData = async () => {
    try {
        await eventModel.create(Event); 
        console.log("Data Successfully loaded"); 
    } catch (error) {
        console.log(err);    
    }
    process.exit();
  };

const deleteData = async () => {
    try {
      await eventModel.deleteMany(); 
      console.log('Data successfully deleted!');
    } catch (err) {
      console.log(err);
    }
    process.exit();
  };
  
  if (process.argv[2] === '--import') {
    importData();
  } else if (process.argv[2] === '--delete') {
    deleteData();
  }
  