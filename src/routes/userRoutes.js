const express = require('express'); 
const userController = require('../controllers/userController');
const authControllers = require('../controllers/authController'); 

const userRouter = express.Router(); 

userRouter.post('/u/login' , authControllers.login); 
userRouter.post('/u/signup' , authControllers.signup); 
userRouter.get('/u/logout' , authControllers.logout);  

// user things : 
    /**
     * -Login/signin
     * -Delete Account 
     * -Forgot password 
     * -signup
     */





module.exports  = userRouter ; 