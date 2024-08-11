const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const errorHandler = require('../utils/error');
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

// Function to generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

const signup = asyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });

  try {
    await newUser.save();
    res.status(201).json("User created successfully");
  } catch (error) {
    next(errorHandler(550, "Already Registered"));
  }
});

const signin = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(401, "User not found"));

    const isValidPassword = await bcrypt.compare(password, validUser.password);
    if (!isValidPassword) return next(errorHandler(401, "Wrong credentials"));

    // const token = generateToken(validUser._id);

    // res.status(200).json({
    //   user: {
    //     id: validUser._id,
    //     username: validUser.username,
    //     email: validUser.email,
    //   },
    //   token,
    // });
  } catch (error) {
    next(error);
  }
});

const signOut = asyncHandler(async (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json("User has been logged out!");
  } catch (error) {
    next(error);
  }
});

module.exports = { signup, signin, signOut };





// const User = require("../models/UserModel");
// const bcrypt = require("bcrypt");
// const errorHanler = require('../utils/error')
// const jwt = require("jsonwebtoken");
// const generateToken = require("../utils/index")


// const asyncHandler = require("express-async-handler");
// const { response } = require("express");

// const signup = asyncHandler(async (req, res, next) => {
//   const { username, email, password } = req.body;
//   const hashedPassword = await bcrypt.hash(password, 10);
//   const newUser = new User({ username, email, password: hashedPassword });
//   try {
//     await newUser.save();
//     res.status(201).json("User created successfully");
//   } catch (error) {
//     next(errorHandler(550, "Already Register"));
//   }
// });
// const signin = asyncHandler(async (req, res, next) => {
//   const {email, password} = req.body;
//   try{
//         const validUser = await User.findOne({email})
//         if(!validUser)  return next(errorHanler(401, 'User not find'))
//         const ValidPassword = await bcrypt.compare(password, validUser.password)
//         if(!ValidPassword) return next(errorHanler(401, "Wrong Credential"))
         
        // const token = jwt.sign({
        //       id:validUser._id },process.env.JWT_TOKEN
        // );

        // const {password: pwd, ...rest} = validUser._doc
        // res.cookie('access_token', token,{httpOnly:true})
        // .status(200)
        // .json(rest)
//   } catch(error){
//   next(error)
//   }

// });
// const signin = asyncHandler(async (req, res, next) => {
//   const { email, password } = req.body;
//   try {
//     const validUser = await User.findOne({ email });
//     if (!validUser) return next(errorHanler(401, "User not find"));
//     const ValidPassword = await bcrypt.compare(password, validUser.password);
//     if (!ValidPassword) return next(errorHanler(401, "Wrong Credential"));

//     // const token = jwt.sign(
//     //   {
//     //     id: validUser._id,
//     //   },
//     //   process.env.JWT_SECRET
//     // );

//     const token = generateToken(validUser._id)
   
//     res.cookie("token", token, {
//       path: "/",
//       httpOnly: true,
//       expires: new Date(Date.now() + 1000 * 86400),
//       sameSite: "none",
//       secure: true,
//     })
//     // const { password: pwd, ...rest } = validUser._doc;
//   } catch (error) {
//     next(error);
//   }
// });

//  const google = asyncHandler( async (req, res, next) => {
//    try {
//      const user = await User.findOne({ email: req.body.email });
//      if (user) {
//        const token = jwt.sign({ id: user._id }, process.env.JWT_TOKEN);
//        const { password: pass, ...rest } = user._doc;
//        res
//          .cookie("access_token", token, { httpOnly: true })
//          .status(200)
//          .json(rest);
//      } else {
//        const generatedPassword =
//          Math.random().toString(36).slice(-8) +
//          Math.random().toString(36).slice(-8);
//        const hashedPassword =  await bcrypt.hash(generatedPassword, 10);
//        const newUser = new User({
//          username:
//            req.body.name.split(" ").join("").toLowerCase() +
//            Math.random().toString(36).slice(-4),
//          email: req.body.email,
//          password: hashedPassword,
//          avatar: req.body.photo,
//        });
//        await newUser.save();
//        const token = jwt.sign({ id: newUser._id }, process.env.JWT_TOKEN);
//        const { password: pass, ...rest } = newUser._doc;
//        res
//          .cookie("access_token", token, { httpOnly: true })
//          .status(200)
//          .json(rest);
//      }
//    } catch (error) {
//      next(error);
//    }
//  });
// const signOut = async (req, res, next) => {
//   try {
//     res.clearCookie("access_token");
//     res.status(200).json("User has been logged out!");
//   } catch (error) {
//     next(error);
//   }
// };
// module.exports = { signup, signin, signOut };
