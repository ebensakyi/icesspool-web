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
    const transaction = await Transaction.findOne({
      where: { id: req.query.txId },
    });
    const payment = await Payment.findOne({
      where: { transactionId: transaction.id },
    });
   

    if (!payment) {
      await Payment.create({
        paymentId: req.query.paymentId,
        transactionId: transaction.id,
      });
      const amount = await Helper.amountConverter(req.query.amount);
      const initiated = await Helper.initiateTellerPayment(
        req.query.paymentId,
        amount
      );

      return res
        .status(200)
        .send({ statusCode: 1, message: "Payment initiated", data: initiated });
    } else {
      await Payment.update(
        { paymentId: req.query.paymentId },
        { where: { transactionId: payment.transactionId } }
      );
      const amount = await Helper.amountConverter(req.query.amount);
      const initiated = await Helper.initiateTellerPayment(
        req.query.paymentId,
        amount
      );

      // console.log("AMOUNT>>>>>>>>>>>>>> ",amount)

      return res
        .status(200)
        .send({ statusCode: 1, message: "Payment initiated", data: initiated });
    }
  } catch (error) {
    console.log("ERROR: ", error);
    return res.status(400).send({ statusCode: 0, message: error });
  }
};

completePayment = async (req, res) => {
  try {
    const status = req.query.status;
    const code = req.query.code;
    const reason = req.query.reason;

    const paymentId = req.query.transaction_id;

    if (code == "000") {
      const payment = await Payment.findOne({
        where: { paymentId: paymentId },
        include: [
          {
            model: Transaction,
            include: [{ model: Provider, include: [{ model: User }] }],
          },
        ],
      });
      const phoneNumber = await payment.Transaction.Provider.User.phoneNumber;
      const transactionId = await payment.Transaction.id;

      await Helper.sendSMS(
        phoneNumber,
        `Customer has made payment to transaction number ${transactionId}. Please use the route button to move to location immediately.\nThank you.`
      );

      await db
        .collection(process.env.TRANSACTION_STORE)
        .doc(transactionId)
        .update({
          txStatusCode: 3,
          paymentStatus: 1,
          paymentTime: Helper.getDate() + " at " + Helper.getTime(),
        })
        .then(async () => {
          // UPDATE DATABASE /////////

          await Transaction.update(
            { currentStatus: 3, paymentStatus: 1 },
            { where: { id: transactionId } }
          );
          const transaction = await Transaction.findOne({
            where: { id: transactionId },
          });
          await TransactionStatus.create({
            transactionId: transaction.id,
            status: 3,
            date: Helper.getDate(),
            time: Helper.getTime(),
          });

          return await res.redirect("/payment-success");
        });
    } else {
      return await res.redirect("/payment-failed?code=" + code + "&reason=" + reason);
    }
  } catch (error) {
    console.log("ERRROR>>>>>", error);
    return  await res.redirect("/payment-failed?code=" + code + "&reason=" + reason);
  }
};

// completePayment = async (req, res) => {
//   try {
//     const status = req.query.status;
//     const code = req.query.code;
//     const paymentId = req.query.transaction_id;

//     if (code == "000") {
//       const payment = await Payment.findOne({
//         where: { paymentId: paymentId },
//         include: [
//           {
//             model: Transaction,
//             include: [{ model: Provider, include: [{ model: User }] }],
//           },
//         ],
//       });
//       const phoneNumber = payment.Transaction.Provider.User.phoneNumber;
//       const transactionId = payment.Transaction.id;

//       await Helper.sendSMS(
//         phoneNumber,
//         `Customer has made payment to transaction number ${transactionId}. Please move to location immediately.\nThank you.`
//       );

//       await db
//         .collection(process.env.TRANSACTION_STORE)
//         .doc(transactionId)
//         .update({
//           txStatusCode: 3,
//           paymentStatus: 1,
//           paymentTime: Helper.getDate() + " at " + Helper.getTime(),
//         })
//         .then(async () => {
//           // UPDATE DATABASE /////////

//           await Transaction.update(
//             { currentStatus: 3, paymentStatus: 1 },
//             { where: { id: transactionId } }
//           );
//           const transaction = await Transaction.findOne({
//             where: { id: transactionId },
//           });
//           await TransactionStatus.create({
//             transactionId: transaction.id,
//             status: 3,
//             date: Helper.getDate(),
//             time: Helper.getTime(),
//           });

//           return res.redirect("/payment-success");
//         });
//     } else if (code == "101") {
//       return res.redirect("/payment-failed");
//     } else if (code == "999") {
//       return res.redirect("/payment-expired");

//       //res.send("Payment request has expired");
//     }
//   } catch (error) {
//     console.log("ERRROR>>>>>", error);
//     res.redirect("/payment-failed");
//   }
// };

// paymentMade = async (req, res) => {
//   // try {

//   const payment = await Payment.findOne({
//     where: { paymentId: paymentId },
//     include: [{ model: Transaction }],
//   });
// await Transaction.update({
//     currentStatus: req.body.txStatusCode,
// }, { where: { transactionId: req.body.txId } })

//     const transaction = await Payment.findOne({ where: { paymentId: paymentId } })

//     const tx = await TransactionStatus.create({
//         transactionId: transaction.id,
//         status: req.body.txStatusCode,
//         date: Helper.getDate(),
//         time: Helper.getTime()
//     })

//     if (tx) return res.status(200).send({ statusCode: 1, message: 'Transaction cancelled' })
//     else
//         return res.status(400).send({ statusCode: 0, message: error })

// } catch (error) {

//     return res.status(400).send({ statusCode: 0, message: error })
// }
//};

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
};
