const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const argon2 = require("argon2");
const joiSchema = require("../models/joiSchema");

const signup = async (req, res) => {
  const userDetails = req.body.userData;
  console.log(req.body);
  const password = req.body.userData.password;

  const validation = joiSchema.validate(req.body.userData);
  console.log(validation);
  if (validation.error) {
    return res.json({ status: false, error: validation.error });
  }

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
    const userData = {
      firstName: userDetails.firstName,
      lastName: userDetails.lastName,
      email: userDetails.email,
      password: userDetails.password,
    };
    const response = await userModel.create(userData);
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

const getSignUp = (req, res) => {
  res.render("signup");
};

module.exports = {
  signup,
  getSignUp,
};
