const userModel = require("../models/userModel");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const postEmailLogin = async (req, res) => {
  const email = req.body.userData.email;
  const password = req.body.userData.password;

  try {
    const findUser = await userModel.findOne({ email: email });
    if (findUser) {
      const match = await argon2.verify(findUser.password, password);
      if (match) {
        const token = jwt.sign(
          {
            id: findUser._id,
            email: findUser.email,
          },
          process.env.JWT_SECRET
        );
        return res.status(200).json({
          status: true,
          token: token,
        });
      } else {
        //password mismatch
        return res
          .status(401)
          .json({ status: false, message: "Incorrect Email/Password" });
      }
    } else {
      //User does not exist
      return res
        .status(401)
        .json({ status: false, message: "Incorrect Email/Password" });
    }
  } catch (err) {
    console.log("Internal Server Error");
    return res.status(500).json({ status: false, message: err });
  }
};

const getEmailLogin = (req, res) => {
  res.json({
    data: "UI login portal",
  });
};

module.exports = {
  postEmailLogin,
  getEmailLogin,
};
