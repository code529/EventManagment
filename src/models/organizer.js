const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const Event = require("./eventModel");

const OrganizerSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please enter your OrganizerName"],
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
  events: [
    {
     type: mongoose.Schema.Types.ObjectId,
     ref: 'Event'
    }
   ],

  passwordResetToken: String,
  passwordResetExpires: Date
});

OrganizerSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

OrganizerSchema.methods.correctPassword = async function (candidatepass) {
  return await bcrypt.compare(candidatepass, this.password);
};

OrganizerSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

const Organizer = mongoose.model("Organizer", OrganizerSchema);
module.exports = Organizer;
