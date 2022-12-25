const roomModel = require("../models/roomModel");
//Need to fix: 2 database calls if room found. One is for checking and another for sending to client.

const connectRoom = async (req, res) => {
  const cookieArray = req.headers.cookie.split(" ");

  var userId;

  if (cookieArray[0].includes("userId")) {
    userId = decodeURI(cookieArray[0].split("=")[1]);
    userId = userId.slice(0, userId.length - 1);
  } else {
    userId = decodeURI(cookieArray[1].split("=")[1]);
  }

  console.log(req);
  const roomLink = req.query.roomurl;

  if (roomLink.includes("https")) {
    const temp = roomLink.split("/");
    const roomUrl = temp[temp.length - 1];

    //Check if Room exists
    const data = await roomModel.findOne({ roomUrl: roomUrl });
    if (data === null) {
      return res.send("Room not found! Please Create one!");
    } else {
      //   return res.render("cast", { roomId: roomUrl, userId });
      roomModel.connect;
      res.redirect("/cast/" + roomUrl);
    }
  } else {
    //Check if room exists
    const data = await roomModel.findOne({ roomUrl: roomLink });
    console.log(data);
    if (data === null) {
      return res.send("Room not found! Please Create one!");
    } else {
      //   return res.render("cast", { roomId: roomLink, userId });
      return res.redirect("/cast/" + roomLink);
    }
  }
};

const connectRoomWithUrl = async (req, res) => {
  const cookieArray = req.headers.cookie.split(" ");

  var userId;

  if (cookieArray[0].includes("userId")) {
    userId = decodeURI(cookieArray[0].split("=")[1]);
    userId = userId.slice(0, userId.length - 1);
  } else {
    userId = decodeURI(cookieArray[1].split("=")[1]);
  }
  const roomId = req.params.roomId;
  const room = await roomModel.findOne({ roomUrl: roomId });
  const roomData = JSON.stringify(room);
  console.log(roomData);

  res.render("cast", { roomId, userId, roomData });
};

module.exports = {
  connectRoom,
  connectRoomWithUrl,
};
