module.exports.route = (app) => {
  var request = require("request");
  const firebase = require("../config/firebaseConfig");
  const db = firebase.firestore();

  app.get("/withdrawalRequests", async (req, res, next) => {
    if (req.session.user) {
      const userData = req.session.user;

      try {
        const reqSnapshot = await db
          .collection("withdrawalRequests")
          .where("isDisbursed", "==", false)
          .get();
        const reqs = [];
        reqSnapshot.forEach((doc) => {
          reqs.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        res.render("withdrawalRequests", { reqs: reqs, userData: userData });
      } catch (e) {
        next(e);
      }
    } else {
      res.redirect("/");
    }
  });

  app.post("/sendMoMo", async (req, res) => {
    if (req.session.user) {
      var momoNetwork = req.body.network;
      var id = req.body.id;
      var momoNumber = req.body.momoNumber;
      var amount = req.body.amount;
      sendMoMo(res, id, momoNetwork, momoNumber, amount);
    } else {
      res.redirect("/");
    }
  });

  function sendMoMo(res, id, momoNetwork, momoNumber, amount) {
    var options = {
      method: "POST",
      url: "https://prod.theteller.net/v1.1/transaction/process",
      headers: {
        "content-type": "application/json",
        authorization:
          "Basic aWNlc3Nwb29sNWRkN2E5M2QyNTgwZTpNR0kxT1dJNVltUTNZV1kzWkdFM1ptRTNOakUwTUdZMVpqa3hPV1ZrWkRFPQ==",
      },
      body: {
        account_number: momoNumber,
        account_issuer: returnAccountIssuer(momoNetwork),
        merchant_id: "TTM-00001079",
        transaction_id: generateRandom(12),
        processing_code: "404000",
        "r-switch": "FLT",
        desc: "iCesspool payment for an amount of " + amount,
        pass_code: "952db7a88fa23f34bf7fcecbe453877e",
        amount: convertAmount(amount),
      },
      json: true,
    };

    request(options, function (error, response, body) {
      if (error) throw new Error(error);

      if (error) {
        console.log("ERROR ", error);
      } else if (response) {
        const status = response.body.code;
        if (status == "000") {
          updateDisbursementStatus(res, id, status);
        } else {
          res.send({ status: status });
        }
      }
    });
  }

  async function updateDisbursementStatus(res, id, status) {
    await db
      .collection("withdrawalRequests")
      .doc(id.trim())
      .update({
        isDisbursed: true,
      })
      .then(function () {
        res.send({ status: status });
      });
  }

  function generateRandom(length) {
    var result = "";
    var characters = "0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  function convertAmount(amt) {
    const amount = Math.trunc(amt) + "";

    if (amount.length == 1) {
      return "000000000" + amount + "00";
    } else if (amount.length == 2) {
      return "00000000" + amount + "00";
    } else if (amount.amount == 3) {
      return "0000000" + amount + "00";
    } else if (amount.amount == 4) {
      return "000000" + amount + "00";
    } else if (amount.amount == 5) {
      return "00000" + amount + "00";
    } else if (amount.amount == 6) {
      return "0000" + amount + "00";
    } else {
    }
  }
  function returnAccountIssuer(momoNetwork) {
    if (momoNetwork == "MTN") {
      return "MTN";
    } else if (momoNetwork == "VODAFONE") {
      return "VDF";
    } else if (momoNetwork == "AIRTELTIGO") {
      return "TGO" || "ATL";
    }
  }
};
