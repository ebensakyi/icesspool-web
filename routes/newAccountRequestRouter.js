module.exports.route = (app) => {
  const firebase = require("../config/firebaseConfig");
  const db = firebase.firestore();

  app.get("/newAccountRequest", async (req, res, next) => {
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
        res.render("newAccountRequest", {
          provider: users,
          userData: userData,
        });
      } catch (e) {
        next(e);
      }
    } else {
      res.redirect("/");
    }
  });

  app.get("/newAccountRequest/:id", async (req, res, next) => {
    if (req.session.user) {
      var id = req.params.id;
      await db
        .collection("user")
        .doc(id)
        .update({
          accountActivated: true,
        })
        .then(function () {
          res.redirect("/newAccountRequest");
        });
    } else {
      res.redirect("/");
    }
  });
  app.get("/getNewAccountRequestById", async (req, res, next) => {
    if (req.session.user) {
      const userData = req.session.user;

      try {
        var id = req.query.id;

        let spRef = db.collection("provider").doc(id);
        let getDoc = spRef
          .get()
          .then((doc) => {
            if (!doc.exists) {
              console.log("No such document!");
            } else {
              res.json({ id: doc.id, data: doc.data() });
            }
          })
          .catch((err) => {
            console.log("Error getting document", err);
          });
      } catch (e) {
        next(e);
      }
    } else {
      res.redirect("/");
    }
  });
  app.post("/newAccountRequest", async (req, res) => {
    const id = req.body.id;
    const surname = req.body.surname;
    const otherNames = req.body.otherNames;
    const email = req.body.email;
    const companyName = req.body.companyName;
    const officeLocation = req.body.officeLocation;
    const ghanaPostGps = req.body.ghanaPostGps;
    const driverLicense = req.body.driverLicense;
    const licenseNumber = req.body.licenseNumber;
    const licenseClassification = req.body.licenseClassification;
    const vehicleNumber = req.body.vehicleNumber;
    const axleClassification = req.body.axleClassification;
    const tankCapacity = req.body.tankCapacity;
    const insuranceNumber = req.body.insuranceNumber;
    const insuranceExpiry = req.body.insuranceExpiry;
    const roadWorthy = req.body.roadWorthy;
    const roadWorthyExpiryDate = req.body.roadWorthyExpiryDate;
    const vehicleOwnerName = req.body.vehicleOwnerName;
    const vehicleOwnerPhoneNumber = req.body.vehicleOwnerPhoneNumber;

    try {
      await db
        .collection("provider")
        .doc(id)
        .update({
          surname: surname,
          otherNames: otherNames,
          email: email,
          companyName: companyName,
          officeLocation: officeLocation,
          ghanaPostGps: ghanaPostGps,
          driverLicense: driverLicense,
          licenseNumber: licenseNumber,
          licenseClassification: licenseClassification,
          vehicleNumber: vehicleNumber,
          //passportPicture:passportPicture,
          axleClassification: axleClassification,
          tankCapacity: tankCapacity,
          insuranceNumber: insuranceNumber,
          insuranceExpiry: insuranceExpiry,
          roadWorthy: roadWorthy,
          roadWorthyExpiryDate: roadWorthyExpiryDate,
          vehicleOwnerName: vehicleOwnerName,
          vehicleOwnerPhoneNumber: vehicleOwnerPhoneNumber,
        })
        .then(function () {
          res.send({ status: 1 });
          //console.log("Data updated");
        });
    } catch (error) {
      console.log("Err", error);
    }
  });
  // async function readNew() {
  //   const document = db.doc('tryTb');

  //   // Enter new data into the document.
  //   await document.set({
  //     title: 'Welcome to Firestore',
  //     body: 'Hello World',
  //   });
  //   console.log('Entered new data into the document');

  //   // Update an existing document.
  //   await document.update({
  //     body: 'My first Firestore app',
  //   });
  //   console.log('Updated an existing document');

  //   // Read the document.
  //   let doc = await document.get();
  //   console.log('Read the document');

  //   // Delete the document.
  //   await document.delete();
  //   console.log('Deleted the document');
  // }

  function getData(res) {
    let providerRef = db.collection("provider");
    let providers = providerRef
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          res.send(doc.data());
          console.log(doc.id, "=>", doc.data());
        });
      })
      .catch((err) => {
        console.log("Error getting documents", err);
      });
  }

  //  function getAllProvidersAccounts(res) {
  //    db.collection("user")
  //     //.where("userType", "==", "SP")
  //     .get()
  //     .then(function(querySnapshot) {
  //       querySnapshot.forEach(function(doc) {
  //         // doc.data() is never undefined for query doc snapshots
  //         //console.log(doc.id, " +++++=> ", doc.data());
  //        // res.render("new-account-request", { provider: doc.data() });

  //         res.send( doc.data() )
  //       });
  //     })
  //     .catch(function(error) {
  //       console.log("Error getting documents: ", error);
  //     });
  // }
};
