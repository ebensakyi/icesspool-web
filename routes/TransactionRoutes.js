const TransactionController = require("../controllers/TransactionController");

module.exports = (app) => {
  // app.get('/api/v1/transaction/client/:id', TransactionController.getClientLastTransaction);
  app.post("/api/v1/transaction/offer-made", TransactionController.offerMade);
  app.post(
    "/api/v1/transaction/offer-accepted",
    TransactionController.offerAccepted
  );
  app.post(
    "/api/v1/transaction/offer-customer-cancelled",
    TransactionController.offerCancelledByCustomer
  );
  app.post(
    "/api/v1/transaction/offer-provider-cancelled",
    TransactionController.offerCancelledByProvider
  );
  app.post(
    "/api/v1/transaction/close-transaction",
    TransactionController.closeTransaction
  );

  // app.get(
  //   "/api/v1/client/transaction",
  //   TransactionController.getAllClientTransactions
  // );

  app.get("/transaction", TransactionController.getTransactions);
  app.get(
    "/transaction/provider/:id",
    TransactionController.getTransactionProvider
  );

  app.get(
    "/transaction/client/:id",
    TransactionController.getTransactionClient
  );

  app.get(
    "/transaction/status/:id",
    TransactionController.getTransactionStatuses
  );
  app.post("/transaction/manual-close", TransactionController.closeTransaction);
  app.post("/transaction/delete", TransactionController.deleteTransaction);

};
