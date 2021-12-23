const { Payment } = require("../db/models");
const { Transaction } = require("../db/models");
const { TransactionStatus } = require("../db/models");
const { Provider } = require("../db/models");
const { User } = require("../db/models");

const Helper = require("../utils/Helper");
const firebase = require("../utils/FirebaseConfig");
const db = firebase.firestore();

initiatePayment = async (req, res) => {
  try {
    const paymentId = req.query.paymentId;
    const transaction = await Transaction.findOne({
      where: { id: req.query.txId },
    });
    const payment = await Payment.findOne({
      where: { transactionId: transaction.id },
    });

    if (!payment) {
      await Payment.create({
        paymentId: paymentId,
        transactionId: transaction.id,
      });
      const amount = await Helper.amountConverter(req.query.amount);
      const initiated = await Helper.initiateTellerPayment(paymentId, amount);

      return res
        .status(200)
        .send({ statusCode: 1, message: "Payment initiated", data: initiated });
    } else {
      await Payment.update(
        { paymentId: paymentId },
        { where: { transactionId: payment.transactionId } }
      );
      const amount = await Helper.amountConverter(req.query.amount);

      const initiated = await Helper.initiateTellerPayment(
        req.query.paymentId,
        amount
      );

      return res
        .status(200)
        .send({ statusCode: 1, message: "Payment initiated", data: initiated });
    }
  } catch (error) {
    return res.status(400).send({ statusCode: 0, message: error });
  }
};

completePaymentWebhooks = async (req, res) => {
  console.log(new Date().toString()+" : WEBHOOKS==>", req.body);
  res.send({ status: "Success", msg: "Message received", body: req.body });
};

completePayment = async (req, res) => {
  const status = req.query.status;
  const code = req.query.code;
  const reason = req.query.reason;
  const paymentId = req.query.transaction_id;

  try {
    if (code == "000") {
      const payment = await Payment.findOne({
        where: { paymentId: paymentId },
        // include: [
        //   {
        //     model: Transaction,
        //     include: [{ model: Provider, include: [{ model: User }] }],
        //   },
        // ],
      });

      const transaction = await Transaction.findOne({
        where: { id: payment.transactionId },
      });

      const provider = await Provider.findOne({
        where: { id: transaction.providerId },
      });

      const user = await User.findOne({
        where: { id: provider.userId },
      });

      const phoneNumber = await user.phoneNumber;
      const transactionId = await transaction.id;

      await Helper.sendSMS(
        phoneNumber,
        `Customer has made payment to transaction number ${transactionId}. Please use the route button to move to location immediately.\nThank you.`
      );

      let f = await Transaction.findOne({
        where: { id: transactionId },
        include: [{ model: Provider, include: [{ model: User }] }],
      });
      let fcms = [user.fcm];

      await Helper.sendFCMNotification(
        fcms,
        "Payment made",
        "Customer has made payment. Please move now!"
      );

      await db
        .collection(process.env.TRANSACTION_STORE)
        .doc(transactionId)
        .update({
          txStatusCode: 3,
          paymentStatus: 1,
          paymentTime: Helper.getDate() + " at " + Helper.getTime(),
        });
      // .then(async () => {
      // UPDATE DATABASE /////////

      await Transaction.update(
        { currentStatus: 3, paymentStatus: 1 },
        { where: { id: transactionId } }
      );
      const transaction1 = await Transaction.findOne({
        where: { id: transactionId },
      });
      await TransactionStatus.create({
        transactionId: transaction1.id,
        status: 3,
        date: Helper.getDate(),
        time: Helper.getTime(),
      });

      return await res.redirect("/payment-success");
      // });
    } else {
      return await res.redirect(
        "/payment-failed?code=" + code + "&reason=" + reason
      );
    }
  } catch (error) {
    return await res.redirect(
      "/payment-failed?code=" + code + "&reason=" + reason
    );
  }
};

completePayment1 = async (req, res) => {
  const status = req.query.status;
  const code = req.query.code;
  const reason = req.query.reason;

  try {
    if (code == "000") {
      return res.redirect("/payment-success");
    } else {
      return res.redirect("/payment-failed?code=" + code + "&reason=" + reason);
    }
  } catch (error) {
    return res.redirect("/payment-failed?code=" + code + "&reason=" + reason);
  }
};

paymentSuccess = async (req, res) => {
  res.render("payment-success");
};

paymentFailed = async (req, res) => {
  let reason = req.query.reason;
  res.render("payment-failed", { reason: reason });
};

module.exports = {
  initiatePayment,
  completePayment,
  paymentSuccess,
  paymentFailed,
  completePaymentWebhooks,
};
