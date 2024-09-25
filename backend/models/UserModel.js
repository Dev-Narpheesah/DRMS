const mongoose = require("mongoose");

const stakeholderSchema = new mongoose.Schema({
  stakeholderName: {
    type: String,
    require: true,
  },
  stakeholderPhone: {
    type: String,
    require: true,
  },
  stakeholderPosition: {
    type: String,
    require: true,
    enum: ["leader", "volunteer", "donor", "coordinator", "other"],
  },
});

const UserSchema = new mongoose.Schema(
  {
  
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
    phone: {
      type: String,
      required: true,
    },
    disasterType: {
      type: String,
      required: true,
      enum: ["flood", "earthquake", "fire", "hurricane", "tornado", "other"],
    },
    image: { type: String, required: false },
    stakeholder: stakeholderSchema,
    location: {
      type: String,
      required: true,
    },
    report: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);
