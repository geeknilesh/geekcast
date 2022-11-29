const roomModel = require("../models/roomModel");

const connectRoom = async (req, res) => {
  console.log(req.query.roomurl);
  const roomLink = req.query.roomurl;

  if (roomLink.includes("https")) {
    const temp = roomLink.split("/");
    const roomUrl = temp[temp.length - 1];

    //Check if Room exists
    const data = await roomModel.findOne({ roomUrl: roomUrl });
    if (data === null) {
      res.send("Room not found! Please Create one!");
    } else {
      res.redirect("/room/" + roomUrl);
    }
  } else {
    //Check if room exists
    const data = await roomModel.findOne({ roomUrl: roomLink });
    if (data === null) {
      return res.send("Room not found! Please Create one!");
    } else {
      return res.redirect("/room/" + roomLink);
    }
  }

  res.send("this is connect room controller");
};

module.exports = {
  connectRoom,
};
