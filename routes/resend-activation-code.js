module.exports.route = (app) => {

  var request = require("request");

  // const { Firestore } = require("@google-cloud/firestore");
  const firebase = require("firebase");

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDr2HuKyVTzG-yeMaztKU0R4zp7JN9RIMw",
    authDomain: "icesspool-f37c6.firebaseapp.com",
    databaseURL: "https://icesspool-f37c6.firebaseio.com",
    projectId: "icesspool-f37c6",
    storageBucket: "icesspool-f37c6.appspot.com",
    messagingSenderId: "200856363861",
    appId: "1:200856363861:web:2711a3c3c658f21f3bc5dc"
  };
  // Initialize Firebase
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  const db = firebase.firestore();


  app.get("/resend-activation-code", function (req, res, next) {
    var phoneNumber = req.query.phoneNumber;
    var convertedNumber = phoneNumber.replace('0','+233')
    console.log("HERRR ",phoneNumber,convertedNumber)
    getActivationCode(res, convertedNumber);
  });

  function sendCode(res, phoneNumber, activationCode) {

    var options = {
      method: "GET",
      url: "https://smsc.hubtel.com/v1/messages/send",
      qs: {
        From: "ICESSPOOL",
        To: phoneNumber,
        Content: "Your activation code is " + activationCode,
        ClientID: "hlqviczc",
        ClientSecret: "bagkdueb"
      }
    };

    request(options, function (error, response, body) {
      if (error) {
        res.json({ status: 0 })
      }
      res.json({ status: 1 })
    });
  }


  function getActivationCode(res, phoneNumber) {
    db.collection("activationCode")
      .where("phoneNumber", "==", phoneNumber)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {

          sendCode(res, phoneNumber, doc.data().code)
          // doc.data() is never undefined for query doc snapshots
          // console.log(doc.id, " +++++=> ", doc.data());
          //res.render("new-account-request", { provider: doc.data() });
        });
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
  }


}