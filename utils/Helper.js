const regions = require("./Constants").regions;
const id = require("./Generators").generateId;
const date = require("./Generators").getDate;
const request = require("request");
require("dotenv").config();

const DISTANCE_MATRIX_API_KEY = "AIzaSyBh419QllxHBba6sTO6ieYXNHasCNNpm-M";
const DISTANCE_MATRIX_API_URL =
  "https://maps.googleapis.com/maps/api/distancematrix/json";

exports.generateProviderCode = (regionId) => {
  return regions[Number(regionId)] + date() + id(4) + "PR";
};

exports.generateClientCode = (regionId) => {
  return regions[Number(regionId)] + date() + id(4) + "CL";
};

exports.sendSMS = async (phoneNumber, content) => {
  var options = {
    method: "GET",
    url: "https://smsc.hubtel.com/v1/messages/send",
    qs: {
      from: "ICESSPOOL",
      to: phoneNumber,
      content: content,
      clientid: process.env.HUBTEL_CLIENT_ID,
      clientsecret: process.env.HUBTEL_CLIENT_SECRET,
    },
  };

  return await request(options);
};

exports.sendSMS1 = async (phoneNumber, content) => {
  let options = {
    method: "POST",
    url: "http://api.sms.qikli.com/sms/2/text/advanced",
    headers: {
      "content-type": "application/json",
      authorization: "Basic c3VwcG9ydEBpY2Vzc3Bvb2wubmV0OlN1cHBvcnRAPzEyMw==",
    },
    body: {
      messages: [
        {
          from: "ICESSPOOL",
          destinations: [{ to: phoneNumber, messageId: messageId }],
          text: content,
        },
      ],
      bulkId: "BULK-ID-123-xyz",
      tracking: { track: "SMS", type: "ICESSPOOL" },
    },
    json: true,
  };

  return await request(options);
};

exports.sendEmail = async (to, subject, message) => {
  const nodemailer = require("nodemailer");

  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "icesspoolgh@gmail.com",
      pass: "icesspool@2318",
    },
  });

  const mailOptions = {
    to: to,
    subject: subject,
    text: message,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      return true;
    } else {
      console.log("Email sent: " + info.response);
      return false;
    }
  });
};

exports.getDistance = async (tipOffPoints, userLat, userLng) => {
  var options = {
    method: "POST",
    url: DISTANCE_MATRIX_API_URL,
    qs: {
      units: "imperial",
      origins: tipOffPoints.toString().replace("|,", "|"),
      destinations: `${userLat},${userLng}`,
      key: DISTANCE_MATRIX_API_KEY,
    },
    headers: { "content-type": "application/json" },
  };
  return new Promise((resolve, reject) => {
    request(options, (error, response, body) => {
      if (error) return reject(error);
      const data = JSON.parse(body);
      let distances = [];
      data.rows.map((d) => {
        let e = d.elements;
        e.map((f) => {
          distances.push(f.distance.text.replace("mi", "") * 1.609);
        });
      });

      return resolve(Math.min.apply(null, distances));
    });
  });
};

exports.initiateTellerPayment = async (paymentId, amount) => {
  const options = {
    method: "POST",
    url: process.env.TELLER_URL,
    rejectUnauthorized: true,
    headers: {
      "content-type": "application/json",
      "Cache-Control": "no-cache",
      authorization: process.env.TELLER_API,
    },
    body: {
      merchant_id: process.env.MERCHANT_ID,
      transaction_id: paymentId,
      desc: "Payment for iCesspool desludging",
      amount: amount,
      //redirect_url: "http://192.168.8.116:3000/api/v1/complete-payment",
      redirect_url: process.env.REDIRECT_URL,
      email: "info@icesspool.net",
    },
    json: true,
  };

  return new Promise((resolve, reject) => {
    request(options, (error, response, body) => {
      if (error) return reject(error);
      return resolve(body);
    });
  });
};

exports.amountConverter = async (amount) => {
  amount = amount.trim();
  if (amount.length == 1) {
    amount = "000000000" + amount + "00";
  } else if (amount.length == 2) {
    amount = "00000000" + amount + "00";
  } else if (amount.length == 3) {
    amount = "0000000" + amount + "00";
  } else if (amount.length == 4) {
    amount = "000000" + amount + "00";
  } else if (amount.length == 5) {
    amount = "00000" + amount + "00";
  }
  return amount;
};

exports.getDate = () => {
  const currentDate = new Date();

  let day = currentDate.getDate();
  let month = currentDate.getMonth(); //Be careful! January is 0 not 1
  let year = currentDate.getFullYear();

  if (date < 10) {
    date = "0" + date;
  }
  month = month + 1;
  if (month < 10) {
    month = "0" + month;
  }

  let dateString = year + "-" + month + "-" + day;

  return dateString;
};

exports.getTime = () => {
  return new Date().toTimeString().split(" ")[0];
};

exports.checkDuplicates = (Model, object) => {
  const count = Model.count(object);
  return count;
};

exports.isLogin = async (req, res) => {
  // console.log("Sessions:=> ",req.session.user)
  if (!req.session.user) res.redirect("/");
};

exports.isActive = (hbs) => {
  hbs.registerHelper("isActive", function (value) {
    if (value == 1) {
      return ' <span class="badge badge-pill badge-success">ACTIVE</span>';
    } else if (value == 0) {
      return ' <span class="badge badge-pill badge-warning">INACTIVE</span>';
    } else {
      return ' <span class="badge badge-pill badge-danger">SUSPENDED</span>';
    }
  });
};

exports.isDisbursed = (hbs) => {
  hbs.registerHelper("isDisbursed", function (value) {
    if (value == 1) {
      return ' <span class="badge badge-pill badge-success">DISBURSED</span>';
    } else {
      return ' <span class="badge badge-pill badge-warning">PENDING</span>';
    }
  });
};

exports.inactivateBtn = (hbs) => {
  hbs.registerHelper("inactivateBtn", function (value) {
    if (value == 1) {
      return "disabled";
    }
  });
};

exports.inactivateCloseTxBtn = (hbs) => {
  hbs.registerHelper("inactivateCloseTxBtn", function (value) {
    if (value != 3) {
      return "disabled";
    }
  });
};

exports.statusColors = (hbs) => {
  hbs.registerHelper("statusColors", function (value) {
    if (value == 1) {
      return '<span class="badge badge-primary">Offer made</span>';
    } else if (value == 2) {
      return '<span class="badge badge-warning">Offer Accepted</span>';
    } else if (value == 3) {
      return '<span class="badge badge-success">Offer in place</span>';
    } else if (value == 4) {
      return '<span class="badge badge-dark">Offer closed</span>';
    } else if (value == 4) {
      return '<span class="badge badge-info">Rated</span>';
    } else {
      return '<span class="badge badge-danger">Cancelled</span>';
    }
  });
};

exports.app233 = async (number) => {
  if (number.charAt(0) == "0") {
    console.log("number.replace()", number.replace("0", "+233"));
    return number.replace("0", "+233");
  }
};

exports.sendFCMNotification = async (fcms, title, body) => {
  const options = {
    method: "POST",
    url: "https://fcm.googleapis.com/fcm/send",
    headers: {
      Authorization: "key=AIzaSyBh419QllxHBba6sTO6ieYXNHasCNNpm-M",
      "Content-Type": "application/json",
    },
    body: {
      registration_ids: fcms,
      collapse_key: "type_a",
      notification: { body: body, title: title },
      data: {
        body: body,
        title: title,
        // key_1: 'Value for key_1',
        // key_2: 'Value for key_2'
      },
    },
    json: true,
  };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);

    console.log(body);
  });
};
