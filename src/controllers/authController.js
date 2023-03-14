const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const { promisify } = require("util");
const sendEmail = require("./../utils/email");
const crypto = require("crypto");

// returns a JWT signed token which can be set to cookie;
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// can be used in signin and signup both
const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user._id);
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

exports.isLoggedIn = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
   
  const currUser = await User.findById(decoded.id);
  res.locals.user = currUser ; 
  next();
};

exports.signup = async (req, res, next) => {
  try {
    const newUser = User.create({
      // should check wether email exist already or not;
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
      role: res.locals.role,
      // Handle this when use can upload file
      photo: "someString",
    });
    createSendToken(newUser, 201, req, res);
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    }); // Most probably it will return passwords are not the same
  }
};
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({
        status: "fail",
        message: "Bad request",
      });
    }
    const user = await User.findOne({ email: email }).select("+password");
    if (!user || !(await user.correctPassword(password, user.password))) {
      res.status(401).json({
        status: "fail",
        message: "Unauth , incorrect email or password",
      });
    }
    // 3) if everything ok, send token to client
    createSendToken(user, 201, req, res);
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
exports.forgotPassword = async (res, req, next) => {
  // 1 Get user based on posted email
  const user = await User.findOne({ email: req.body.email });
  // 2 Generate the random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  // 3 send it to users email
  const resetURL = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/users/resetPassword/${resetToken}}`;
  const message = "Forgot your password ? Sumbit a patch req to the reseturl ";
  try {
    await sendEmail({
      email: user.email,
      subject: "Your Password reset token",
      message,
    });
    res.status(200).json({
      status: "Success",
      message: "Token sent to email",
    });
    next();
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validatorBeforeSave: false });
    res.status(401).json({
      status: "fail",
      message: "You are not logged in ",
    });
    next();
  }
};
exports.resetPassword = async (res, req, next) => {
  // 1 Get user based on the token
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  //2 If token has not expired and there is a user , set the new password
  if (!user) {
    res.status(401).json({
      status: "fail",
      message: "You are not logged in ",
    });
    next();
  }
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();
  // 3 Update changePassword at property for user

  // 4 Log the user in , SEND JWT
  createSendToken(user, 200, res);
};
exports.updatePassword = async (req, res, next) => {
  // 1) Get user from collection
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded.id).select("+password");
  // 2) check if posted password is correct
  if (!user.correctPassword(req.body.passwordCurrent, user.password)) {
    res.status(401).json({
      status: "fail",
      message: "You are not logged in ",
    });
    next();
  }

  // 3) if so, update the password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();
  // 4) log the user in ,Send JWT
  createSendToken(user, 201, res);
};

exports.logout = (req, res) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: "success" });
};
