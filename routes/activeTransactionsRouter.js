module.exports.route = (app) => {
  const firebase = require("../config/firebaseConfig");
  const db = firebase.firestore();

  app.get("/activeTransactions", async (req, res, next) => {
    if (req.session.user) {
      const userData = req.session.user;
      try {
        const txSnapshot = await db
          .collection("transaction")
          .where("txStatusCode", "<=", 2)
          .get();
        const txs = [];
        txSnapshot.forEach((doc) => {
          txs.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        // res.json(users);
        res.render("activeTransactions", { txs: txs, userData: userData });
      } catch (e) {
        next(e);
      }
    } else {
      res.redirect("/");
    }
  });

  app.get("/activeTransactions/:id", async (req, res, next) => {
    var id = req.params.id;
    await db
      .collection("user")
      .doc(id)
      .update({
        accountActivated: false,
      })
      .then(function () {
        res.redirect("/activeTransactions");
      });
  });
};
