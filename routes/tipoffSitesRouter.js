module.exports.route = (app) => {
  const firebase = require("../config/firebaseConfig");
  const db = firebase.firestore();

  app.post("/addTipoffSites", function (req, res, next) {
    if (req.session.user) {
      db.collection("tipoffPoints")
        .doc()
        .set({
          active: true,
          address: req.body.address,
          gps: req.body.gps,
          lat: req.body.lat,
          lng: req.body.lng,
          location: req.body.location,
          name: req.body.name,
          placeId: req.body.placeId,
        })
        .then((user) => {
          res.send({ status: 1 });
        });
    } else {
      res.redirect("/");
    }
  });

  app.get("/tipoffSites", async function (req, res, next) {
    if (req.session.user) {
      const userData = req.session.user;

      try {
        const tipoffPointsSnapshot = await db.collection("tipoffPoints").get();
        const tipoffPoints = [];
        tipoffPointsSnapshot.forEach((doc) => {
          tipoffPoints.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        // res.json(users);
        res.render("tipoffSites", {
          tipoffPoints: tipoffPoints,
          userData: userData,
        });
      } catch (e) {
        next(e);
      }
    } else {
      res.redirect("/");
    }
  });
};
