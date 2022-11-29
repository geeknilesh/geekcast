const jwt = require("jsonwebtoken");

checkLogin = async (req, res, next) => {
  // console.log(req.headers.cookie);

  if (req.headers.cookie === undefined) return res.render("login");

  const cookieArray = req.headers.cookie.split(" ");
  var userId;
  let token;
  if (cookieArray[0].includes("userId")) {
    userId = decodeURI(cookieArray[0].split("=")[1]);
    token = decodeURI(cookieArray[1].split("=")[1]);
  } else {
    userId = decodeURI(cookieArray[1].split("=")[1]);
    token = decodeURI(cookieArray[0].split("=")[1]);
    token = token.slice(0, token.length - 1);
  }
  console.log(token);

  if (!token) {
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
    // const jwt_token = req.headers.authorization.split(" ")[1];

    //jwt token verification
    var truth;
    try {
      truth = await jwt.verify(token, process.env.JWT_SECRET);
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
