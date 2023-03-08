const express = require('express'); 
const authControllers = require('../controllers/authController'); 
const organizerMiddleware = require('../middlewares/organizer'); 

const organizerRouter = express.Router(); 



organizerRouter.post('/organizer/login' , organizerMiddleware.setUserLocals,  authControllers.login); 
organizerRouter.post('/organizer/signup' , organizerMiddleware.setUserLocals, authControllers.signup); 
organzierRouter.get('/organizer/logout' , organizerMiddleware.setUserLocals, authControllers.logout);  


// user things : 
    /**
     * -Login/signin
     * -Delete Account 
     * -Forgot password 
     * -signup
     */





module.exports  = userRouter ; 