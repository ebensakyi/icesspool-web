module.exports.route = (app) => {
  const firebase = require("../config/firebaseConfig");
  const db = firebase.firestore();

  app.get("/cancelledTransactions", async (req, res, next) => {
    if (req.session.user) {
      const userData = req.session.user;

      try {
        const txSnapshot = await db.collection("cancelledTransactions").get();
        const txs = [];
        txSnapshot.forEach((doc) => {
          txs.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        // res.json(users);
        res.render("cancelledTransactions", { txs: txs, userData: userData });
      } catch (e) {
        next(e);
      }
    } else {
      res.redirect("/");
    }
  });
};
