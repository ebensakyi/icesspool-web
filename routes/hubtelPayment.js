module.exports.route = (app) => {

  var request = require('request')

  app.get("/hubtelPayment", function (req, res, next) {
    var txId = req.query.txId;
    var amount = req.query.amount;

    returnPaymentUrl(res, txId, amount)
  });

  function returnPaymentUrl(res, clientReference, amount) {
    var jar = request.jar();
    jar.setCookie(
      request.cookie("__cfduid=d7c75fe52fe95257dccaa57bd6da0c8c21577272305"),
      "https://payproxyapi.hubtel.com/items/initiate"
    );

    var options = {
      method: "POST",
      url: "https://payproxyapi.hubtel.com/items/initiate",
      headers: {
        "content-type": "application/json",
        authorization:
          "Basic dlp5MUc0bTpkMTliMjkzZmEwNjI0MTYyYjgyMDg4NGUxMzcxNWFjNQ=="
      },
      body: {
        // totalAmount: amount,
        totalAmount: 0.01,
        description: "Book Shop Checkout>>",
        callbackUrl: "http://icesspool.net/payment-success",
        returnUrl: "http://icesspool.net/",
        merchantAccountNumber: "98165",
        cancellationUrl: "http://icesspool.net/payment-cancelled",
        // clientReference: clientReference,
        clientReference: "clientReference"

      },
      json: true,
      jar: "JAR"
    };

    request(options, function (error, response, body) {
      if (error) throw new Error(error);

      res.send(response);
    });
  }

}