const { User } = require("../db/models");

const { ScannerUser } = require("../db/models");
const { TipoffPoint } = require("../db/models");
const { Transaction } = require("../db/models");
const Helper = require("../utils/Helper");

exports.makeRequestPage = async (req, res) => {
  await Helper.isLogin(req, res);
  const transactions = await Transaction.findAll({
    where: {
      deleted: 0,
      requestSource:2
    },
  });
  //res.send(tipOffs)
  res.render("make-request", {
    data: transactions,
    user: req.session.user,
  });
};

exports.makeRequest = async (req, res) => {
  await Helper.isLogin(req, res);

  console.log(req.body);

  await Transaction.create({
    id: Helper.generateTransactionCode(),
    lat: Number(req.body.lat),
    lng: Number(req.body.lng),
    community: req.body.community,
    customerName: req.body.clientName,
    currentStatus:1,
    unitCost: Number(req.body.pricing),
    actualTotalCost:  Number(req.body.pricing),
    discountedTotalCost: Number(req.body.pricing),
    requestSource: 2,
    trips:1,
    axle:1,
    phoneNumber: req.body.phoneNumber,
    gpsAccuracy: 5,
  });

  const transactions = await Transaction.findAll({
    where: {
      deleted: 0,
      requestSource:2
    },
  });
  // const tipOffs = await TipoffPoint.findAll({ where: { deleted: 0 } });
  // //res.send(tipOffs)
  res.render("make-request", {
    data: transactions,
    // tipOffs: tipOffs,
    user: req.session.user,
  });
};

// exports.createScannerUser = async (req, res) => {
//     try {
//         const user = await User.create({
//             surname: req.body.surname,
//             otherNames: req.body.otherNames,
//             email: req.body.email,
//             phoneNumber: req.body.phoneNumber,
//             fcm: req.body.fcm,
//             password: req.body.password,
//             userTypeId: 2,
//         });
//         const scanner = await ScannerUser.create({
//             userId: user.id,
//             tipoffPointId: req.body.tipoffPoint,
//         });
//     } catch (error) { }
// };

exports.addScannerUser = async (req, res) => {
  try {
    const user = await User.create({
      surname: req.body.surname,
      otherNames: req.body.otherNames,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      username: req.body.username,
      password: req.body.password,
      userTypeId: 2,
    });
    const scanner = await ScannerUser.create({
      userId: user.id,
      tipoffPointId: req.body.tipoffPoint,
    })
      .then(
        (user) => res.redirect("/scanners")
        //res.status(200).send({ statusCode: 1, message: "User added", data: user })
      )
      .catch(
        (error) => res.redirect("/scanners")
        //res.status(400).send({ statusCode: 0, message: "Error", data: error })
      );
  } catch (error) {
    console.error(error);
  }
};

exports.deleteScannerUser = async (req, res) => {
  try {
    console.log(req.params);
    await ScannerUser.update({ deleted: 1 }, { where: { id: req.params.id } });
    await User.update({ deleted: 1 }, { where: { id: req.params.id } });
    res.redirect("/scanners");
  } catch (error) {
    console.error(error);
  }
};
