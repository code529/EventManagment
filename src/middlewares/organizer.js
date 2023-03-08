exports.setUserLocals = (req , res , next)=>{
    req.local.userRole = "organizer" 
    next(); 
}