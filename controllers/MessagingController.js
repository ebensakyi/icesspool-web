const { User } = require("../db/models");
const { UserType } = require("../db/models");

const { Message } = require("../db/models");

const Helper = require("../utils/Helper");

exports.getBulkMessagingPage = async (req, res) => {
  try {
    const messages = await Message.findAll({
      where: { deleted: 0 },
      include: [{ model: User }],
    });
    res.render("bulk-messaging", { data: messages });
  } catch (error) {
    console.error(error.message);
  }
};

exports.sendBulkMessage = async (req, res) => {
  try {
    const to = ["SERVICE PROVIDERS", "CLIENTS"];

    let users = await User.findAll({
      where: { userTypeId: Number(req.body.userGroup), deleted: 0 },
    });

    await Message.create({
      message: req.body.message,
      to: to[Number(req.body.userGroup) - 2],
      type: "BULK",
      sentBy: req.session.user.id,
    });
    // console.log(users);

    users.map((user) =>
      Helper.sendSMS(
        user.phoneNumber,
        req.body.message.replace("$", `Hello ${user.surname.trim()}, `)
      )
    );

    res.redirect("/bulk-messaging");
  } catch (error) {
    console.log(error.message);
    return;
  }
};

exports.sendSingleMessage = async (req, res) => {
  await Message.create({
    message: req.body.message,
    to: req.body.phoneNumber,
    type: "SINGLE",
    sentBy: req.session.user.id,
  });
  await Helper.sendSMS(req.body.phoneNumber, req.body.message);
  res.redirect("/single-messaging");
};

exports.getSingleMessagingPage = async (req, res) => {
  try {
    const messages = await Message.findAll({
      where: { deleted: 0 },
      include: [{ model: User }],
    });
    res.render("single-messaging", { data: messages });
  } catch (error) {
    console.error(error.message);
  }
};
