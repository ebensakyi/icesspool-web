const ProviderController = require("../controllers/ProviderController");
const Validator = require("../controllers/Validator");

module.exports = (app) => {
  app.get("/existing-providers", ProviderController.existingProviderPage);
  app.get("/providers", ProviderController.newProviderPage);
  app.get("/add-service-provider", ProviderController.addServiceProviderPage);
  app.post("/api/v1/add-service-provider", ProviderController.addServiceProvider);

  app.get("/momo-accounts", ProviderController.momoPage);

  app.get("/api/v1/provider", ProviderController.providerList);
  app.get("/api/v1/provider/scanner/:id", ProviderController.getProviderScannerApp);
  app.get("/api/v1/provider/:id", ProviderController.getProviderClientApp);

  app.get("/provider/:id", ProviderController.getWebProvider);

  app.put(
    "/api/v1/provider/:id",
    Validator.validateProviderUpdate,
    ProviderController.updateProvider
  );
  app.delete("/api/v1/provider/:id", ProviderController.deleteProvider);
  app.post("/api/v1/provider/set-up-momo", ProviderController.setMomoAccount);
  app.get("/providers/status", ProviderController.changeProviderStatus);
  app.get("/providers/disable", ProviderController.disableProviderAccount);

};
