const roomModel = require("../models/roomModel");

const homepageData = async (req, res) => {
  const { page = 1, limit = 6 } = req.query;

  //simple Pagination attempt
  try {
    const rooms = await roomModel
      .find()
      .limit(limit)
      .skip((page - 1) * limit)
      .exec();

    const count = await roomModel.countDocuments();

    const data = {
      rooms,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    };
    return res.render("homepage", data);
  } catch (err) {
    return res.json(err);
  }

  // const data = await roomModel.find({});
  // console.log(data);
  // res.render("homepage", data);
};

const roomData = async (req, res) => {
  const { page = 1, limit = 6 } = req.query;

  //simple Pagination attempt
  try {
    const rooms = await roomModel
      .find()
      .limit(limit)
      .skip((page - 1) * limit)
      .exec();

    const count = await roomModel.countDocuments();

    const data = {
      rooms,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    };
    return res.json(data);
  } catch (err) {
    return res.json(err);
  }
};

module.exports = {
  homepageData,
  roomData,
};
