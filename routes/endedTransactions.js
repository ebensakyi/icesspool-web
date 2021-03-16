module.exports.route = (app) => {
  const firebase = require("../config/firebaseConfig");
  const db = firebase.firestore();

  app.get("/endedTransactions", async (req, res, next) => {
    if (req.session.user) {
      const userData = req.session.user;

      try {
        const txSnapshot = await db
          .collection("transaction")
          .where("txStatusCode", "==", 3)
          .get();
        const txs = [];
        txSnapshot.forEach((doc) => {
          txs.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        // res.json(users);
        res.render("endedTransactions", { txs: txs, userData: userData });
      } catch (e) {
        next(e);
      }
    } else {
      res.redirect("/");
    }
  });
};
