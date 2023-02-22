const MakeRequestController = require("../controllers/MakeRequestController");
const Validator = require("../controllers/Validator");

module.exports = (app) => {
  app.get("/make-request", MakeRequestController.makeRequestPage);
  // app.post("/scanners", ScannerUserController.addScannerUser);
  // app.get("/scanners/del/:id", ScannerUserController.deleteScannerUser);
};
