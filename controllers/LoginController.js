const { User } = require("../db/models");
const { ActivationCode } = require("../db/models");
const { Logs } = require("../db/models");
const { _2fa } = require("../db/models");

const helper = require("../utils/Helper");
const gen = require("../utils/Generators");
const bcrypt = require("bcrypt");

exports.mobileLogin = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { phoneNumber: req.body.phoneNumber, deleted: 0 },
    });

    if (user) {
      // const match = await bcrypt.compare(password, user.passwordHash);

      const valid = await user.validPassword(req.body.password);
      if (valid) {
        if (user.activated == 0) {
          return res
            .status(200)
            .send({ statusCode: 0, message: "Not activated", data: user });
        } else if (user.activated == -1) {
          return res.status(200).send({
            statusCode: 5,
            message:
              "Your account has been disabled. You can contact iCesspool to enable it.",
            data: user,
          });
        }
        req.session.user = user;
        await Logs.create({
          userId: user.id,
          activity: `Logged in`,
        });
        return res
          .status(200)
          .send({ statusCode: 1, message: "User found", data: user });
      }
      return res.status(200).send({ statusCode: 2, message: "Wrong password" });
    } else {
      return res.status(200).send({ statusCode: 3, message: "User not found" });
    }
  } catch (error) {
    return res.status(400).send({ statusCode: 4, message: error });
  }
};

exports.loginPage = async (req, res) => {
  res.render("login");
};

exports.validatePhoneNumber = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { phoneNumber: req.body.phoneNumber, deleted: 0 },
    });

    if (user) {
      const activationCode = await ActivationCode.create({
        code: gen.generateActivationCode(4),
        userId: user.id,
      });
      await helper.sendSMS(
        user.phoneNumber,
        `Your activation code is ${activationCode.code}`
      );
      return res.status(200).send({ statusCode: 1, message: "SMS sent" });
    }
    return res.status(200).send({ statusCode: 0, message: "User not found" });
  } catch (error) {
    console.log(error);
  }
};

exports.changePassword = async (req, res) => {
  try {
    const activationCode = await ActivationCode.count({
      where: { code: req.body.code },
    });
    if (activationCode == 0) {
      return res
        .status(200)
        .send({ statusCode: 0, message: "Activation code not found" });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = await User.update(
      { password: hashedPassword },
      { where: { phoneNumber: req.body.phoneNumber } }
    );

    if (user[0] == 1) {
      await ActivationCode.destroy({ where: { code: req.body.code } }).then(
        () => {
          return res
            .status(200)
            .send({ statusCode: 1, message: "Password updated" });
        }
      );
    }
    return res
      .status(200)
      .send({ statusCode: 0, message: "Password not updated" });
  } catch (error) {
    console.log("ERROR ", error);
  }
};

exports.getProfilePage = async (req, res) => {
  const user = await User.findOne({ where: { email: req.session.user.email } });

  res.render("profile", { data: user, user: req.session.user });
};

exports.logout = async (req, res) => {
  let userId = req.session.user.id;
  req.session.destroy(function (err) {
    if (err) {
      console.log(err);
    } else {
      Logs.create({
        userId: userId,
        activity: `Logged out`,
      });
      res.status(200).clearCookie("_redisDemo", {
        path: "/",
      });
      res.redirect("/");
    }
  });
};

exports.changeWebPassword = async (req, res) => {
  try {
    //console.log(req.body)
    const currentPassword = req.body.currentPassword;
    //const hashedCurrentPassword = await bcrypt.hash(currentPassword, 10);
    //console.log("hashedCurrentPassword ", hashedCurrentPassword)

    const newPassword = req.body.newPassword;
    const hashedNewPassword = await bcrypt.hash(newPassword, 10); //$2b$10$2kd6bbm7fGJiJejtqCETwebydn7sysfrQo.ipU8CuFMzvS8I/VPxq

    // const user = await User.findOne({ where: { email: req.session.user.email } })
    // console.log("user ",user.password)

    // const match = await bcrypt.compare(user.password, hashedCurrentPassword);
    // console.log("Match ",match)

    const user = await User.update(
      { password: hashedNewPassword },
      {
        where: {
          email: req.session.user.email,
          phoneNumber: req.session.user.phoneNumber,
        },
      }
    );
    if (!user)
      return res
        .status(200)
        .send({ statusCode: 0, message: "Password not updated" });
  } catch (error) {
    console.log(error);
  }
};

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { email: req.body.email, userTypeId: 1, deleted: 0 },
    });

    if (user != null) {
      const valid = await user.validPassword(req.body.password);
      if (valid) {
        req.session.user = user;
        if (user.activated == 0) {
          return res
            .status(200)
            .send({ statusCode: 0, message: "Not activated", data: user });
        }
        await Logs.create({
          userId: user.id,
          activity: `Logged in`,
        });

        const pin = await _2fa.create({
          pin: gen.generateActivationCode(6),
          email: user.email,
        });
        await helper.sendEmail(
          user.email,
          "ICESSPOOL PIN CODE",
          `Your pin code is ${pin.pin}`
        );

        return res
          .status(200)
          .send({ statusCode: 1, message: "User found", data: user });
      }
      return res.status(200).send({ statusCode: 2, message: "Wrong password" });
    } else {
      return res.status(200).send({ statusCode: 3, message: "User not found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).send({ statusCode: 4, message: error });
  }
};

exports._2fa = async (req, res) => {
  res.render("2fa");
};
exports._2faValidate = async (req, res) => {
  const pins = await _2fa.count({
    where: { pin: req.body.pin, email: req.session.user.email },
  });
  // await _2fa.destroy({ where: { email: req.session.user.email } });
  // console.log("PINS ", pins);
  if (pins == 1) {
    await _2fa.destroy({ where: { email: req.session.user.email } });
    return res.status(200).send({ statusCode: 1, message: "User found" });
  } else {
    return res.status(200).send({ statusCode: 0, message: "PIN not found" });
  }
};
