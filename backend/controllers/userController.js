const asyncHandler = require("express-async-handler");
const User = require("../models/UserModel");

// Register User
const registerUser = asyncHandler(async (req, res) => {
  try {
    const {
      email,
      password,
      username,
      stakeholderName,
      stakeholderPhone,
      stakeholderPosition,
      gender,
      phone,
      disasterType,
      location,
      report,
    } = req.body;

    // Check for required fields
    if (
      !email ||
      !password ||
      !username ||
      !stakeholderName ||
      !stakeholderPhone ||
      !stakeholderPosition ||
      !gender ||
      !phone ||
      !disasterType ||
      !location ||
      !report
    ) {
      res.status(400);
      throw new Error("Please fill in all the required fields.");
    }

    // Check if user already exists
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Create new user
    const user = await User.create({
      email,
      password,
      username,
      stakeholderName,
      stakeholderPhone,
      stakeholderPosition,
      gender,
      phone,
      disasterType,
      location,
      report,
    });

    res.status(201).json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Get All Users
const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find().sort("-createdAt");
    res.status(200).json(users);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Internal server error" });
  }
});

// Get User by ID
const getUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).json({ msg: "User not found" });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Internal server error" });
  }
});

// Update User Profile
const updateUserProfile = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Update fields
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.password = req.body.password || user.password; // No need to hash password when updating it
    user.gender = req.body.gender || user.gender;
    user.phone = req.body.phone || user.phone;
    user.location = req.body.location || user.location;
    user.disasterType = req.body.disasterType || user.disasterType;
    user.report = req.body.report || user.report;
    user.stakeholderName = req.body.stakeholderName || user.stakeholderName;
    user.stakeholderPhone = req.body.stakeholderPhone || user.stakeholderPhone;
    user.stakeholderPosition = req.body.stakeholderPosition || user.stakeholderPosition;

    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Internal server error" });
  }
});

// Delete User
const deleteUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    await user.remove();
    res.status(200).json({ msg: "User deleted successfully!" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Internal server error" });
  }
});

module.exports = {
  registerUser,
  getAllUsers,
  getUser,
  updateUserProfile,
  deleteUser,
};
