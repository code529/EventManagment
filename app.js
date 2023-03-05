const express = require("express");
const fs = require("fs");
const dotenv = require('dotenv');
dotenv.config('./.env'); 
const app = express();

const userRouter = require('./src/routes/userRoutes'); 
const eventRouter = require('./src/routes/userRoutes'); 


app.use(express.static('./src/assets'));
app.use(express.json()); 
app.use('/' , require('./src/routes')); 
app.use('/api/v1/users/', userRouter); 
app.use('/api/v1/events' , eventRouter); 


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
