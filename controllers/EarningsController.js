const { Transaction } = require("../db/models/");
const { IcesspoolEarning } = require("../db/models/");
const { IcesspoolBalance } = require("../db/models")
const { Provider } = require("../db/models/");
const { ProviderEarning } = require("../db/models/");

const { User } = require("../db/models/");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const Helper = require("../utils/Helper");

exports.getEarnings = async (req, res) => {
  try {
    const transactions = await ProviderEarning.findAll({
      where: {
        providerId: req.query.providerId,
        // [Op.or]: [{ currentStatus: 4 }, { currentStatus: 5 }],
      },
      include: [
        { model: Provider, include: [{ model: User }] },
        { model: Transaction },
      ],
    });
    //console.log(transactions);
    if (!transactions)
      return res
        .status(400)
        .send({ statusCode: 0, message: "An error occurred" });
    return res
      .status(200)
      .send({ statusCode: 1, message: "Found", data: transactions });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .send({ statusCode: 0, message: "A server error occurred" });
  }
};



exports.getIcesspoolBalance = async (req, res) => {
  await Helper.isLogin(req, res);
  try {
   const bal = await IcesspoolBalance.findOne({
      where: { deleted:0 },
      
    })
    console.log(bal)
     
    res.render("icesspool-wallet", {
      data: bal,
      user: req.session.user,
    });
  } catch (error) {
    console.log(error);

  }

};

exports.getProviderEarnings = async (req, res) => {
  try {
    await Helper.isLogin(req, res);

    const transactions = await ProviderEarning.findAll({
      //where: { [Op.or]: [{ currentStatus: 4 }, { currentStatus: 5 }] },
      include: [
        { model: Provider, include: [{ model: User }] },
        { model: Transaction },
      ],
    });

    //return res.send(transactions)
    res.render("provider-earnings", {
      data: transactions,
      user: req.session.user,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getIcesspoolEarnings = async (req, res) => {
  try {
    await Helper.isLogin(req, res);

    const transactions = await IcesspoolEarning.findAll({
      //where: { [Op.or]: [{ currentStatus: 4 }, { currentStatus: 5 }] },
      include: [
        {
          model: Transaction,
          include: [{ model: Provider, include: [{ model: User }] }],
        },
      ],
    });

    //return res.send(transactions);
    res.render("icesspool-earnings", {
      data: transactions,
      user: req.session.user,
    });
  } catch (error) {
    console.log(error);
  }
};
