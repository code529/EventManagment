const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
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
        return el === this.password;
      },
      message: "Passwords are not the same",
    },
  },
  role: {
    type: String,
    enum: ["Organizer", "Admin", "User"],
    default: "user",
  },
  photo: {
    type: String,
  },
});
UserSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  // Delete the password confirm field
  this.passwordConfirm = undefined;
  next();
});
UserSchema.methods.correctPassword = async function (candidatepass, userpass) {
  return await bcrypt.compare(candidatepass, userpass);
};
const User = mongoose.model("User", UserSchema);
module.exports = User;
