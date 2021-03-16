module.exports.route = (app) => {


    var request = require("request");

    app.get("/tellerPayment", function (req, res, next) {
        var txId = req.query.txId;
        var amount = req.query.amount;
        var email = req.query.email

        // console.log("LOL1 ",txId)
        // console.log("LOL2 ",amount)

        returnPaymentUrl(res, txId, amount, email)
    });

    function returnPaymentUrl(res, txId, amount, email) {
        var jar = request.jar();
        jar.setCookie(request.cookie("XSRF-TOKEN=eyJpdiI6IlIwaGZyZDFwWGIwMUN1UFNVMmVcLzlBPT0iLCJ2YWx1ZSI6ImwwXC9TckxUUUlFeU14QXhJcis4MmsrWUdDUWluaktoYzNWM20rS1wvSU10MWdtOTlQRHY5dmxLcUdIc05GcE8wTiIsIm1hYyI6ImQ1MzNmMjE2NTcyZmJiYTYxZDI5OGZhODk5OGMyNjhiNjE5NTk2MGQ4MmYzNDFhODc2OWVhMWNiOWVmYzQzOWMifQ%253D%253D"), "https://prod.theteller.net/checkout/initiate");
        jar.setCookie(request.cookie("theteller_checkout_session=eyJpdiI6Ikd5TWxobEJcL0dWSGZ0bHNvUE9MZFhRPT0iLCJ2YWx1ZSI6ImJxdEZnN3NnV3JzcHZnSFpxNENyV05XdThnQklhVEc2S3pvVmNIeExPczdhejNDd0tjQnVnSGdrSGlYUktpUWIiLCJtYWMiOiIzMTE2MmQyZWRiZGZiMjlkMDQ4ODlmMTBiNjM3NTkzMWVhNGJiZTMxMzUxMjZiMzdmNTA4OTQ3ODllMjM3ZGNlIn0%253D"), "https://prod.theteller.net/checkout/initiate");
        var options = {
            method: 'POST',
            url: 'https://prod.theteller.net/checkout/initiate',
            headers: {
                'content-type': 'application/json',
                authorization: 'Basic aWNlc3Nwb29sNWRkN2E5M2QyNTgwZTpNR0kxT1dJNVltUTNZV1kzWkdFM1ptRTNOakUwTUdZMVpqa3hPV1ZrWkRFPQ=='
            },
            body: {
                merchant_id: "TTM-00001079",
                transaction_id: txId,
                desc: "Payment for iCesspool desludging",
                amount: amount,//"000000000010",
                redirect_url: "https://app.icesspool.net/tellerPaymentStatus",
                email: "info@icesspool.net"
            },
            json: true,
            jar: 'JAR'
        };

        request(options, function (error, response, body) {
            if (error) throw new Error(error);
            res.send(response.body);

            // console.log(body);
        });

    }

}