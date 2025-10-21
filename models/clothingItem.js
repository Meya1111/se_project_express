const mongoose = require("mongoose");

const clothingItemSchema = new mongoose({});

module.exports = mongoose.model("item", clothingItemSchema);