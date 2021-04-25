const { Discount } = require("../db/models");

const Helper = require("../utils/Helper");

exports.getDiscountPage = async (req, res) => {
  await Helper.isLogin(req, res);

  const discounts = await Discount.findOne({});
  res.render("discount", { data: discounts });
};

exports.updateDiscount = async (req, res) => {
  try {
    await Discount.update(
      {
        trip1: req.body.trip1Discount,
        trip2: req.body.trip2Discount,
        trip3: req.body.trip3Discount,
        trip4: req.body.trip4Discount,
        trip5: req.body.trip5Discount,
        beyond5: req.body.beyond5Discount,
      },
      { where: { deleted: 0 } }
    );

    res.redirect("/discount");
  } catch (error) {
    console.log(error);
  }
};
