const mongoose = require("mongoose");
const userSchema = require("./userSchema");

const model = new mongoose.model("userDetails", userSchema);

module.exports = model;
