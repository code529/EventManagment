const mongoose = require("mongoose");
const validator = require("validator");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please enter your username"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please enter your password"],
    validate: {
      // This only works on save and create!!
      validator: function (el) {
        return el === this.password; // abc === abc
      },
      message: "Passwords are not the same",
    },
  },
  role: {
    type: String,
    enum: ["organizer", "admin", "user"],
    required: [true, "Please enter your role "],
    default: "user",
  },
  photo: {
    type: String,
  },
});
const User = mongoose.model("User", userSchema);
module.exports = User;
