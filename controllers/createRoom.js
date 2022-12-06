const roomModel = require("../models/roomModel");
const randomstring = require("randomstring");
const { uploadImage } = require("./uploadImage");

const createRoom = async (req, res) => {
  const roomName = req.body.roomName;
  const roomHeading = req.body.roomHeading;
  const roomBio = req.body.roomBio;
  const roomAdmin = req.body.roomAdmin;
  // const roomId = 22;
  const roomUrl = randomstring.generate({
    length: 12,
    charset: "alphabetic",
  });

  const result = await uploadImage(req.file);
  console.log(result);
  const roomImage = result.url;

  try {
    const lastRoom = await roomModel
      .findOne({})
      .sort({ field: "asc", _id: -1 })
      .limit(1); //({ sort: { created_at: 1 } });
    // console.log("Last Room Created: " + lastRoom);
    // console.log(lastRoom);

    let roomId;
    if (lastRoom != null) {
      roomId = lastRoom.roomId + 1 || 1;
    } else roomId = 1;

    const createdAt = new Date().toISOString();

    const roomDetails = {
      roomId,
      roomUrl,
      roomName,
      roomAdmin,
      roomHeading,
      roomImage,
      roomBio,
      createdAt,
      lastActive: createdAt,
    };
    const response = await roomModel.create(roomDetails);
    console.log("Room Created!! " + response);
    return res.json({ status: true, url: response.roomUrl });
  } catch (err) {
    console.log("Error creating room! " + err.message);
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }

  // res.send("createRoom endpoint reached!!");
};

module.exports = {
  createRoom,
};
