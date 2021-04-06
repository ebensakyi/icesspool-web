const { Withdrawal } = require("../db/models/");
const { ProviderBalance } = require("../db/models/");
const { Provider } = require("../db/models");
const { User } = require("../db/models");

const { MomoAccount } = require("../db/models/");
const { MomoNetwork } = require("../db/models/");
const request = require("request");

const Helper = require("../utils/Helper");
exports.createWithdrawal = async (req, res) => {
  try {
    const count = await Withdrawal.count({
      where: { providerId: req.body.providerId, status: 0 },
    });
    if (count != 0)
      return res.status(200).send({
        statusCode: 0,
        message:
          "You have a pending request which needs to be approved before you can make new request",
      });

    const providerBalance = await ProviderBalance.findOne({
      where: { providerId: req.body.providerId },
    });
    const balance = parseInt(providerBalance.balance);
    const requestedAmount = parseInt(req.body.amount);
    if (requestedAmount > balance)
      return res.status(200).send({
        statusCode: 0,
        message: `Your requested amount(GHS ${requestedAmount}) is greater than your balance(GHS ${balance})`,
        data: balance,
      });

    const x = await Withdrawal.create({
      providerId: req.body.providerId,
      amount: req.body.amount,
      requestDate: Helper.getDate(),
      // disbursementDate: req.body.disbursementDate
    });

    if (x)
      await Helper.sendSMS(
        "+233550216288",
        "A withdrawal request has been made. Please attend to it"
      );
    return res
      .status(200)
      .send({ statusCode: 1, message: "Request sent", data: x });
  } catch (error) {
    console.log(error);

    res.status(400).send({ statusCode: 0, message: error });
  }
};

exports.getBalance = async (req, res) => {
  try {
    await Provider.findOne({
      where: { id: req.query.providerId },
      include: [
        { model: ProviderBalance },
        { model: MomoAccount, include: [{ model: MomoNetwork }] },
      ],
    })
      .then((bal) => {
        res
          .status(200)
          .send({ statusCode: 1, message: "Details retrieved", data: bal });
      })
      .catch((error) => {
        res.status(400).send({ statusCode: 0, message: error });
      });
  } catch (error) {
    res.status(400).send({ statusCode: 0, message: error });
  }
};

///////////////////////?WEB///////////

exports.getWithdrawalRequests = async (req, res) => {
  try {
    await Helper.isLogin(req, res);
    const withdrawals = await Withdrawal.findAll({
      where: { deleted: 0 },
      order: [
        ['createdAt', 'DESC'],
      ],    
      include: [
        {
          model: Provider,
          include: [
            { model: User },
            { model: ProviderBalance },
            { model: MomoAccount, include: [{ model: MomoNetwork }] },
          ],
        },
      ],
    });
    //return res.send(withdrawals);
    res.render("withdrawal-requests", {
      data: withdrawals,
      user: req.session.user,
    });
  } catch (error) {
    console.log("getWithdrawalRequests", error);
  }
};

exports.getDisbursements = async (req, res) => {
  try {
    await Helper.isLogin(req, res);
    const disbursements = await Withdrawal.findAll({
      where: { deleted: 0, status: 1 },
      order: [
        ['createdAt', 'DESC'],
      ],    
      include: [
        { model: User },
        {
          model: Provider,
          include: [
            { model: User },
            { model: ProviderBalance },
            { model: MomoAccount },
          ],
        },
      ],
    });
    //res.send(disbursements)
    res.render("disbursement", { data: disbursements, user: req.session.user });
  } catch (error) {
    console.log("getDisbursements", error);
  }
};

exports.getProviderBalance = async (req, res) => {
  try {
    await Helper.isLogin(req, res);
    const balance = await Provider.findAll({
      where: { deleted: 0 },
      include: [
        { model: User },
        { model: ProviderBalance },
        { model: MomoAccount },
      ],
    });
    //res.send(balance)

    res.render("provider-wallet", { data: balance, user: req.session.user });
  } catch (error) {
    console.log("getProviderBalance", error);
  }
};

