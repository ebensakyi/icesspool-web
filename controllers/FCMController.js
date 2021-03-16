const { User } = require("../db/models/");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const Helper = require("../utils/Helper");

exports.updateFCM = async (req, res) => {
  try {
    console.log(req.body);
    await User.update(
      { fcm: req.body.fcm },
      { where: { id: req.body.userId } }
    );

   
    return res.status(200).send({ statusCode: 1, message: "Found", data: [] });
  } catch (error) {
    return res
      .status(400)
      .send({ statusCode: 0, message: "A server error occurred" });
  }
};
