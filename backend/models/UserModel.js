const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: { type: String, required: false }
});

module.exports = mongoose.model('User', UserSchema);



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