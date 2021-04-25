const ClientController = require("../controllers/ClientController");
const Validator = require("../controllers/Validator");

module.exports = (app) => {
  app.get("/clients", ClientController.clientPage);
  app.get("/clients/status", ClientController.changeClientStatus);
  app.get('/api/v1/client/transaction', ClientController.getTransactions);
  app.get('/api/v1/client-history', ClientController.getTransactions);

};
