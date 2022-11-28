const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const argon2 = require("argon2");

const signup = async (req, res) => {
  const userDetails = req.body.userData;
  const password = req.body.userData.password;

  try {
    const hash = await argon2.hash(password);
    userDetails.password = hash;
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }

  try {
    const response = await userModel.create(userDetails);
    console.log("User Created!! " + response);
    res.status(201).json({ status: true, message: "User Created" });
  } catch (err) {
    console.log("Error creating user" + err.message);
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  signup,
};
