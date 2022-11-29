const userModel = require("../models/userModel");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const getEmailLogin = (req, res) => {
  res.render("login");
};

const postEmailLogin = async (req, res) => {
  console.log(req.body);

  if (req.body == "") {
    return res.render(login);
  }

  const email = req.body.userData.email;
  const password = req.body.userData.password;

  console.log(email, password);

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
        res.cookie("token", token);
        res.cookie("userId", email);
        console.log("cookie sent!");
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

module.exports = {
  postEmailLogin,
  getEmailLogin,
};
