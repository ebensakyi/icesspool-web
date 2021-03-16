module.exports.route = (app) => {
  var request = require("request");
  const firebase = require("../config/firebaseConfig");
  const db = firebase.firestore();

  app.get("/disbursements", async (req, res, next) => {
    if (req.session.user) {
      const userData = req.session.user;

      try {
        const reqSnapshot = await db
          .collection("withdrawalRequests")
          .where("isDisbursed", "==", true)
          .get();
        const reqs = [];
        reqSnapshot.forEach((doc) => {
          reqs.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        res.render("disbursements", { reqs: reqs, userData: userData });
      } catch (e) {
        next(e);
      }
    } else {
      res.redirect("/");
    }
  });
};
