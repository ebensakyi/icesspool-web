var express = require("express");
var router = express.Router();
var request = require("request");

router.get("/", function(req, res, next) {
  var txId = req.query.txId;
  var amount = req.query.amount;

  returnPaymentUrl(res,txId,amount) 
});

function returnPaymentUrl(res,txId,amount) {
  var jar = request.jar();
  jar.setCookie(request.cookie("XSRF-TOKEN=eyJpdiI6InRGaThkcW1kTmppRWVxWWwzQ21zelE9PSIsInZhbHVlIjoiY0FMUUhUMWNyZlFNY0RsZTU2Mkk0cWt1eTJXc2ZvMlY4aEN1XC9NR0NJaGViRndkc3RpaVZPTE8wSVgyOXNKbEEiLCJtYWMiOiI0MjRlOTVjMmY3YWQxM2E3ZDhjZWFmZTQwYTAyM2Y5Mzg1MDBjZTA3MmNiNmFkZDAzYTIzMjBkMGYxNWFkYjkxIn0%253D"), "https://test.theteller.net/checkout/initiate");
  jar.setCookie(request.cookie("theteller_checkout_session=eyJpdiI6IllJc1VNZ1RTNlpZXC8xN3hmVERHMkVRPT0iLCJ2YWx1ZSI6ImpudE00ZGF4SnpEWjZQK0pCT1hyekxQWVN4Z2h4SlRwNUQydW5hUk1NNFRMb0VpSlBMdStqSzFpd1I1alZIaTUiLCJtYWMiOiIwMjkwMDhmMGM2ZjU1M2EzMzk0ZDA3OWViNTA1ZjI3ZDIzMjhjYjc2YTIxYmJkMTJmZGY1N2RlYWFhMDE3MDBlIn0%253D"), "https://test.theteller.net/checkout/initiate");
  
  var options = {
    method: 'POST',
    url: 'https://test.theteller.net/checkout/initiate',
    headers: {
      'content-type': 'application/json',
      authorization: 'Basic aWNlc3Nwb29sNWRkN2E5M2QyNTgwZTpaR0prWWpNNFlUWXhaVFU1WlROalpEVmlZVFZqWXpCbVpqTmtPVEJsTWprPQ=='
    },
    body: {
      merchant_id: 'TTM-00001079',
      transaction_id: txId,
      desc: 'Payment Using Checkout Page',
      amount:  '000000000212',//amount,
      redirect_url: 'http://icesspool.net/payment-status',
      email: 'info@icesspool.net'
    },
    json: true,
    jar: 'JAR'
  };
  
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    res.send(body);

    console.log(body);
  });
}

module.exports = router;
