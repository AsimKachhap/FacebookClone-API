const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Enter Username"],
      min: 3,
      max: 20,
      unique: true,
    },

    email: {
      type: String,
      required: [true, "Enter Email"],
      max: 50,
      unique: true,
    },

    password: {
      type: String,
      required: [true, "Enter Password"],
      min: 6,
    },

    profilePicture: {
      type: String,
      default: "",
    },

    coverPicture: {
      type: String,
      default: "",
    },

    followers: {
      type: Array,
      default: [],
    },

    followings: {
      type: Array,
      default: [],
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
