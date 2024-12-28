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
    ref: "user",
    required: true,
  },
});

module.exports = mongoose.model("collection", collectionSchema);
