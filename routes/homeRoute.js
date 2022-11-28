const express = require("express");

const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = express.Router();
const { checkLogin } = require("../middleware/isLogin");
const { homepageData } = require("../controllers/homepageData");
const { postEmailLogin, getEmailLogin } = require("../controllers/login");
const { signup } = require("../controllers/signup");
const { createRoom } = require("../controllers/createRoom");
const { uploadRoomImage } = require("../controllers/uploadRoomImage");
const { joinRoom, joinWithRoomId } = require("../controllers/joinRoom");

router.route("/").get(checkLogin, homepageData);

router.route("/room").get(joinRoom);
router.route("/room/:roomId").get(joinWithRoomId);

router.route("/login").get(getEmailLogin).post(postEmailLogin);

router.route("/signup").get(signup);

router.route("/createroom").post(checkLogin, createRoom);

router
  .route("/uploadRoomImage")
  .post(checkLogin, upload.single("picture"), uploadRoomImage);

module.exports = router;
