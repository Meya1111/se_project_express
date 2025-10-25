const mongoose = require("mongoose");
const validator = require("validator");

const itemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, minlength: 2, maxlength: 30 },
    imageUrl: {
      type: String,
      required: [true, "The imageUrl field is required."],
      validate: {
        validator(v) { return validator.isURL(v); },
        message: "You must enter a valid URL",
      },
    },
    weather: { type: String, required: true, enum: ["hot", "warm", "cold"] },
  },
  { versionKey: false }
);

module.exports = mongoose.model("item", itemSchema);