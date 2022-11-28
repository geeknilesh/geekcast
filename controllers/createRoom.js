const roomModel = require("../models/roomModel");

const createRoom = (req, res) => {
  console.log("createRoom body: ");
  console.log(req.body);
  res.send("createRoom endpoint reached!!");
};

module.exports = {
  createRoom,
};
