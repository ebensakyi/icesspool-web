const { IcesspoolCommission } = require("../db/models");
const Helper = require("../utils/Helper");

exports.getCommission = async (req, res) => {
  await Helper.isLogin(req, res);

  let commission = await IcesspoolCommission.findOne({
    where: { deleted: 0, status: 1 },
  });

  commission = commission.commission * 100;

  res.render("commission", { commission: commission, user: req.session.user });
};

exports.setCommission = async (req, res) => {
  try {
    const c = req.body.commission;
    const isExist = await IcesspoolCommission.count({
      where: { deleted: 0, status: 1 },
    });

    if (isExist != 0) {
      await IcesspoolCommission.update(
        { commission: convert(c) },
        { where: { status: 1 } }
      );

      res.redirect("/commission");
    } else {
      const isSubmitted = await IcesspoolCommission.count({
        where: { deleted: 0, commission: convert(c), status: 1 },
      });
      if (isSubmitted == 0) {
        await IcesspoolCommission.create({ commission: convert(c), status: 1 });
      }
      res.redirect("/commission");
    }
  } catch (error) {
    console.log(error);
  }
};

function convert(x) {
  if (x > 1) return (x = x / 100);
  return x;
}
