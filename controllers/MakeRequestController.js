const { User } = require("../db/models");
const firebase = require("../db/config/firebaseConfig");

const db = firebase.firestore();

const { ScannerUser } = require("../db/models");
const { TipoffPoint } = require("../db/models");
const { Transaction } = require("../db/models");
const { TransactionStatus } = require("../db/models");
const { Vehicle } = require("../db/models");
const Sequelize = require("sequelize");

const Op = Sequelize.Op;

const Helper = require("../utils/Helper");
const { JSON } = require("sequelize");

exports.makeRequestPage = async (req, res) => {
  await Helper.isLogin(req, res);
  const transactions = await Transaction.findAll({
    where: {
      deleted: 0,
      requestSource: 2,
    },
  });
  //res.send(tipOffs)
  res.render("make-request", {
    data: transactions,
    user: req.session.user,
  });
};

exports.makeRequest = async (req, res) => {
  try {
     await Helper.isLogin(req, res);

  console.log(req.body);
  let axle = req.body.pricing.split("$")[0];
  let cost = req.body.pricing.split("$")[1];

  // console.log({
  //   id: Helper.generateTransactionCode(),
  //   lat: Number(req.body.lat),
  //   lng: Number(req.body.lng),
  //   community: req.body.community,
  //   customerName: req.body.clientName,
  //   currentStatus:1,
  //   unitCost:  Number(cost),
  //   actualTotalCost:    Number(cost),
  //   discountedTotalCost:  Number(cost),
  //   requestSource: 2,
  //   trips:1,
  //   axle:Number(axle),
  //   phoneNumber: req.body.phoneNumber,
  //   gpsAccuracy: 5,
  // });

  let tx = await Transaction.create({
    id: Helper.generateTransactionCode(),
    lat: Number(req.body.lat),
    lng: Number(req.body.lng),
    community: req.body.community,
    customerName: req.body.clientName,
    currentStatus: 1,
    unitCost: Number(cost),
    actualTotalCost: Number(cost),
    discountedTotalCost: Number(cost),
    requestSource: 2,
    toiletType: req.body.toiletType,
    trips: 1,
    axle: Number(axle),
    customerPhoneNumber: req.body.phoneNumber,
    gpsAccuracy: 5,
  });


  const transactions = await Transaction.findAll({
    where: {
      deleted: 0,
      requestSource: 2,
    },
  });

  await TransactionStatus.create({
    transactionId: tx.id,
    status: tx.currentStatus,
    date: Helper.getDate(),
    time: Helper.getTime(),
  });
  // const transaction = await Transaction.findOne({
  //   where: { id: tx.id },
  //   include: [
  //     { model: Client, include: [{ model: User }] },
  //     { model: District },
  //     { model: AxleClassification },
  //   ],
  // });

  //send FCM Notification to all appropriate Operators

  let v = await Vehicle.findAll({
    where: {
      axleClassificationId: {
        [Op.gte]: Number(axle),
      },
    },
    include: [{ model: User }],
  });

  let fcms = await getFcmsArr(v);
  await Helper.sendFCMNotification(
    fcms,
    "New offer",
    "There is a new iCesspool offer waiting for you!"
  );
  // console.table(fcms);
  // console.log(fcms);

  let  date = await  Helper.getDate();
  let  time = await  Helper.getTime();

  let transaction =  {
    clientId: "NTR"+tx.customerPhoneNumber,
    txStatusCode: 1,
    requestType: 1,
    offerMadeTime: date + " at " +time,
    customerName: tx.customerName,
    customerPhone: tx.customerPhoneNumber,
    customerEmail: "",
    gpsAccuracy: 0,
    community: tx.community,
    axle: Number(axle),
    axleName: "",
    tripsNumber: 1,
    lat: tx.lat,
    lng: tx.lng,
    toiletType: req.body.toiletType,

    unitCost: tx.unitCost,
    actualTotalCost: tx.actualTotalCost,
    discountedTotalCost: tx.discountedTotalCost,
    createdDate: date + " at " + time,
    deleted: false,
  }

  console.log(transaction);
  await db
    .collection(process.env.TRANSACTION_STORE)
    .doc(tx.id)
    .set(transaction);

  // await db
  // .collection(process.env.TRANSACTION_STORE)
  // .doc(transaction.id)
  // .update({
  //   txStatusCode: 4,
  //   offerClosedTime: Helper.getDate() + " at " + Helper.getTime(),
  // })
  // .then(function (data) {
  //   console.log("Data ", data);
  // })
  // .catch((error) => {
  //   console.log("error ", error);
  // });

  // res.status(200).send({
  //   statusCode: 1,
  //   message: "Transaction created",
  //   data: transaction,
  // });
  // const tipOffs = await TipoffPoint.findAll({ where: { deleted: 0 } });
  // //res.send(tipOffs)
  res.render("make-request", {
    data: transactions,
    // tipOffs: tipOffs,
    user: req.session.user,
  });
  } catch (error) {
    console.log(error);
  }
 
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
