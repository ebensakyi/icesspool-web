const { TipoffPoint } = require("../db/models");
const Helper = require("../utils/Helper");

exports.getTipOffpointsPage = async (req, res) => {
  await Helper.isLogin(req, res);
  res.render("tipoffpoints", { user: req.session.user });
};

exports.getTipOffPoints = async (req, res) => {
  try {
    const points = await TipoffPoint.findAll({
      where: { deleted: 0 },
    });
    if (!points)
      return res
        .status(200)
        .send({ statusCode: 2, message: "No active tipoff point found" });
    return res
      .status(200)
      .send({ statusCode: 1, message: "Tipoff points found", data: points });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ statusCode: 0, message: error });
  }
};

exports.updateTipOffPoint = async (req, res) => {
  try {
    await TipoffPoint.update({ active: 0 }, { where: { active: 1 } });
    return res
      .status(200)
      .send({ statusCode: 2, message: "Tipoff point updated" });
  } catch (error) {
    return res.status(400).send({ statusCode: 0, message: error });
  }
};

exports.saveTipOffPoint = async (req, res) => {
  try {
    const points = await TipoffPoint.create({
      siteName: req.body.siteName,
      placeId: req.body.placeId,
      address: req.body.address,
      location: req.body.location,
      gps: req.body.gps,
      lat: req.body.lat,
      lng: req.body.lng,
    });
    if (!points)
      return res
        .status(200)
        .send({ statusCode: 2, message: "No  tipoff point added" });
    return res
      .status(200)
      .send({ statusCode: 1, message: "Tipoff point added", data: points });
  } catch (error) {
    return res.status(400).send({ statusCode: 0, message: error });
  }
};

exports.deleteTipOffPoint = async (req, res) => {
  try {
    await TipoffPoint.update(
      { active: 0, deleted: 1 },
      { where: { id: req.body.id } }
    );
    const points = await TipoffPoint.findAll({
      where: { active: 1, deleted: 0 },
    });

    return res
      .status(200)
      .send({ statusCode: 1, message: "Tipoff point added", data: points });
  } catch (error) {
    return res.status(400).send({ statusCode: 0, message: error });
  }
};
