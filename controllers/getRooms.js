const roomModel = require("../models/roomModel");
const getRooms = async (req, res) => {
  try {
    const roomData = await roomModel.find();
    // console.log(roomData);
    res.json({
      status: true,
      rooms: roomData,
    });
  } catch (err) {}
};

module.exports = { getRooms };
