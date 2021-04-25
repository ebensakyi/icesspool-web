module.exports.route = (app) => {
  const firebase = require("../config/firebaseConfig");
  const db = firebase.firestore();

  app.get("/customerAccounts", async (req, res, next) => {
    if (req.session.user) {
      const userData = req.session.user;

      try {
        const customerSnapshot = await db
          .collection("user")
          .where("userType", "==", "CLIENT")
          .where("accountActivated", "==", true)
          .get();
        const users = [];
        customerSnapshot.forEach((doc) => {
          users.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        // res.json(users);
        res.render("customerAccounts", { users: users, userData: userData });
      } catch (e) {
        next(e);
      }
    } else {
      res.redirect("/");
    }
  });

  app.get("/customerAccounts/:id", async (req, res, next) => {
    if (req.session.user) {
      var id = req.params.id;
      await db
        .collection("user")
        .doc(id)
        .update({
          accountActivated: false,
        })
        .then(function () {
          res.redirect("/customerAccounts");
        });
    } else {
      res.redirect("/");
    }
  });
};
