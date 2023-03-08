const jwt = require('jsonwebtoken'); 
const User = require('../models/userModel'); 
const bcrypt = require('bcryptjs'); 


// returns a JWT signed token which can be set to cookie;  
const signToken = id =>{
    return jwt.sign({id} , process.env.JWT_SECRET , {
        expiresIn : process.env.JWT_EXPIRES_IN
    })
}

// can be used in signin and signup both 
const createSendToken = (user, statusCode, req, res) => {
    const token = signToken(user._id); 
    res.cookie('jwt', token, {
      expires: new Date(
        Date.now() + (process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000)
      ),
      httpOnly: true,
      secure: req.secure || req.headers['x-forwarded-proto'] === 'https'
    });
  
    user.password = undefined;
 
    res.status(statusCode).json({
      status: 'success',
      token,
      data: {
        user
      }
    });
};

exports.isLoggedIn = async (req, res, next) => {
  if (req.cookies.jwt){ 
    try {
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );
      const currentUser = await User.findById(decoded.id);
      if (!currentUser) {
        return next();
      }

      if (currentUser.changedPasswordAfter(decoded.iat)) {
        return next();
      }
      res.locals.user = currentUser;
      return next();
    } catch (err) {
      return next();
    }
  }
  next();
};


exports.signup = catchAsync(async (req, res, next) => {
    var userRole = "user"; 
    if(req.locals.user=="organizer"){
        userRole = "organizer" 
    }
    const newUser = User.create({
    // should check wether email exist already or not; 
    username : req.body.username , 
    email : req.body.email , 
    password : req.body.password , 
    passwordConfirm : req.body.passwordConfirm , 
    role : userRole ,  
    // Handle this when use can upload file
    photo : "someString"
   } , 
    (err)=>{
        res.json(err); // Most probably it will return passwords are not the same
    }); 
   createSendToken(newUser , 201 , req , res); 
});
  

exports.logout = (req, res) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });
  res.status(200).json({ status: 'success' });
};




