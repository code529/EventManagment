const User = require("../models/userModel");
const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) {
      newObj[el] = obj[el];
    }
  });
  return newObj;
};
exports.getUser = async (req, res) => {
  try {
    let query = await User.findById(req.params.id);
    res.status(201).json({
      status: "success",
      data: {
        doc: query,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "Fail",
      message: err,
    });
  }
};
exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
};
exports.updateMe = async (req, res, next) => {
  // 1) Create error if user posts password data
  if (req.body.password || req.body.passwordConfirm) {
    res.status(400).json({
      status: "error",
      message: "this route is not for password updates",
    });
    next();
  }
  // 2) filtering field names and Updating the user document
  const filteredBody = filterObj(req.body, "name", "email");
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
};
exports.deleteMe = async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });
  res.status(200).json({
    status: "success",
  });
};
