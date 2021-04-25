const MessagingController = require("../controllers/MessagingController");

module.exports = (app) => {
  app.get("/bulk-messaging", MessagingController.getBulkMessagingPage);
  app.post("/bulk-messaging", MessagingController.sendBulkMessage);

  app.get("/single-messaging", MessagingController.getSingleMessagingPage);
  app.post("/single-messaging", MessagingController.sendSingleMessage);
};
