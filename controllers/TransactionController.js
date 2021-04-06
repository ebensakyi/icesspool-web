const { Transaction } = require("../db/models/");
const { TransactionStatus } = require("../db/models/");
const { Client } = require("../db/models/");
const { Provider } = require("../db/models/");
const { District } = require("../db/models/");
const { Status } = require("../db/models/");
const { Closure } = require("../db/models/");
const { AxleClassification } = require("../db/models/");

const { User } = require("../db/models/");
const { ProviderBalance } = require("../db/models/");
const { ProviderEarning } = require("../db/models/");
const { IcesspoolEarning } = require("../db/models/");
const { IcesspoolCommission } = require("../db/models/");
const { IcesspoolBalance } = require("../db/models/");
const { Discount } = require("../db/models");
const { Vehicle } = require("../db/models");
const Sequelize = require("sequelize");

const Op = Sequelize.Op;

const Helper = require("../utils/Helper");
const firebase = require("../db/config/firebaseConfig");

const db = firebase.firestore();

exports.getAllClientTransactions = async (req, res) => {
  try {
    let trx = await Transaction.findAll({ where: { clientId: req.body.id } });
    res.status(201).send({ statusCode: 1, message: "Found", data: trx });
  } catch (error) {
    res.status(400).send({ statusCode: 0, message: error });
  }
};

