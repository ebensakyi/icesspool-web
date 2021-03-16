const FCMController = require("../controllers/FCMController");

module.exports = (app) => {
  app.post("/api/v1/fcm", FCMController.updateFCM);
 

};
