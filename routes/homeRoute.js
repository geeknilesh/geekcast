const express = require("express");

const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = express.Router();
const { checkLogin } = require("../middleware/isLogin");
const { homepageData, roomData } = require("../controllers/homepageData");
const { postEmailLogin, getEmailLogin } = require("../controllers/login");
const { signup, getSignUp } = require("../controllers/signup");
const { createRoom } = require("../controllers/createRoom");
const { uploadRoomImage } = require("../controllers/uploadRoomImage");
const { joinRoom, joinWithRoomId } = require("../controllers/joinRoom");
const {
  connectRoom,
  connectRoomWithUrl,
} = require("../controllers/connectRoom");
const { getRooms } = require("../controllers/getRooms");

router.route("/").get(checkLogin, homepageData).post(checkLogin, roomData);

router.route("/login").get(getEmailLogin).post(postEmailLogin);

router.route("/signup").get(getSignUp).post(signup);

router.route("/room").get(joinRoom);
router.route("/room/:roomId").get(joinWithRoomId);

router.route("/cast").get(checkLogin, connectRoom);
router.route("/cast/:roomId").get(checkLogin, connectRoomWithUrl);

router.route("/createroom").post(upload.single("img"), createRoom);

router.route("/listrooms").post(getRooms);

router
  .route("/uploadRoomImage")
  .post(checkLogin, upload.single("img"), uploadRoomImage);

module.exports = router;
