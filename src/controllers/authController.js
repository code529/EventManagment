const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const { promisify } = require("util");

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

exports.logout = (req, res) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: "success" });
};
