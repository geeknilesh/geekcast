const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  roomId: { type: Number, required: true, unique: true },
  roomUrl: { type: String, required: true, unique: true },
  roomName: { type: String, required: true },
  roomAdmin: { type: String, required: true },
  roomHeading: { type: String, required: true },
  roomImage: { type: String },
  roomBio: { type: String },
});

module.exports = roomSchema;
