module.exports.route = (app) => {
  const firebase = require("../config/firebaseConfig");
  const db = firebase.firestore();

  app.get("/cashInWallet", async (req, res, next) => {
    if (req.session.user) {
      const userData = req.session.user;

      try {
        const txSnapshot = await db.collection("providerTotalEarning").get();
        const txs = [];
        txSnapshot.forEach((doc) => {
          txs.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        // res.json(users);
        res.render("cashInWallet", { txs: txs, userData: userData });
      } catch (e) {
        next(e);
      }
    } else {
      res.redirect("/");
    }
  });
};
