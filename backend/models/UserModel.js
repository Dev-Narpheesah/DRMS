const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      unique: true,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    gender: {
      type: String,
      require: true,
      enum: ["Female", "Male", "Others"],
    },
    nationality: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user"],
      default: "user"
  },
    image: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);

// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema({
//     fullname: {
//         type: String,
//         required: true,
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true,
//     },
//     password: {
//         type: String,
//         required: true,
//         // match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
//     }
// })

// const User = mongoose.model("User", userSchema);
// module.exports = User;
// const bcrypt = require("bcryptjs");

// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema(
//   {
//    fullname: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },

//   },
//   {
//     timestamps: true,
//   }
// );

// const User = mongoose.model("User", userSchema);
// module.exports = User;
