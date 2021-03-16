module.exports.route = (app) => {
  const firebase = require("../config/firebaseConfig");
  const db = firebase.firestore();

  app.get("/inactiveAccounts", async (req, res, next) => {
    if (req.session.user) {
      const userData = req.session.user;

      try {
        const userSnapshot = await db
          .collection("user")
          .where("userType", "==", "SP")
          .where("accountActivated", "==", false)
          .get();
        const users = [];
        userSnapshot.forEach((doc) => {
          users.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        // res.json(users);
        res.render("inactiveAccounts", { provider: users, userData: userData });
      } catch (e) {
        next(e);
      }
    } else {
      res.redirect("/");
    }
  });

  app.get("/inactiveAccounts/:id", async (req, res, next) => {
    if (req.session.user) {
      var id = req.params.id;
      await db
        .collection("user")
        .doc(id)
        .update({
          accountActivated: true,
        })
        .then(function () {
          res.redirect("/inactiveAccounts");
        });
    } else {
      res.redirect("/");
    }
  });
};
