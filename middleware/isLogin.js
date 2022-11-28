const jwt = require("jsonwebtoken");

checkLogin = async (req, res, next) => {
  const auth = req.headers.authorization;

  if (!auth) {
    return res.json({
      status: 401,
      message: {
        d1: "Token is required",
        d2: "Please Login or Sign Up",
        d3: "https://localhost:3000/login",
        d4: "https://localhost:3000/signup",
      },
    });
  } else {
    const jwt_token = req.headers.authorization.split(" ")[1];

    //jwt token verification
    var truth;
    try {
      truth = await jwt.verify(jwt_token, process.env.JWT_SECRET);
    } catch (err) {
      return res.json(err);
    }
    console.log(truth);
    next();
  }

  console.log("isLogin middleware passed");
};

module.exports = {
  checkLogin,
};
