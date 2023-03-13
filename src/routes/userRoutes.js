const express = require("express");
const userController = require("../controllers/userController");
const authControllers = require("../controllers/authController");
const Organizerlocals = function(req , res , next){
    req.locals.role = "Organizer" ; 
    next(); 
}
const UserLocals = function(req , res, next){
    req.locals.role = "User" ; 
    next(); 
}
const AdminLocals = function(req , res , next){
    req.locals.role = "Admin"
    next() ; 
}
const userRouter = express.Router();

userRouter.post("user/login", UserLocals ,  authControllers.login);
userRouter.post("user/signup",UserLocals , authControllers.signup);
userRouter.get("user/logout");
userRouter.post("/organizers/login", Organizerlocals ,  authControllers.login);
userRouter.post("/organizers/signup", Organizerlocals ,  authControllers.signup);
userRouter.post("admin/login", AdminLocals ,  authControllers.login);
userRouter.post("admin/signup", AdminLocals ,  authControllers.signup);
userRouter.get("admin/logout");
// user things :
/**
 * -Login/signin
 * -Delete Account
 * -Forgot password
 * -signup
 */

module.exports = userRouter;
