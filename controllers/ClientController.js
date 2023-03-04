const { validationResult } = require("express-validator");

const { User } = require("../db/models");
const { Client } = require("../db/models");
const { Location } = require("../db/models");
const { Region } = require("../db/models");
const { District } = require("../db/models");
const { Transaction } = require("../db/models/");
const { TransactionStatus } = require("../db/models/");
const { Status } = require("../db/models/");
const { Provider } = require("../db/models/");
const Op = require("sequelize").Op;

const Helper = require("../utils/Helper");

///////////////////////WEB/////////////////////

exports.clientPage = async (req, res) => {
  await Helper.isLogin(req, res);

  const users = await User.findAll({
    where: {
      userTypeId: 3,
    },
    include: [
      { model: Client },
      {
        model: Location,
        include: [{ model: District }, { model: Region }],
      },
    ],
  });

  //res.send(users);
  res.render("clients", { data: users, user: req.session.user });
};

exports.clientList = async (req, res) => {
  try {
    let user = await Client.findAll({
      include: [
        {
          model: User,
        },
        {
          model: Location,
          include: [{ model: District, include: [{ model: Region }] }],
        },
      ],
    });
    return res
      .status(200)
      .send({ statusCode: 1, message: "Found", data: user });
  } catch (error) {
    return res.status(400).send({ statusCode: 1, message: error });
  }
};

exports.getAClient = async (req, res) => {
  if (!req.params.id) {
    const error = "Please provide user id";
    return res.status(400).send({ statusCode: 0, message: error });
  }

  await Client.findOne({
    where: {
      userId: req.params.id,
      deleted: 0,
    },
    include: [{ model: User }],
  })
    .then((user) => {
      if (user)
        return res
          .status(200)
          .send({ statusCode: 1, message: "Found", data: user });
      return res
        .status(200)
        .send({ statusCode: 0, message: "Not Found", data: user });
    })
    .catch((err) => res.status(400).send({ statusCode: 0, message: err }));
};

exports.changeClientStatus = async (req, res) => {
  let id = req.query.id;
  let status;

  const user = await User.findOne({ where: { id: id } });
  if (user.activated == 1) {
    status = -1;
  } else {
    status = 1;
  }

  await User.update({ activated: status }, { where: { id: id } });
  res.redirect("/clients");
};

exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.findAll({
      where: {
        clientId: req.query.clientId,
        //[Op.or]: [{ currentStatus: 4 }, { currentStatus: 5 }],
      },
      include: [
        {
          model: TransactionStatus,
          include: [{ model: Status }],
        },
        { model: Provider, include: [{ model: User }] },
      ],
    });

    console.log("TX ",transactions);
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
