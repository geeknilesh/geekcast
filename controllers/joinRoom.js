const randomstring = require("randomstring");

const joinRoom = (req, res) => {
  const random = randomstring.generate({
    length: 12,
    charset: "alphabetic",
  });
  res.redirect(`/room/${random}`);
  //   res.render("room", { roomId: "nilesh" });
};

const joinWithRoomId = (req, res) => {
  console.log(req.params.roomId);
  res.render("room", { roomId: req.params.roomId });
};

module.exports = {
  joinRoom,
  joinWithRoomId,
};
