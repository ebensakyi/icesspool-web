const EarningsController = require("../controllers/EarningsController");

module.exports = (app) => {
  app.get("/api/v1/provider/earnings", EarningsController.getEarnings);
  app.get("/provider-earnings", EarningsController.getProviderEarnings);
  app.get("/icesspool-earnings", EarningsController.getIcesspoolEarnings);
  app.get('/icesspool-wallet', EarningsController.getIcesspoolBalance)

  app.get("/tamale-earnings", EarningsController.getIcesspoolEarnings);
  app.get('/tamale-wallet', EarningsController.getIcesspoolBalance)

};