exports.offerMade = async (req, res) => {
  try {
    const count = await Helper.checkDuplicates(Transaction, {
      where: { id: req.body.transactionId },
    });
    if (count != 0)
      return res
        .status(200)
        .send({ statusCode: 2, message: "Transaction already created" });

    const district = await District.findOne({
      where: { districtName: req.body.district },
    });
    const districtId = district.id;

    let discounts = await Discount.findOne({ where: { deleted: 0 } });
    let trip1Discount = discounts.trip1;
    let trip2Discount = discounts.trip2;
    let trip3Discount = discounts.trip3;
    let trip4Discount = discounts.trip4;
    let trip5Discount = discounts.trip5;

    let discountedCost = await applyDiscount(
      req.body.unitCost,
      req.body.tripsNumber,
      trip1Discount,
      trip2Discount,
      trip3Discount,
      trip4Discount,
      trip5Discount
    );

    const tx = await Transaction.create({
      id: req.body.transactionId,
      axle: req.body.axle,
      unitCost: req.body.unitCost,
      actualTotalCost: req.body.actualTotalCost,
      discountedTotalCost: discountedCost,
      clientId: req.body.clientId,
      requestType: req.body.requestType,
      offerMadeTime: req.body.offerMadeTime,
      location: req.body.location,
      districtId: districtId,
      community: req.body.community,
      toiletType: req.body.toiletType,
      trips: req.body.tripsNumber,
      currentStatus: req.body.txStatusCode,
      lat: req.body.lat,
      lng: req.body.lng,
      gpsAccuracy: req.body.gpsAccuracy,
    });
    await TransactionStatus.create({
      transactionId: tx.id,
      status: tx.currentStatus,
      date: Helper.getDate(),
      time: Helper.getTime(),
    });
    const transaction = await Transaction.findOne({
      where: { id: tx.id },
      include: [
        { model: Client, include: [{ model: User }] },
        { model: District },
        { model: AxleClassification },
      ],
    });

    //send FCM Notification to all appropriate Operators

    let v = await Vehicle.findAll({
      where: {
        axleClassificationId: {
          [Op.gte]: Number(req.body.axle),
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

    res.status(200).send({
      statusCode: 1,
      message: "Transaction created",
      data: transaction,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ statusCode: 0, message: error });
  }
};

exports.offerAccepted = async (req, res) => {
  try {
    let currentStatus = req.body.txStatusCode;
    await Transaction.update(
      {
        providerId: req.body.providerId,
        currentStatus: currentStatus,
      },
      { where: { id: req.body.txId } }
    );

    const transaction = await Transaction.findOne({
      where: { id: req.body.txId },
      include: [{ model: Client, include: [{ model: User }] }],
    });
    const phoneNumber = transaction.Client.User.phoneNumber;
    if (currentStatus == 2) {
      await Helper.sendSMS(
        phoneNumber,
        "Your offer has been accepted by an Operator.\nPlease make payment and the Operator would attend to you immediately.\nThank you."
      );
    } else if (currentStatus == 3) {
      await Helper.sendSMS(
        phoneNumber,
        "A new Operator has accepted your offer.\nThe Operator would attend to you immediately.\nThank you."
      );
    }

    await TransactionStatus.create({
      transactionId: transaction.id,
      status: 2,
      date: Helper.getDate(),
      time: Helper.getTime(),
    })
      .then((tx) => {
        res.status(200).send({
          statusCode: 1,
          message: "Transaction created",
          data: transaction,
        });
      })
      .catch((error) => {
        console.log(error);
        res.status(400).send({ statusCode: 0, message: error });
      });
  } catch (error) {
    console.log(error);
    res.status(400).send({ statusCode: 0, message: error });
  }
};

exports.offerCancelledByCustomer = async (req, res) => {
  try {
    const transaction = await Transaction.findOne({
      where: { id: req.body.txId },
    });

    await Transaction.update(
      {
        currentStatus: 8,
      },
      { where: { id: req.body.txId } }
    );

    await TransactionStatus.create({
      transactionId: transaction.id,
      status: 8,
      date: Helper.getDate(),
      time: Helper.getTime(),
    })
      .then((tx) =>
        res
          .status(200)
          .send({ statusCode: 1, message: "Transaction cancelled" })
      )
      .catch((error) => {
        return res.status(400).send({ statusCode: 0, message: error });
      });
  } catch (error) {
    console.log("error>>>>>>>>>>>", error);

    return res.status(400).send({ statusCode: 0, message: error });
  }
};

exports.offerCancelledByProvider = async (req, res) => {
  try {
    let currentStatus = req.body.txStatusCode;

    await Transaction.update(
      {
        currentStatus: req.body.txStatusCode,
      },
      { where: { id: req.body.txId } }
    );

    const transaction = await Transaction.findOne({
      where: { id: req.body.txId },
      include: [{ model: Client, include: [{ model: User }] }],
    });

    const tx = await TransactionStatus.create({
      transactionId: transaction.id,
      status: req.body.txStatusCode,
      date: Helper.getDate(),
      time: Helper.getTime(),
    });
    const phoneNumber = transaction.Client.User.phoneNumber;

    if (currentStatus == 6) {
      await Helper.sendSMS(
        phoneNumber,
        "We are sorry to inform you that your provider cancelled the request for some reason.\nYour request would immediately be attended to by the next available Operator soon.\nThank you."
      );

      

      let axle = await transaction.axle;
      let v = await Vehicle.findAll({
        where: {
          axleClassificationId: {
            [Op.gte]: axle,
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
    }

    if (tx)
      return res
        .status(200)
        .send({ statusCode: 1, message: "Transaction cancelled" });
    else return res.status(200).send({ statusCode: 0, message: error });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ statusCode: 0, message: error });
  }
};

exports.closeTransaction = async (req, res) => {
  try {
    let transactionId = req.body.transactionId;
    let providerId = req.body.providerId;
    let scannerId = req.body.userId;

    const transaction = await Transaction.findOne({
      where: {
        id: transactionId,
        providerId: providerId,
        //currentStatus: 3,
      },
    });
    if (!transaction)
      return res.status(200).send({
        statusCode: 0,
        message: "Transaction couldn`t be closed. Transaction not found",
      });

    let currentStatus = await transaction.currentStatus;
    if (currentStatus == 4) {
      return res.status(200).send({
        statusCode: 0,
        message: "Transaction already closed.",
      });
    }

    await Transaction.update(
      {
        currentStatus: 4,
      },
      { where: { id: req.body.transactionId } }
    );

    const date = await Helper.getDate();
    const theCommission = await IcesspoolCommission.findOne({
      where: { id: 1 },
    });
    const commission = Number(theCommission.commission);
    const transactionAmount = parseInt(transaction.discountedTotalCost);
    const icesspoolAmount = transactionAmount * commission;

    const providerAmount = transactionAmount - icesspoolAmount;

    const tx = await TransactionStatus.create({
      transactionId: transaction.id,
      status: 4,
      date: Helper.getDate(),
      time: Helper.getTime(),
    });
    if (!tx)
      return res
        .status(200)
        .send({ statusCode: 0, message: "Transaction couldn`t be closed" });

    await ProviderEarning.create({
      transactionId: req.body.transactionId,
      providerId: req.body.providerId,
      amount: providerAmount,
      completionDate: date,
    });
    await IcesspoolEarning.create({
      transactionId: req.body.transactionId,
      amount: icesspoolAmount,
      completionDate: date,
    });

    await ProviderBalance.increment(["balance"], {
      by: parseInt(providerAmount),
      where: { providerId: req.body.providerId },
    });
    await IcesspoolBalance.increment(["balance"], {
      by: parseInt(icesspoolAmount),
      where: { id: 1 },
    });

    await Closure.create({
      userId: scannerId,
      transactionId: transactionId,
      gpsAccuracy: req.body.gpsAccuracy,
      lat: req.body.lat,
      lng: req.body.lng,
    });

    await db
      .collection(process.env.TRANSACTION_STORE)
      .doc(transaction.id)
      .update({
        txStatusCode: 4,
        offerClosedTime: Helper.getDate() + " at " + Helper.getTime(),
      })
      .then(function (data) {
        console.log("Data ", data);
      })
      .catch((error) => {
        console.log("error ", error);
      });

    return res
      .status(200)
      .send({ statusCode: 1, message: "Transaction closed successfully!" });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ statusCode: 0, message: error });
  }
};

exports.getTransactions = async (req, res) => {
  try {
    await Helper.isLogin(req, res);
    const tx = await Transaction.findAll({
      where: { deleted: 0 },
      include: [
        { model: District },
        { model: Status },
        { model: TransactionStatus },
        { model: Client, include: [{ model: User }] },
        { model: Provider },
        { model: AxleClassification },
      ],
      order: [["createdAt", "DESC"]],
    });
    //console.log(tx);
    //return res.send(tx)
    await res.render("transaction", { data: tx, user: req.session.user });
  } catch (error) {
    console.log(error);
  }
};

exports.getTransactionProvider = async (req, res) => {
  try {
    await Helper.isLogin(req, res);
    const provider = await Provider.findOne({
      where: { id: req.params.id },
      include: [{ model: User }],
    });

    return res
      .status(200)
      .send({ statusCode: 1, data: provider, message: null });
  } catch (error) {
    console.log(error);
  }
};

exports.getTransactionClient = async (req, res) => {
  const client = await Client.findOne({
    where: { id: req.params.id },
    include: [{ model: User }],
  });

  return res.status(200).send({ statusCode: 1, data: client, message: null });
};

exports.getTransactionStatuses = async (req, res) => {
  const statuses = await TransactionStatus.findAll({
    where: { transactionId: req.params.id },
    include: [{ model: Status }],
  });
  console.log(statuses);
  return res.status(200).send({ statusCode: 1, data: statuses });
};

applyDiscount = async (
  unitCost,
  numberOfTrips,
  trip1Discount,
  trip2Discount,
  trip3Discount,
  trip4Discount,
  trip5Discount
) => {
  let trip1Cost = unitCost - unitCost * trip1Discount;
  let trip2Cost = unitCost - unitCost * trip2Discount;
  let trip3Cost = unitCost - unitCost * trip3Discount;
  let trip4Cost = unitCost - unitCost * trip4Discount;
  let trip5Cost = unitCost - unitCost * trip5Discount;
  let totalTripCost = 0;

  if (numberOfTrips == 1) {
    totalTripCost = trip1Cost;
    return Math.ceil(totalTripCost);
  } else if (numberOfTrips == 2) {
    totalTripCost = trip1Cost + trip2Cost;
    return Math.ceil(totalTripCost);
  } else if (numberOfTrips == 3) {
    totalTripCost = trip1Cost + trip2Cost + trip3Cost;
    return Math.ceil(totalTripCost);
  } else if (numberOfTrips == 4) {
    totalTripCost = trip1Cost + trip2Cost + trip3Cost + trip4Cost;
    return Math.ceil(totalTripCost);
  } else if (numberOfTrips == 5) {
    totalTripCost = trip1Cost + trip2Cost + trip3Cost + trip4Cost + trip5Cost;
    return Math.ceil(totalTripCost);
  } else {
    totalTripCost5 = trip1Cost + trip2Cost + trip3Cost + trip4Cost + trip5Cost;
    let sum = 0;

    for (let i = 5; i < numberOfTrips; i++) {
      sum = sum + (unitCost - unitCost * trip5Discount);
    }
    return Math.ceil(sum + totalTripCost5);
  }
};

getFcmsArr = async (arr) => {
  let fcmArr = [];
  await arr.map((fcm) => {
    fcm = fcm.User.fcm;
    fcmArr.push(fcm);
  });
  return fcmArr;
};
