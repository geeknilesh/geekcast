const mongoose = require("mongoose");
const roomSchema = require("./roomSchema");

const roomModel = new mongoose.model("roomdata", roomSchema);

module.exports = roomModel;
