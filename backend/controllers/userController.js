// const User = require('../models/UserModel')
// // const Note = require('../models/Note')
// const expressAsyncHandler = require('express-async-handler')
// const bcrypt = require('bcrypt')

// // @desc Get all users
// // @route GET /users
// // @access Private
// const getAllUsers = expressAsyncHandler(async (req, res) => {
//     // Get all users from MongoDB
//     const users = await User.find().select('-password').lean()

//     // If no users
//     if (!users?.length) {
//         return res.status(400).json({ message: 'No users found' })
//     }

//     res.json(users)
// })

// // @desc Create new user
// // @route POST /users
// // @access Private
// const createUsers = expressAsyncHandler(async (req, res) => {
//     const { username, password, email } = req.body

//     // Confirm data
//     if (!username || !password || !email) {
//         return res.status(400).json({ message: 'All fields are required' })
//     }

//     // Check for duplicate username
//     const duplicate = await User.findOne({ username }).lean().exec()

//     if (duplicate) {
//         return res.status(409).json({ message: 'Duplicate username' })
//     }

//     // Hash password
//     const hashedPwd = await bcrypt.hash(password, 10) // salt rounds

//     const userObject = { username,  email, "password": hashedPwd, }

//     // Create and store new user
//     const user = await User.create(userObject)

//     if (user) { //created
//         res.status(201).json({ message: `New user ${username} created` })
//     } else {
//         res.status(400).json({ message: 'Invalid user data received' })
//     }
// })

// // @desc Update a user
// // @route PATCH /users
// // @access Private
// const updateUser = expressAsyncHandler(async (req, res) => {
//     const { id, username, email,  password } = req.body

//     // Confirm data
//     if (!id || !username || !email ) {
//         return res.status(400).json({ message: 'All fields except password are required' })
//     }

//     // Does the user exist to update?
//     const user = await User.findById(id).exec()

//     if (!user) {
//         return res.status(400).json({ message: 'User not found' })
//     }

//     // Check for duplicate
//     const duplicate = await User.findOne({ username }).lean().exec()

//     // Allow updates to the original user
//     if (duplicate && duplicate?._id.toString() !== id) {
//         return res.status(409).json({ message: 'Duplicate username' })
//     }

//     user.username = username
//     user.email = email
//     // user.active = active

//     if (password) {
//         // Hash password
//         user.password = await bcrypt.hash(password, 10) // salt rounds
//     }

//     const updatedUser = await user.save()

//     res.json({ message: `${updatedUser.username} updated` })
// })

// // @desc Delete a user
// // @route DELETE /users
// // @access Private
// const deleteUser = expressAsyncHandler(async (req, res) => {
//     const { id } = req.body

//     // Confirm data
//     if (!id) {
//         return res.status(400).json({ message: 'User ID Required' })
//     }

//     // Does the user exist to delete?
//     const user = await User.findById(id).exec()

//     if (!user) {
//         return res.status(400).json({ message: 'User not found' })
//     }

//     const result = await user.deleteOne()

//     const reply = `Username ${result.username} with ID ${result._id} deleted`

//     res.json(reply)
// })

// module.exports = {
//     getAllUsers,
//     createUsers,
//     updateUser,
//     deleteUser
// }

const asyncHandler = require("express-async-handler");
const User = require("../models/UserModel");

const date = new Date();
const formatDate = (input) => {
  return input > 9 ? input : `0${input}`;
};

const formatHour = (input) => {
  return input > 12 ? input - 12 : input;
};

const format = {
  dd: formatDate(date.getDate()),
  mm: formatDate(date.getMonth() + 1),
  yyyy: formatDate(date.getFullYear()),

  HH: formatDate(date.getHours()),
  hh: formatDate(formatHour(date.getHours())),
  MM: formatDate(date.getMinutes()),
  SS: formatDate(date.getSeconds()),
};

const format24Hour = ({ dd, mm, yyyy, HH, MM, SS }) => {
  return `${mm}/${dd}/${yyyy} ${HH}:${MM}:${SS}`;
};

const registerUser = asyncHandler(async (req, res) => {
  try {
    const { email, username,  nationality, gender, password, image } = req.body;

    if (!email || !username  || !nationality || !gender || !password || !image) {
      res.status(400);
      throw new Error("Please fill in all the required fields.");
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ msg: "User already existss" });
    }
  } catch (err) {
    console.error(err.message);
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
      throw new Error("User not found");
    }
  });

  const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params._id);
  
    if (!user) {
      res.status(404).json({ error: "user not found" });
    }
    if (user) {
      const { email, username,  nationality,  gender, password, image } = user;
  
      user.email = email;
      user.username = req.body.username || username;
      user.nationality = req.body.nationality || nationality;
      user.gender = gender;
      user.password = req.body.password || password;
      user.image = req.body.image || image;

      const updatedUser = await user.save();
  
      res.json(updatedUser);
    }
  });
  
  const deleteUser= asyncHandler(async (req, res) => {
    const userId = req.params._id
  
    try {
      const user = await User.findById(userId);
      if (!user) {
        res.status(404);
        throw new Error("user not found");
      }
  
  
      await user.deleteOne();
  
      res.status(200).json({
        message: "user deleted successfully!",
    });
    
    } catch (error) {
      console.error(error.message)
      res.status(500).json({msg: "Internal server error"})
    }
   
  });

  module.exports = {
    registerUser,
    getAllUsers,
    getUser,
    updateUserProfile,
    deleteUser,
  };