exports.approveWithdrawal = async (req, res) => {
  try {
    await Helper.isLogin(req, res);
    let id = req.body.id;
    let providerId = req.body.provider_id;

    const withdrawalRequest = await Withdrawal.findOne({
      where: { id: id, providerId: providerId, status: 0, deleted: 0 },
      include: [
        {
          model: Provider,
          include: [
            { model: ProviderBalance },
            { model: MomoAccount, include: [{ model: MomoNetwork }] },
          ],
        },
      ],
    });
    if (
      Number(withdrawalRequest.amount) >
      Number(withdrawalRequest.Provider.ProviderBalance.balance)
    ) {
      res.send({
        statusCode: 0,
        message: "Payment failed. Requested amount is greater than balance",
      });
    } else {
      let momoNetwork = await withdrawalRequest.Provider.MomoAccount.MomoNetwork
        .network;
      let momoNumber = await withdrawalRequest.Provider.MomoAccount.momoNumber;
      let amount = await withdrawalRequest.amount;

      const isSent = await sendMoMo(momoNetwork, momoNumber, amount);
      console.log(isSent);

      if (isSent.code === "000") {
        let transactionId = isSent.transaction_id;
        updateProviderBalance(providerId, amount);
        updateWithdrawal(transactionId, id, providerId, req, res);
      } else {
        res.send({
          statusCode: 0,
          message:
            "Payment failed with the code: " + isSent.code + " from teller",
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

sendMoMo = async (momoNetwork, momoNumber, amount) => {
  let options = {
    method: "POST",
    url: "https://prod.theteller.net/v1.1/transaction/process",
    headers: {
      "content-type": "application/json",
      authorization:
        "Basic aWNlc3Nwb29sNWRkN2E5M2QyNTgwZTpNR0kxT1dJNVltUTNZV1kzWkdFM1ptRTNOakUwTUdZMVpqa3hPV1ZrWkRFPQ==",
    },
    body: {
      account_number: momoNumber,
      account_issuer: await returnAccountIssuer(momoNetwork),
      merchant_id: "TTM-00001079",
      transaction_id: await generateRandom(12),
      processing_code: "404000",
      "r-switch": "FLT",
      desc: "iCesspool payment for an amount of " + amount,
      pass_code: "952db7a88fa23f34bf7fcecbe453877e",
      amount: await Helper.amountConverter(amount + ""),
    },
    json: true,
  };

  return new Promise((resolve, reject) => {
    request(options, (error, response, body) => {
      if (error) return reject(error);
      return resolve(body);
    });
  });

  // request(options, function (error, response, body) {
  //     if (error) throw new Error(error);

  //     if (error) {
  //         console.log("ERROR ", error);
  //     } else if (response) {
  //         const status = response.body.code;
  //         if (status == "000") {
  //             await updateDisbursementStatus(res, id, status);
  //             await updateProviderBalance(providerId,amount)
  //         } else {
  //             res.send({ status: status });
  //         }
  //     }
  // });
};

updateProviderBalance = async (providerId, amount) => {
  try {
    await ProviderBalance.decrement("balance", {
      by: amount,
      where: { providerId: providerId },
    });
  } catch (error) {
    console.log(error);
  }
};
updateWithdrawal = async (transactionId, id, providerId, req, res) => {
  try {
    await Withdrawal.update(
      {
        approvedBy: req.session.user.id,
        transactionId: transactionId,
        disbursementDate: Helper.getDate() + " " + Helper.getTime(),
        status: 1,
      },
      { where: { id: id, providerId: providerId } }
    );
    res.send({ statusCode: 1, message: "Payment completed successfully." });
  } catch (error) {
    console.log(error);
  }
};

returnAccountIssuer = async (momoNetwork) => {
  console.log(momoNetwork);
  if (momoNetwork == "MTN") {
    return "MTN";
  } else if (momoNetwork == "VODAFONE") {
    return "VDF";
  } else if (momoNetwork == "AIRTELTIGO") {
    return "TGO" || "ATL";
  }
};

generateRandom = async (length) => {
  var result = "";
  var characters = "0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};
