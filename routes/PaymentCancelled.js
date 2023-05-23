var express = require("express");
var router = express.Router();
var request = require("request");


router.get("/", function(req, res, next) {
  

var options = { method: 'GET', url: 'http://icesspool.net/payment-cancelled' };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
  res.send(body)
});
  });

module.exports = router;
