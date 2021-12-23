module.exports.route = (app) => {
  var bcrypt = require("bcryptjs");
  const firebase = require("../config/firebaseConfig");
  const db = firebase.firestore();
  const saltRounds = 10;

  app.post("/scannerUser", function (req, res, next) {
    if (req.session.user) {
      var plainPassword = req.body.password;
      bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(plainPassword, salt, function (err, hash) {
          const phoneNumber = req.body.phoneNumber;
          db.collection("scannerUser")
            .doc(phoneNumber)
            .set({
              surname: req.body.surname,
              otherNames: req.body.otherNames,
              phoneNumber: req.body.phoneNumber,
              email: req.body.email,
              plant: req.body.plant,
              password: hash,
              status: 1,
            })
            .then((user) => {
              res.send({ status: 1 });
            });
        });
      });
    } else {
      res.redirect("/");
    }
  });

  app.get("/scannerUser", async function (req, res, next) {
    if (req.session.user) {
      const userData = req.session.user;

      try {
        const userSnapshot = await db.collection("scannerUser").get();
        const users = [];
        userSnapshot.forEach((doc) => {
          users.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        // res.json(users);
        res.render("scannerUser", { users: users, userData: userData });
      } catch (e) {
        next(e);
      }
    } else {
      res.redirect("/");
    }
  });
};
