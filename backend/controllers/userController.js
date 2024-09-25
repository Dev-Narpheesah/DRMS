const asyncHandler = require("express-async-handler");
const User = require("../models/UserModel");
const { generateUniqueId } = require("../utils/generateUniqueId");

// const ensureUniqueId = async () => {
//   let uniqueId;
//   let idExists = true;

//   while (idExists) {
//     uniqueId = generateUniqueId();
//     const existingUser = await User.findById(uniqueId);
//     // idExists = !existingStudent ? true : false;
//     idExists = !!existingUser;
//   }

//   return uniqueId;
// };

const date = new Date();
const formatDate = (input) => {
  return input > 9 ? input : `0${input}`;
}

const formatHour = (input) => {
  return input > 12 ? input - 12 : input;
}

const format = {
  dd: formatDate(date.getDate()),
  mm: formatDate(date.getMonth() + 1),
  yyyy: formatDate(date.getFullYear()),

  HH: formatDate(date.getHours()),
  hh: formatDate(formatHour(date.getHours())),
  MM: formatDate(date.getMinutes()),
  SS: formatDate(date.getSeconds())
}

const format24Hour = ({dd, mm, yyyy, HH, MM, SS}) => {
  return `${mm}/${dd}/${yyyy} ${HH}:${MM}:${SS}`
}

const registerUser = asyncHandler(async (req, res) => {
  try {
    const {
      email,
      username,
      s_name,
      s_phone,
      s_position,
      gender,
      phone,
      disasterType,
      image,
      location,
      report,
    } = req.body;

    if (
      !email ||
      !username ||
      !s_name ||
      !s_phone ||
      !s_position ||
      !gender ||
      !phone ||
      !disasterType ||
      !image ||
      !location ||
      !report
    ) {
      res.status(400);
      throw new Error("Please fill in all the required fields.");
    }

    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({ msg: "User already existss" });
    }



    const user = await User.create({
     
      email,
      username,
      stakeholder: {
        stakeholderName: s_name,
        stakeholderPhone: s_phone,
        stakeholderPosition: s_position,
      },
      gender,
      phone,
      disasterType,
      image,
      location,
      report,

    });

    res.status(201).json(user);
  } catch (err) {
    console.error(err.me);
    res.status(500).send("Server Error");
  }
});

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().sort("-createdAt");

  if (!users) {
    res.status(500);
    throw new Error("Something went wrong!");
  }
  res.status(200).json(users);
});

const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params._id);

  if (user) {
    res.status(404).json(user);
  } else {
    res.status(404);
    throw new Error("Student not found");
  }
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params._id);

  if (!user) {
    res.status(404).json({ error: "user not found" });
  }
  if (user) {
    const {
      email,
      username,
      stakeholder,
      gender,
      phone,
      disasterType,
      image,
      location,
      report,
    } = user;

    user.username = req.body.username || username;
    user.email = email;
    user.gender = gender;
    user.phone = phone;
    user.location = location;
    user.disasterType = disasterType;
    user.image = image;
    user.report = report;
    user.stakeholder.stakeholderName =
      req.body.s_name || stakeholder.stakeholderName;
    user.stakeholder.stakeholderPhone =
      req.body.s_phone || stakeholder.stakeholderPhone;
    user.stakeholder.stakeholderPosition =
      req.body.s_position || stakeholder.stakeholderPosition;

    const updatedUser = await user.save();

    res.json(updatedUser);
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  const userId = req.params._id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      res.status(404);
      throw new Error("user not found");
    }

    await user.deleteOne();

    res.status(200).json({
      me: "user deleted successfully!",
    });
  } catch (error) {
    console.error(error.me);
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
