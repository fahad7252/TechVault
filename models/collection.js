const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const deviceSchema = new Schema({
  name: String,
  type: String,
  brand: String,
  startYear: Date,
  endYear: Date,
  images: [String],
  memories: [String],
});

const collectionSchema = new Schema({
  device: deviceSchema,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Changed from "user" to "User"
    required: true,
  },
  comments: [
    {
      text: String,
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Make sure this matches User model name
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Make sure this matches User model name
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Collection", collectionSchema);
