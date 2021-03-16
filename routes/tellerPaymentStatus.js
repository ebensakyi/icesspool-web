module.exports.route = app => {
  const firebase = require("../config/firebaseConfig");
  const db = firebase.firestore();

  app.get("/tellerPaymentStatus", async (req, res, next) => {
    var status = req.query.status;
    var code = req.query.code;
    var transactionId = req.query.transaction_id;

    if (code == "000") {
      await db
        .collection("transaction")
        .doc(transactionId)
        .update({
          txStatusCode: 2,
          txStatus: "ORDER IN PLACE",
          paymentTime: getDateTime()
        })
        .then(function() {
          res.redirect("/paymentDoneInstruction");
        });
    }else if(code =="101"){
      res.redirect("/paymentFailedInstruction");

    }else if(code =="999"){
      res.send("Payment request has expired");

    }
  });

  function getDateTime() {
    var today = new Date();
    var date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    var time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + " at " + time;

    return dateTime;
  }
};
