module.exports.route = (app) => {
  var bcrypt = require("bcrypt");
  const firebase = require("../config/firebaseConfig");
  const db = firebase.firestore();
  const saltRounds = 10;

  app.get("/", function (req, res, next) {
    res.render("login");
  });

  app.post("/systemUser", function (req, res, next) {
    var plainPassword = req.body.password;
    bcrypt.genSalt(saltRounds, function (err, salt) {
      bcrypt.hash(plainPassword, salt, function (err, hash) {
        const email = req.body.email;
        db.collection("adminUser")
          .doc(email)
          .set({
            surname: req.body.surname,
            otherNames: req.body.otherNames,
            phoneNumber: req.body.phoneNumber,
            email: email,
            role: req.body.role,
            password: hash,
            status: 1,
          })
          .then((user) => {
            res.send({ status: 1 });
          });
      });
    });
  });

  app.get("/systemUser", async function (req, res, next) {
    if (req.session.user) {
      const userData = req.session.user;

      try {
        const adminUserSnapshot = await db.collection("adminUser").get();
        const adminUser = [];
        adminUserSnapshot.forEach((doc) => {
          adminUser.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        res.render("systemUser", { adminUser: adminUser, userData: userData });
      } catch (e) {
        next(e);
      }
    } else {
      res.redirect("/");
    }
  });

  app.post("/", function (req, res, next) {
    var email = req.body.email;
    var password = req.body.password;

    loginUser(req, res, email, password);
  });

  app.get("/logout", function (req, res) {
    res.render("login");
    res.clearCookie("current_user");
  });

  function loginUser(req, res, email, password) {
    db.collection("adminUser")
      .doc(email)
      .get()
      .then((user) => {
        if (user.exists) {
          var hash = user.data().password;
          bcrypt.compare(password, hash, function (err, result) {
            if (result) {
              // const adminUser = user.data();
              req.session.user = user.data();

              res.send({ status: 1 });
            } else {
              res.send({ status: 2 });
            }
          });
        } else {
          res.send({ status: 3 });
        }
      });
  }

  app.get("/profile", function (req, res, next) {
    res.render("profile");
  });

  app.post("/profile", function (req, res, next) {
    var email = req.body.email;
    var currentPassword = req.body.currentPassword;
    var newPassword = req.body.newPassword;

    db.collection("adminUser")
      .doc(email)
      .get()
      .then((user) => {
        if (user.exists) {
          var hash = user.data().password;
          bcrypt.compare(currentPassword, hash, function (err, result) {
            if (result) {
              updateProfile(res, email, newPassword);
            } else {
              res.send({ status: 2 });
            }
          });
        } else {
          res.send({ status: 3 });
        }
      });
  });

  function updateProfile(res, email, newPassword) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      bcrypt.hash(newPassword, salt, function (err, hash) {
        db.collection("adminUser")
          .doc(email)
          .update({
            password: hash,
          })
          .then(function () {
            res.send({ status: 1 });
          });
      });
    });
  }
};
